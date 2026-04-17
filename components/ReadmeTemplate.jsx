'use client';

import { useState } from 'react';

function buildTemplate(username, profile, topLanguages) {
  const name = profile?.name || username;
  const bio = profile?.bio ? `\n> ${profile.bio}\n` : '';
  const location = profile?.location ? `- 📍 ${profile.location}` : '';
  const website = profile?.website ? `- 🔗 [Portfolio](${profile.website})` : '- 🔗 Add your portfolio link';
  const langs = topLanguages?.length
    ? topLanguages.join(', ')
    : 'Add your stack here';

  return `# Hi, I'm ${name} 👋
${bio}
## What I build

<!-- Describe what you actually work on — be specific -->
I build [type of projects] using [your main stack]. Currently focused on [current project or goal].

## Tech Stack

\`\`\`
Languages:   ${langs}
Frameworks:  Add your frameworks
Tools:       Git, VS Code, Add more
\`\`\`

## Stats

${location}
${website}
- 💼 Open to: [full-time / freelance / open source]

## Best work

<!-- Pin your 4–6 best repos below — GitHub lets you pin from your profile page -->
Check out my pinned repositories ↓

---

[![githubmaxxing score](https://githubmaxxing.vercel.app/api/badge?username=${username})](https://githubmaxxing.vercel.app)`;
}

export default function ReadmeTemplate({ username, profile, topLanguages }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const template = buildTemplate(username, profile, topLanguages);

  function handleCopy() {
    navigator.clipboard.writeText(template).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '0.875rem',
        overflow: 'hidden',
      }}
    >
      {/* Header toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.25rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '0.5rem',
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/>
            </svg>
          </div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '0.875rem', margin: 0, color: 'var(--text)' }}>
              Profile README template
            </p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'var(--text-muted)', margin: 0 }}>
              copy-paste starter · pre-filled with your data
            </p>
          </div>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text-muted)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {/* Instructions */}
          <div style={{ padding: '0.75rem 1.25rem', backgroundColor: 'var(--surface-2)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)' }}>
              Create a repo named exactly <strong style={{ color: 'var(--text)' }}>{username}</strong>, add a README.md, and paste this in.
            </span>
          </div>

          {/* Template content */}
          <div style={{ position: 'relative' }}>
            <pre
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.72rem',
                lineHeight: 1.7,
                color: 'var(--text)',
                backgroundColor: 'var(--surface)',
                margin: 0,
                padding: '1rem 1.25rem',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {template}
            </pre>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.35rem 0.75rem',
                background: copied ? '#ede9fe' : 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: '0.375rem',
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.6rem',
                color: copied ? '#7c3aed' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {copied ? '✓ copied' : 'copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
