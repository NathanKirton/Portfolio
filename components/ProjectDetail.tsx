/**
 * ProjectDetail Component
 * Displays comprehensive information for a single project/expedition
 * Shows tools, overview, and demo content with animations
 */

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { EXPEDITIONS, SOCIALS } from '../constants';

interface ProjectDetailProps {
  projectId: number;
}

interface RepoContentItem {
  type: 'file' | 'dir';
  name: string;
  path: string;
  size?: number;
  download_url?: string | null;
}

interface RepoExplorerState {
  loading: boolean;
  error: string | null;
  owner: string;
  repo: string;
  branch: string;
  stars: number;
  description: string;
  currentPath: string;
  items: RepoContentItem[];
  readmeText: string;
}

const INITIAL_REPO_STATE: RepoExplorerState = {
  loading: false,
  error: null,
  owner: '',
  repo: '',
  branch: 'main',
  stars: 0,
  description: '',
  currentPath: '',
  items: [],
  readmeText: '',
};

const parseGitHubRepo = (url: string): { owner: string; repo: string } | null => {
  const match = url.match(/^https?:\/\/github\.com\/([^/]+)\/([^/#?]+)/i);
  if (!match) return null;
  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/i, ''),
  };
};

const decodeBase64Utf8 = (base64: string): string => {
  try {
    const binary = atob(base64.replace(/\n/g, ''));
    const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return '';
  }
};

const encodeAssetUrl = (value: string): string => {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return encodeURI(value);
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId }) => {
  const [activeView, setActiveView] = useState<'demo' | 'repo'>('demo');
  const [repoState, setRepoState] = useState<RepoExplorerState>(INITIAL_REPO_STATE);
  const [demoCredentialsStatus, setDemoCredentialsStatus] = useState<string>('');

  // Find project by ID
  const project = EXPEDITIONS.find(p => p.id === projectId);

  const demoUrl = useMemo(() => {
    if (project?.demoUrl) {
      return project.demoUrl;
    }

    const isLocalPreview = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);
    const deployedProject4Url = import.meta.env.VITE_PROJECT4_DEMO_URL || 'https://irongate-locksmiths-project4.vercel.app';

    if (projectId === 1) {
      return '/projects/project-1/NorthTech Microservices/tracking-service/public/index.html';
    }
    if (projectId === 3) {
      return 'https://www.move2earn.uk';
    }
    if (projectId === 4) {
      return isLocalPreview ? 'http://127.0.0.1:3001' : deployedProject4Url;
    }
    return '';
  }, [project?.demoUrl, projectId]);

  const githubRepoUrl = useMemo(() => {
    if (project?.githubRepoUrl) {
      return project.githubRepoUrl;
    }

    if (projectId === 3) {
      return 'https://github.com/NathanKirton/move2earn-backend';
    }
    if (projectId === 4) {
      return 'https://github.com/NathanKirton/IronGateLocksmiths';
    }
    if (projectId === 1) {
      return SOCIALS.github;
    }
    return '';
  }, [project?.githubRepoUrl, projectId]);

  useEffect(() => {
    if (activeView === 'repo' && !githubRepoUrl) {
      setActiveView('demo');
      return;
    }

    if (activeView === 'demo' && !demoUrl && githubRepoUrl) {
      setActiveView('repo');
    }
  }, [activeView, demoUrl, githubRepoUrl]);

  const repoMeta = useMemo(() => {
    if (!githubRepoUrl) return null;
    return parseGitHubRepo(githubRepoUrl);
  }, [githubRepoUrl]);

  useEffect(() => {
    const loadRepoOverview = async () => {
      if (activeView !== 'repo' || !repoMeta) {
        return;
      }

      setRepoState(prev => ({
        ...INITIAL_REPO_STATE,
        loading: true,
        owner: repoMeta.owner,
        repo: repoMeta.repo,
      }));

      try {
        const repoInfoResp = await fetch(`https://api.github.com/repos/${repoMeta.owner}/${repoMeta.repo}`);
        if (!repoInfoResp.ok) {
          throw new Error('Could not load repository metadata.');
        }
        const repoInfo = await repoInfoResp.json();

        const [rootResp, readmeResp] = await Promise.all([
          fetch(`https://api.github.com/repos/${repoMeta.owner}/${repoMeta.repo}/contents`),
          fetch(`https://api.github.com/repos/${repoMeta.owner}/${repoMeta.repo}/readme`),
        ]);

        if (!rootResp.ok) {
          throw new Error('Could not load repository files.');
        }

        const rootItems = (await rootResp.json()) as RepoContentItem[];
        let readmeText = '';

        if (readmeResp.ok) {
          const readmeData = await readmeResp.json();
          if (typeof readmeData?.content === 'string') {
            readmeText = decodeBase64Utf8(readmeData.content);
          }
        }

        setRepoState({
          loading: false,
          error: null,
          owner: repoMeta.owner,
          repo: repoMeta.repo,
          branch: repoInfo.default_branch || 'main',
          stars: typeof repoInfo.stargazers_count === 'number' ? repoInfo.stargazers_count : 0,
          description: repoInfo.description || '',
          currentPath: '',
          items: rootItems,
          readmeText,
        });
      } catch (error) {
        setRepoState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Unable to load repository.',
        }));
      }
    };

    loadRepoOverview();
  }, [activeView, repoMeta]);

  const loadRepoPath = async (path: string) => {
    if (!repoMeta) return;
    setRepoState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const encodedPath = path
        .split('/')
        .map(segment => encodeURIComponent(segment))
        .join('/');
      const resp = await fetch(`https://api.github.com/repos/${repoMeta.owner}/${repoMeta.repo}/contents/${encodedPath}`);

      if (!resp.ok) {
        throw new Error('Could not open this folder.');
      }

      const data = await resp.json();
      const items = Array.isArray(data) ? (data as RepoContentItem[]) : [];
      setRepoState(prev => ({
        ...prev,
        loading: false,
        currentPath: path,
        items,
      }));
    } catch (error) {
      setRepoState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unable to load folder contents.',
      }));
    }
  };

  const openParentPath = () => {
    if (!repoState.currentPath) return;
    const segments = repoState.currentPath.split('/');
    segments.pop();
    void loadRepoPath(segments.join('/'));
  };

  // Handle opening demo in new window
  const openDemoInNewWindow = () => {
    if (demoUrl) {
      window.open(demoUrl, '_blank', 'width=1200,height=800');
    }
  };

  const openRepoInNewWindow = () => {
    if (githubRepoUrl) {
      window.open(githubRepoUrl, '_blank', 'width=1200,height=800');
    }
  };

  const copyDemoCredentialsAndOpen = async () => {
    if (!project?.demoCredentials || !demoUrl) {
      return;
    }

    const { email, password } = project.demoCredentials;
    const clipboardText = [
      email ? `Email: ${email}` : '',
      password ? `Password: ${password}` : '',
    ].filter(Boolean).join('\n');

    try {
      if (clipboardText) {
        await navigator.clipboard.writeText(clipboardText);
      }
      setDemoCredentialsStatus('Demo admin credentials copied. The live login has been opened in a new window.');
    } catch {
      setDemoCredentialsStatus('The live login has been opened, but the browser blocked clipboard access.');
    }

    openDemoInNewWindow();
  };

  // Handle missing project
  if (!project) {
    return (
      <main className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-black mb-4">Project Not Found</h1>
          <button
            onClick={() => (window.location.hash = '')}
            className="bg-primary text-white px-6 py-3 font-black rounded hover:shadow-lg transition-all"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  const detailImageSrc = encodeAssetUrl(project.imageUrl);
  const shouldShowViewToggle = Boolean(demoUrl && githubRepoUrl);
  const isExternalDemo = project.demoMode === 'external';
  const hasDemoCredentials = Boolean(project.demoCredentials?.email || project.demoCredentials?.password);

  return (
    <main className="relative z-10 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation back button */}
        <button
          onClick={() => (window.location.hash = '')}
          className="mb-8 inline-flex items-center gap-2 text-primary font-black hover:gap-4 transition-all uppercase text-sm tracking-wider"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Home
        </button>

        {/* Main content container with fade-in animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Project header with title and metadata */}
          <div className="mb-12">
            <span className="text-xs font-black text-white bg-black dark:bg-primary dark:text-black px-3 py-1 uppercase tracking-[0.2em]">
              {project.tag}
            </span>
            <h1 className="text-5xl font-black mt-4 mb-4 uppercase tracking-tighter text-gray-900 dark:text-white">
              {project.title}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {project.description}
            </p>
            <div className="text-sm font-black text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              {project.date}
            </div>
          </div>

          {/* Project Image */}
          <div className="mb-12 h-96 rounded-lg overflow-hidden border-4 border-black dark:border-primary shadow-lg">
            <img
              src={detailImageSrc}
              alt={project.imageAlt || project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Tools Used */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 bg-primary/10 dark:bg-primary/5 p-8 rounded-lg border-2 border-primary"
          >
            <h2 className="text-3xl font-black mb-6">Tools &amp; Technologies</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.tools ? (
                project.tools.map((category, idx) => (
                  <div key={idx}>
                    <h3 className="font-black uppercase tracking-wider mb-2">{category.name}</h3>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                      {category.items.map((item, itemIdx) => (
                        <li key={itemIdx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p className="text-gray-700 dark:text-gray-300 md:col-span-2">No tools information available.</p>
              )}
            </div>
          </motion.section>

          {/* Project Notes */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-black mb-6">Project Overview</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.overview ? (
                // Handle both string and array formats for sections
                Array.isArray(project.overview.sections) ? (
                  project.overview.sections.map((section, idx) => (
                    <p key={idx}>{section}</p>
                  ))
                ) : (
                  <p>{project.overview.sections}</p>
                )
              ) : (
                <p>No overview information available.</p>
              )}
              <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 rounded">
                <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-200 mb-2">⚠ Demo Limitations</p>
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  Please note: This project may not function as fully intended due to limitations including protected databases, external service dependencies, and restricted API access in this demo environment. The interactive demo provides a visual representation of the interface and core functionality.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Interactive Environment */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="text-3xl font-black">Interactive Environment</h2>
              {shouldShowViewToggle && (
                <div className="relative bg-black rounded-full p-1 border-2 border-black dark:border-primary flex items-center">
                  <motion.div
                    className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-full"
                    animate={{ x: activeView === 'demo' ? '0%' : '100%' }}
                    transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                  />
                  <button
                    onClick={() => setActiveView('demo')}
                    className={`relative z-10 px-4 py-1.5 text-xs md:text-sm font-black uppercase tracking-wide transition-colors ${
                      activeView === 'demo' ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Live Demo
                  </button>
                  <button
                    onClick={() => setActiveView('repo')}
                    className={`relative z-10 px-4 py-1.5 text-xs md:text-sm font-black uppercase tracking-wide transition-colors ${
                      activeView === 'repo' ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    GitHub Repo
                  </button>
                </div>
              )}
            </div>

            <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 px-4 md:px-8">
              <div className="bg-black border-4 border-black dark:border-primary p-0 rounded-lg overflow-hidden">
                {activeView === 'demo' && demoUrl ? (
                  <>
                    <div className="flex flex-wrap justify-end gap-3 p-3 bg-black/70 border-b border-white/10">
                      {hasDemoCredentials && (
                        <button
                          onClick={() => void copyDemoCredentialsAndOpen()}
                          className="bg-white text-black px-4 py-2 rounded font-black text-xs md:text-sm hover:shadow-lg transition-all flex items-center gap-2 border-[2px] border-black"
                          title="Copy demo admin credentials and open the live login"
                        >
                          <span className="material-symbols-outlined text-sm">content_copy</span>
                          Copy Admin Login
                        </button>
                      )}
                      <button
                        onClick={openDemoInNewWindow}
                        className="bg-primary text-white px-4 py-2 rounded font-black text-xs md:text-sm hover:shadow-lg transition-all flex items-center gap-2 border-[2px] border-black dark:border-primary"
                        title="Open Demo in New Window"
                      >
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                        Open Demo
                      </button>
                    </div>

                    {hasDemoCredentials && (
                      <div className="px-4 md:px-5 py-3 bg-white/95 border-b border-black/10 text-sm text-slate-700 flex flex-wrap items-center gap-3">
                        <span className="font-black uppercase tracking-wide text-xs text-slate-500">Demo Admin</span>
                        {project.demoCredentials?.email && (
                          <span>Email: <strong>{project.demoCredentials.email}</strong></span>
                        )}
                        {project.demoCredentials?.password && (
                          <span>Password: <strong>{project.demoCredentials.password}</strong></span>
                        )}
                        {demoCredentialsStatus && (
                          <span className="text-slate-500">{demoCredentialsStatus}</span>
                        )}
                      </div>
                    )}

                    {isExternalDemo ? (
                      <div className="min-h-[60vh] bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white flex items-center justify-center p-8 md:p-12">
                        <div className="max-w-2xl text-center">
                          <img
                            src={detailImageSrc}
                            alt={project.imageAlt || project.title}
                            className="h-24 w-24 md:h-28 md:w-28 object-contain mx-auto mb-6"
                          />
                          <p className="text-xs uppercase tracking-[0.2em] text-primary font-black mb-3">Live Hosted Project</p>
                          <h3 className="text-3xl md:text-4xl font-black mb-4">Open the deployed experience</h3>
                          <p className="text-slate-300 leading-relaxed mb-8">
                            This project is linked directly to its hosted application so visitors land in the live environment rather than an embedded preview.
                          </p>
                          <button
                            onClick={openDemoInNewWindow}
                            className="bg-primary text-white px-6 py-3 rounded font-black text-sm md:text-base hover:shadow-lg transition-all inline-flex items-center gap-2 border-[2px] border-black"
                          >
                            <span className="material-symbols-outlined text-base">open_in_new</span>
                            Launch Live Site
                          </button>
                        </div>
                      </div>
                    ) : projectId === 1 ? (
                      (() => {
                        const iframeSrc = encodeURI(demoUrl);
                        return (
                          <iframe
                            title={`project-${project.id}-demo`}
                            src={iframeSrc}
                            className="w-full"
                            style={{ height: '75vh', minHeight: 600, border: 'none', backgroundColor: '#000000' }}
                            sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
                          />
                        );
                      })()
                    ) : projectId === 3 ? (
                      <iframe
                        title={`project-${project.id}-demo`}
                        src={demoUrl}
                        className="w-full"
                        style={{ height: '75vh', minHeight: 600, border: 'none', backgroundColor: '#000000' }}
                        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-pointer-lock"
                      />
                    ) : projectId === 4 ? (
                      <iframe
                        title={`project-${project.id}-demo`}
                        src={demoUrl}
                        className="w-full"
                        style={{ height: '80vh', minHeight: 700, border: 'none', backgroundColor: '#000000' }}
                        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-pointer-lock"
                      />
                    ) : (
                      <iframe
                        title={`project-${project.id}-demo`}
                        src={demoUrl}
                        className="w-full"
                        style={{ height: '75vh', minHeight: 600, border: 'none', backgroundColor: '#000000' }}
                        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-pointer-lock"
                      />
                    )}
                  </>
                ) : activeView === 'repo' && githubRepoUrl ? (
                  <div className="min-h-[72vh] bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
                    <div className="border-b border-white/10 p-4 md:p-5 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-primary font-black mb-1">Source Code</p>
                        <h3 className="text-xl md:text-2xl font-black">
                          {repoState.owner && repoState.repo ? `${repoState.owner}/${repoState.repo}` : 'GitHub Repository'}
                        </h3>
                        {repoState.description && (
                          <p className="text-slate-300 text-sm mt-1">{repoState.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs uppercase tracking-wide text-slate-400 border border-white/20 rounded-full px-3 py-1">
                          {repoState.branch ? `Branch: ${repoState.branch}` : 'Branch: main'}
                        </div>
                        <div className="text-xs uppercase tracking-wide text-slate-400 border border-white/20 rounded-full px-3 py-1">
                          Stars: {repoState.stars}
                        </div>
                        <button
                          onClick={openRepoInNewWindow}
                          className="bg-primary text-white px-4 py-2 rounded font-black text-xs md:text-sm hover:shadow-lg transition-all inline-flex items-center gap-2 border-[2px] border-black"
                        >
                          <img src="/Icons/github-142-svgrepo-com.svg" alt="GitHub" className="w-4 h-4 invert" />
                          Open in GitHub
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-[1.2fr_1fr] min-h-[58vh]">
                      <div className="border-r border-white/10 p-4 md:p-5">
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <p className="text-xs uppercase tracking-[0.15em] text-slate-400">
                            {repoState.currentPath ? `/${repoState.currentPath}` : '/'}
                          </p>
                          <button
                            onClick={openParentPath}
                            disabled={!repoState.currentPath || repoState.loading}
                            className="text-xs font-black uppercase tracking-wide px-3 py-1.5 border border-white/20 rounded disabled:opacity-40"
                          >
                            Up One Level
                          </button>
                        </div>

                        {repoState.loading ? (
                          <div className="h-[44vh] flex items-center justify-center text-slate-300 text-sm">Loading repository files...</div>
                        ) : repoState.error ? (
                          <div className="h-[44vh] flex items-center justify-center text-red-300 text-sm">{repoState.error}</div>
                        ) : (
                          <div className="h-[44vh] overflow-auto rounded border border-white/10 bg-black/30">
                            <ul className="divide-y divide-white/5">
                              {repoState.items
                                .slice()
                                .sort((a, b) => {
                                  if (a.type !== b.type) {
                                    return a.type === 'dir' ? -1 : 1;
                                  }
                                  return a.name.localeCompare(b.name);
                                })
                                .map(item => (
                                  <li key={item.path}>
                                    {item.type === 'dir' ? (
                                      <button
                                        onClick={() => void loadRepoPath(item.path)}
                                        className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors flex items-center justify-between"
                                      >
                                        <span className="font-medium text-slate-100">📁 {item.name}</span>
                                        <span className="text-xs uppercase text-slate-500">Folder</span>
                                      </button>
                                    ) : (
                                      <a
                                        href={`${githubRepoUrl}/blob/${repoState.branch}/${item.path}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors flex items-center justify-between"
                                      >
                                        <span className="font-medium text-slate-200">📄 {item.name}</span>
                                        <span className="text-xs uppercase text-slate-500">File</span>
                                      </a>
                                    )}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="p-4 md:p-5">
                        <p className="text-xs uppercase tracking-[0.15em] text-slate-400 mb-3">README Preview</p>
                        <div className="h-[44vh] overflow-auto rounded border border-white/10 bg-black/30 p-4">
                          {repoState.readmeText ? (
                            <pre className="whitespace-pre-wrap text-sm leading-relaxed text-slate-200 font-mono">
                              {repoState.readmeText.slice(0, 7000)}
                            </pre>
                          ) : (
                            <p className="text-slate-400 text-sm">README preview unavailable for this repository.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 min-h-96 flex items-center justify-center">
                    <div className="text-center">
                      {projectId === 4 ? (
                        <>
                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            Project 4 interactive demo is available locally at <strong>http://127.0.0.1:3001</strong>.
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                            To show the same interactive experience on your live portfolio, deploy the Next.js app and set <code>VITE_PROJECT4_DEMO_URL</code> in your portfolio host environment to that deployed URL.
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            The interactive demo environment will be loaded here. Project files should be placed in:
                          </p>
                          <code className="block bg-black/5 dark:bg-white/5 p-4 rounded font-mono text-sm mb-4 text-left">
                            /public/projects/project-{project.id}/
                          </code>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Upload your project files to this folder for interactive demonstration.
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <button
              onClick={() => (window.location.hash = '#contact')}
              className="bg-primary text-white px-8 py-4 rounded-none font-black text-lg inline-flex items-center gap-3 hover:shadow-xl transition-all transform hover:-rotate-1 border-[3px] border-black dark:border-primary shadow-[6px_6px_0px_0px_rgba(242,127,13,1)]"
            >
              INTERESTED? GET IN TOUCH <span className="material-symbols-outlined font-black text-sm">arrow_forward</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default ProjectDetail;
