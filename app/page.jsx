'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

function barGradient(score) {
  if (score >= 75) return 'linear-gradient(90deg, #7c3aed, #a855f7)';
  if (score >= 50) return 'linear-gradient(90deg, #BA7517, #f59e0b)';
  return 'linear-gradient(90deg, #E24B4A, #f87171)';
}

function ExampleCard({ example }) {
  const { username, initials, grade, score, verdict, bars } = example;
  const color = gradeColor(grade);
  const bg = gradeBg(grade);

  return (
    <div
      style={{
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '0.875rem',
        padding: '1rem 1.125rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '9999px',
              backgroundColor: bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color,
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.6rem',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {initials}
          </div>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', fontWeight: 600, margin: 0, color: '#0f172a' }}>
              @{username}
            </p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', color: '#94a3b8', margin: 0 }}>
              {verdict}
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span
            style={{
              display: 'block',
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.58rem',
              fontWeight: 600,
              color,
              backgroundColor: bg,
              padding: '0.1rem 0.4rem',
              borderRadius: '0.3rem',
              marginBottom: '0.2rem',
            }}
          >
            {grade} tier
          </span>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '1.4rem',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#0f172a',
              lineHeight: 1,
            }}
          >
            {score}
            <span style={{ fontSize: '0.6rem', fontWeight: 400, color: '#94a3b8', letterSpacing: 0 }}>/100</span>
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {['Profile', 'Repos', 'READMEs', 'Commits', 'Social'].map((label, i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.52rem',
                color: '#94a3b8',
                width: '42px',
                flexShrink: 0,
              }}
            >
              {label}
            </span>
            <div
              style={{
                flex: 1,
                height: '4px',
                backgroundColor: '#f1f5f9',
                borderRadius: '9999px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${bars[i]}%`,
                  background: barGradient(bars[i]),
                  borderRadius: '9999px',
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.52rem',
                color: '#94a3b8',
                width: '18px',
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
    <main style={{ minHeight: '100vh', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* Nav */}
      <nav style={{ borderBottom: '1px solid #e5e7eb', padding: '0 2rem' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>
            github<span style={{ color: '#7c3aed' }}>maxxing</span>
          </span>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href="https://github.com/Dhivyeshp/githubmaxxing"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', color: '#94a3b8', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#0f172a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
              aria-label="View source on GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <button
              onClick={() => document.getElementById('username-input')?.focus()}
              style={{
                backgroundColor: '#0f172a',
                color: '#fff',
                border: 'none',
                borderRadius: '9999px',
                padding: '0.45rem 1.1rem',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Analyze →
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          padding: '5rem 2rem 4rem',
          display: 'flex',
          alignItems: 'center',
          gap: '4rem',
          flex: 1,
        }}
        className="hero-layout"
      >
        {/* Left column */}
        <div style={{ flex: '0 0 auto', maxWidth: '520px', width: '100%' }}>
          {/* Pill badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '9999px',
              padding: '0.3rem 0.9rem',
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.7rem',
              color: '#64748b',
              marginBottom: '1.75rem',
            }}
          >
            <span style={{ color: '#94a3b8' }}>←</span>
            github profile analyzer
            <span style={{ color: '#94a3b8' }}>→</span>
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              margin: '0 0 0.25rem',
              color: '#0f172a',
            }}
          >
            Your GitHub is losing
            <br />
            you{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              jobs.
            </span>
          </h1>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              margin: '0 0 1.75rem',
              color: '#cbd5e1',
            }}
          >
            Fix it in 5 minutes.
          </h2>

          {/* Subheadline */}
          <p
            style={{
              fontSize: '1rem',
              color: '#64748b',
              lineHeight: 1.65,
              margin: '0 0 2rem',
              maxWidth: '420px',
            }}
          >
            We score your profile across 5 categories and give you a ranked action plan.
            No fluff — just what actually moves the needle.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '400px' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                id="username-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  padding: '0.75rem 1rem',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.875rem',
                  color: '#0f172a',
                  outline: 'none',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#7c3aed';
                  e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="submit"
                disabled={loading || !username.trim()}
                style={{
                  background: loading || !username.trim() ? '#f1f5f9' : 'linear-gradient(135deg, #7c3aed, #9333ea)',
                  color: loading || !username.trim() ? '#94a3b8' : '#fff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: loading || !username.trim() ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'opacity 0.15s, box-shadow 0.15s',
                  boxShadow: loading || !username.trim() ? 'none' : '0 4px 14px rgba(124,58,237,0.35)',
                }}
              >
                {loading ? 'Checking...' : 'Analyze →'}
              </button>
            </div>

            {error && (
              <p
                style={{
                  fontSize: '0.8rem',
                  color: '#E24B4A',
                  backgroundColor: '#fdecea',
                  border: '1px solid #f9c5c5',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 0.875rem',
                  margin: 0,
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
              fontSize: '0.68rem',
              color: '#94a3b8',
              margin: '1rem 0 0',
            }}
          >
            no login · no email · 100% public API
          </p>
        </div>

        {/* Right column — score card preview */}
        <div style={{ flex: 1, minWidth: 0 }} className="hero-right">
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e5e7eb',
              borderRadius: '1.25rem',
              padding: '1.25rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
            }}
          >
            {/* Fake browser chrome */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginBottom: '1rem',
                paddingBottom: '0.875rem',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <div style={{ width: '10px', height: '10px', borderRadius: '9999px', backgroundColor: '#fca5a5' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '9999px', backgroundColor: '#fde68a' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '9999px', backgroundColor: '#86efac' }} />
              <div
                style={{
                  flex: 1,
                  marginLeft: '0.5rem',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '0.375rem',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '0.5rem',
                }}
              >
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: '#94a3b8' }}>
                  githubmaxxing.vercel.app/results
                </span>
              </div>
            </div>

            {/* Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {GRADE_EXAMPLES.map((ex) => (
                <ExampleCard key={ex.username} example={ex} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e5e7eb', padding: '1.25rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.65rem',
              color: '#94a3b8',
              textAlign: 'center',
              margin: 0,
            }}
          >
            githubmaxxing.vercel.app · free · no login required
          </p>
        </div>
      </footer>
    </main>
  );
}
