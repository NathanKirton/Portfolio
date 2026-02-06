const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { execSync } = require('child_process');

async function run() {
  const githubToken = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY; // owner/repo
  if (!githubToken || !repo) {
    console.log('GITHUB_TOKEN or GITHUB_REPOSITORY not set. Exiting.');
    process.exit(0);
  }

  try {
    const apiUrl = `https://api.github.com/repos/${repo}/commits?per_page=10`;
    console.log('Fetching recent commits from', apiUrl);
    const res = await fetch(apiUrl, {
      headers: { Authorization: `token ${githubToken}`, 'User-Agent': 'github-action' }
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`GitHub API error: ${res.status} ${txt}`);
    }

    const commits = await res.json();
    const ghItems = commits.map(c => ({
      id: `github:commit:${c.sha}`,
      created: { time: new Date(c.commit.author.date).getTime() },
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: { text: `${c.commit.message} (commit ${c.sha.slice(0,7)})` },
          shareMedia: []
        }
      }
    }));

    const outPath = path.join(process.cwd(), 'public', 'linkedin-posts.json');
    let current = { elements: [] };
    try { current = JSON.parse(fs.readFileSync(outPath, 'utf8')); } catch (e) { current = { elements: [] }; }

    // Merge but avoid duplicates by id
    const existingIds = new Set((current.elements || []).map(e => e.id));
    const merged = [...ghItems.filter(i => !existingIds.has(i.id)), ...(current.elements || [])];
    // keep up to 50 items
    const trimmed = merged.slice(0, 50);

    const newJson = JSON.stringify({ elements: trimmed }, null, 2);
    if (fs.existsSync(outPath) && fs.readFileSync(outPath, 'utf8') === newJson) {
      console.log('No changes to public/linkedin-posts.json');
      return;
    }

    fs.writeFileSync(outPath, newJson, 'utf8');
    console.log('Wrote updated public/linkedin-posts.json (merged GitHub commits)');

    // commit and push
    execSync('git config user.name "github-actions[bot]"');
    execSync('git config user.email "github-actions[bot]@users.noreply.github.com"');
    execSync('git add public/linkedin-posts.json');
    try { execSync('git commit -m "chore(content): sync GitHub commits into blog feed [skip ci]"'); } catch (e) { console.log('Nothing to commit'); }

    const remote = `https://x-access-token:${githubToken}@github.com/${repo}.git`;
    execSync(`git remote set-url origin ${remote}`);
    execSync('git push origin HEAD:main');
    console.log('Pushed changes to repository');
  } catch (err) {
    console.error('Error syncing GitHub activity:', err);
    process.exit(1);
  }
}

run();
