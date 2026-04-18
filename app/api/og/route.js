import { ImageResponse } from 'next/og';

export const runtime = 'edge';

function tierColor(total) {
  const score = Number(total);
  if (score >= 80) return { accent: '#4ade80', glow: 'rgba(74,222,128,0.18)', tier: 'A' };
  if (score >= 60) return { accent: '#fbbf24', glow: 'rgba(251,191,36,0.18)', tier: 'B' };
  return { accent: '#f87171', glow: 'rgba(248,113,113,0.18)', tier: 'C' };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'github user';
  const score = searchParams.get('score') || '0';
  const label = searchParams.get('label') || '—';
  const percentile = searchParams.get('percentile') || '';
  const avatar = searchParams.get('avatar') || '';

  const { accent, glow } = tierColor(score);
  const scoreNum = Number(score);
  const barWidth = Math.round((scoreNum / 100) * 520);

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#08080f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Purple radial glow top-left */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '-80px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)',
            borderRadius: '9999px',
          }}
        />

        {/* Tier accent glow bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-60px',
            width: '500px',
            height: '500px',
            background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
            borderRadius: '9999px',
          }}
        />

        {/* Dot grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '860px',
            background: 'rgba(14,14,22,0.92)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '28px',
            padding: '56px 64px',
            position: 'relative',
            overflow: 'hidden',
            gap: '0',
          }}
        >
          {/* Top accent line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '64px',
              right: '64px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #7c3aed, #a855f7, transparent)',
            }}
          />

          {/* Brand row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '36px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '12px', height: '12px', background: 'white', borderRadius: '3px', opacity: 0.9 }} />
              </div>
              <span style={{ fontSize: '16px', color: '#888', letterSpacing: '0.06em', fontFamily: 'sans-serif' }}>
                github<span style={{ color: '#639922' }}>maxxing</span>
              </span>
            </div>

            {percentile && (
              <span
                style={{
                  fontSize: '13px',
                  color: '#666',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '5px 14px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                }}
              >
                {percentile}
              </span>
            )}
          </div>

          {/* Main content row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px', marginBottom: '40px' }}>
            {/* Avatar */}
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatar}
                width="72"
                height="72"
                style={{
                  borderRadius: '9999px',
                  border: '2px solid rgba(255,255,255,0.12)',
                  flexShrink: 0,
                }}
                alt=""
              />
            ) : (
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #1a1a2e, #2d1f4d)',
                  border: '2px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#a855f7',
                  fontSize: '24px',
                  fontWeight: 700,
                  flexShrink: 0,
                  fontFamily: 'sans-serif',
                }}
              >
                {username.slice(0, 2).toUpperCase()}
              </div>
            )}

            {/* Username + label */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <span style={{ fontSize: '26px', color: '#e2e2e2', fontWeight: 600, fontFamily: 'sans-serif', letterSpacing: '-0.01em' }}>
                @{username}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  fontSize: '13px',
                  color: '#a855f7',
                  background: 'rgba(124,58,237,0.15)',
                  border: '1px solid rgba(124,58,237,0.3)',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  width: 'fit-content',
                }}
              >
                {label}
              </span>
            </div>

            {/* Score */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', flexShrink: 0 }}>
              <span
                style={{
                  fontSize: '100px',
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontFamily: 'sans-serif',
                }}
              >
                {score}
              </span>
              <span style={{ fontSize: '28px', color: '#333', fontWeight: 400, fontFamily: 'sans-serif' }}>/100</span>
            </div>
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: '100%',
              height: '8px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '9999px',
              overflow: 'hidden',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: `${barWidth}px`,
                height: '8px',
                background: `linear-gradient(90deg, #7c3aed, ${accent})`,
                borderRadius: '9999px',
                boxShadow: `0 0 12px rgba(124,58,237,0.5)`,
              }}
            />
          </div>

          {/* Footer */}
          <span style={{ fontSize: '12px', color: '#333', fontFamily: 'monospace', letterSpacing: '0.04em' }}>
            githubmaxxing.vercel.app · free · no login required
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
