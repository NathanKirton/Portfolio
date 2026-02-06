const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function run() {
  const token = process.env.LINKEDIN_TOKEN;
  const personUrn = process.env.PERSON_URN;
  const repo = process.env.GITHUB_REPOSITORY;
  const githubToken = process.env.GITHUB_TOKEN;

  if (!token || !personUrn) {
    console.log('LINKEDIN_TOKEN or PERSON_URN not set. Exiting.');
    process.exit(0);
  }
  if (!repo || !githubToken) {
    console.log('GITHUB_REPOSITORY or GITHUB_TOKEN not set. Exiting.');
    process.exit(0);
  }

  try {
    const encoded = encodeURIComponent(`List(${personUrn})`);
    const url = `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=${encoded}&count=50`;
    console.log('Fetching LinkedIn posts...');
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`LinkedIn API error: ${res.status} ${txt}`);
    }

    const data = await res.json();
    const elements = (data.elements || []).map(el => {
      const content = el.specificContent && el.specificContent['com.linkedin.ugc.ShareContent'] ? el.specificContent['com.linkedin.ugc.ShareContent'] : {};
      const text = content.shareCommentary && content.shareCommentary.text ? content.shareCommentary.text : '';
      const media = Array.isArray(content.shareMedia) ? content.shareMedia.map(m => m.media || m.originalUrl || null).filter(Boolean) : [];
      return {
        id: el.id || null,
        created: el.created || null,
        text,
        media
      };
    });

    const outPath = path.join(process.cwd(), 'public', 'linkedin-posts.json');
    const newJson = JSON.stringify({ elements }, null, 2);

    let oldJson = null;
    try { oldJson = fs.readFileSync(outPath, 'utf8'); } catch (e) { oldJson = null; }

    if (oldJson === newJson) {
      console.log('No changes to linkedin-posts.json');
      return;
    }

    fs.writeFileSync(outPath, newJson, 'utf8');
    console.log('Wrote updated public/linkedin-posts.json');

    // commit and push
    execSync('git config user.name "github-actions[bot]"');
    execSync('git config user.email "github-actions[bot]@users.noreply.github.com"');
    execSync('git add public/linkedin-posts.json');
    execSync('git commit -m "chore(linkedin): update posts [skip ci]" || true');

    const remote = `https://x-access-token:${githubToken}@github.com/${repo}.git`;
    execSync(`git remote set-url origin ${remote}`);
    execSync('git push origin HEAD:main');
    console.log('Pushed updated linkedin-posts.json to repository');
  } catch (err) {
    console.error('Error fetching/syncing LinkedIn posts:', err);
    process.exit(1);
  }
}

run();
