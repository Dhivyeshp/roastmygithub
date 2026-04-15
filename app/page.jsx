'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MeshGradient } from '@paper-design/shaders-react';

const GRADE_EXAMPLES = [
  {
    username: 't3rnr',
    initials: 'T3',
    grade: 'A',
    score: 91,
    verdict: '2 quick wins left',
    bars: [92, 88, 95, 90, 85],
  },
  {
    username: 'dhivyeshp',
    initials: 'D',
    grade: 'B',
    score: 64,
    verdict: 'good bones · fix README',
    bars: [55, 70, 50, 75, 25],
  },
  {
    username: 'mxkaske',
    initials: 'MK',
    grade: 'C',
    score: 48,
    verdict: '6 quick wins',
    bars: [40, 55, 30, 60, 20],
  },
];

function gradeColor(grade) {
  if (grade === 'A') return '#7c3aed';
  if (grade === 'B') return '#BA7517';
  return '#E24B4A';
}

function gradeBg(grade) {
  if (grade === 'A') return '#ede9fe';
  if (grade === 'B') return '#fdf3e3';
  return '#fdecea';
}

function barColor(score) {
  if (score >= 75) return '#7c3aed';
  if (score >= 50) return '#BA7517';
  return '#E24B4A';
}

function ExampleCard({ example }) {
  const { username, initials, grade, score, verdict, bars } = example;
  const color = gradeColor(grade);
  const bg = gradeBg(grade);

  return (
    <div
      style={{
        backgroundColor: 'var(--surface)',
        borderRadius: '0.875rem',
        padding: '1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '9999px',
              backgroundColor: bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color,
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.65rem',
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {initials}
          </div>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', fontWeight: 500, margin: 0, color: 'var(--text)' }}>
              @{username}
            </p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'var(--text-muted)', margin: 0 }}>
              {verdict}
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span
            style={{
              display: 'block',
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.6rem',
              fontWeight: 600,
              color,
              backgroundColor: bg,
              padding: '0.1rem 0.45rem',
              borderRadius: '0.3rem',
              marginBottom: '0.2rem',
            }}
          >
            {grade} tier
          </span>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '1.35rem',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: 'var(--text)',
              lineHeight: 1,
            }}
          >
            {score}
            <span style={{ fontSize: '0.7rem', fontWeight: 400, color: 'var(--text-muted)' }}>/100</span>
          </span>
        </div>
      </div>

      {/* Score bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {['Profile', 'Repos', 'READMEs', 'Commits', 'Social'].map((label, i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.55rem',
                color: 'var(--text-muted)',
                width: '46px',
                flexShrink: 0,
              }}
            >
              {label}
            </span>
            <div
              style={{
                flex: 1,
                height: '3px',
                backgroundColor: 'var(--border)',
                borderRadius: '9999px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${bars[i]}%`,
                  backgroundColor: barColor(bars[i]),
                  borderRadius: '9999px',
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.55rem',
                color: 'var(--text-muted)',
                width: '20px',
                textAlign: 'right',
                flexShrink: 0,
              }}
            >
              {bars[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/analyze?username=${encodeURIComponent(trimmed)}`);
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || 'User not found');
      }
      router.push(`/results?u=${encodeURIComponent(trimmed)}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--background)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Mesh gradient background */}
      <MeshGradient
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '100%',
          opacity: 0.6,
          pointerEvents: 'none',
          zIndex: 0,
        }}
        colors={['#f6f8fa', '#e8e0f7', '#f0ebff', '#d4c5f9', '#ede9fe', '#f6f8fa']}
        speed={0.4}
        distortion={0.4}
      />

      {/* Nav */}
      <nav
        style={{
          width: '100%',
          maxWidth: '680px',
          padding: '1.25rem 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: '0.95rem', color: 'var(--text)' }}>
          githubmaxxing
          <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>.vercel.app</span>
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Open source badge */}
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.6rem',
              color: '#7c3aed',
              border: '0.5px solid #c4b5fd',
              padding: '0.2rem 0.6rem',
              borderRadius: '100px',
              backgroundColor: '#ede9fe',
            }}
          >
            open source
          </span>

          {/* GitHub repo link */}
          <a
            href="https://github.com/Dhivyeshp/githubmaxxing"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-muted)',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            aria-label="View source on GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          paddingTop: '4rem',
          paddingBottom: '3.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.25rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Kicker */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '9999px',
              backgroundColor: '#7c3aed',
              flexShrink: 0,
            }}
          />
          github profile analyzer
        </div>

        {/* H1 */}
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.9rem, 5vw, 2.75rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            margin: 0,
            color: 'var(--text)',
            maxWidth: '580px',
          }}
        >
          Your GitHub is losing you{' '}
          <span style={{ color: '#7c3aed' }}>jobs.</span>
          <br />
          Fix it in 5 minutes.
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: '1.0625rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            maxWidth: '480px',
            margin: 0,
          }}
        >
          We score your profile across 5 categories and give you a ranked action plan.
          No fluff. Just what actually moves the needle.
        </p>

        {/* CTA input row */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
            width: '100%',
            maxWidth: '420px',
            marginTop: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              style={{
                flex: 1,
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                padding: '0.75rem 1rem',
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.875rem',
                color: 'var(--text)',
                outline: 'none',
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#7c3aed';
                e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              type="submit"
              disabled={loading || !username.trim()}
              style={{
                backgroundColor: loading || !username.trim() ? 'var(--surface-2)' : '#0f172a',
                color: loading || !username.trim() ? 'var(--text-muted)' : '#7c3aed',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.75rem 1.25rem',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: loading || !username.trim() ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background-color 0.15s',
              }}
            >
              {loading ? 'Checking...' : 'Analyze →'}
            </button>
          </div>

          {error && (
            <p
              style={{
                fontSize: '0.8rem',
                color: 'var(--red)',
                backgroundColor: 'var(--red-light)',
                border: '1px solid #f9c5c5',
                borderRadius: '0.5rem',
                padding: '0.5rem 0.875rem',
                margin: 0,
                width: '100%',
                textAlign: 'left',
              }}
            >
              {error}
            </p>
          )}
        </form>

        {/* Trust line */}
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.7rem',
            color: 'var(--text-faint)',
            margin: 0,
            marginTop: '-0.25rem',
          }}
        >
          no login · no email · 100% public API
        </p>
      </div>

      {/* Social proof cards */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '680px',
          paddingBottom: '4rem',
        }}
      >
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            textAlign: 'center',
            marginBottom: '1.25rem',
          }}
        >
          example scores
        </p>
        <div className="proof-grid">
          {GRADE_EXAMPLES.map((ex) => (
            <ExampleCard key={ex.username} example={ex} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          width: '100%',
          maxWidth: '680px',
          borderTop: '1px solid var(--border)',
          padding: '1.25rem 0',
          marginTop: 'auto',
        }}
      >
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.65rem',
            color: 'var(--text-faint)',
            textAlign: 'center',
            margin: 0,
          }}
        >
          githubmaxxing.vercel.app · free · no login required
        </p>
      </footer>
    </main>
  );
}
