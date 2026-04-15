import { useEffect, useState } from "react";

const OfflinePage = () => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((p) => (p + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top-left Logo */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "10px",
            backgroundColor: "#0ea5e9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C8.5 2 5.5 4.5 5 8c-2.5.5-4 2.8-4 5 0 2.8 2.2 5 5 5h12c2.2 0 4-1.8 4-4 0-2-.8-3.5-2.5-4.2C19 6.3 15.8 2 12 2z" />
          </svg>
        </div>
        <span
          style={{
            fontSize: "15px",
            fontWeight: "700",
            color: "#0f172a",
            letterSpacing: "-0.3px",
          }}
        >
          Aqua Forge
        </span>
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
          padding: "0 24px",
          maxWidth: "420px",
          textAlign: "center",
        }}
      >
        {/* WiFi SVG illustration */}
        <div style={{ position: "relative", width: "160px", height: "160px" }}>
          {/* Outer glow ring */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              backgroundColor: "#f0f9ff",
              border: "1.5px solid #e0f2fe",
              animation: "pulseRing 2.5s ease-in-out infinite",
            }}
          />

          <svg
            width="160"
            height="160"
            viewBox="0 0 160 160"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* WiFi arcs — all grey (no signal) */}
            {/* Outermost arc */}
            <path
              d="M 28 88 Q 80 28 132 88"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Middle arc */}
            <path
              d="M 44 100 Q 80 52 116 100"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Inner arc */}
            <path
              d="M 60 112 Q 80 76 100 112"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Dot */}
            <circle cx="80" cy="126" r="7" fill="#e2e8f0" />

            {/* X mark over wifi */}
            <circle cx="112" cy="52" r="22" fill="#fef2f2" />
            <line
              x1="103"
              y1="43"
              x2="121"
              y2="61"
              stroke="#ef4444"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="121"
              y1="43"
              x2="103"
              y2="61"
              stroke="#ef4444"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Animated signal attempt — one arc lights up and fades */}
            <path
              d="M 60 112 Q 80 76 100 112"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;0.8;0"
                dur="2s"
                repeatCount="indefinite"
                begin="0s"
              />
            </path>
            <path
              d="M 44 100 Q 80 52 116 100"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;0.5;0"
                dur="2s"
                repeatCount="indefinite"
                begin="0.3s"
              />
            </path>
          </svg>
        </div>

        {/* Text block */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#0f172a",
              margin: 0,
            }}
          >
            No Internet Connection
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "#94a3b8",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            Looks like you're offline. Please check your Wi-Fi or mobile data
            and try again.
          </p>
        </div>

        {/* Retry button */}
        <button
          onClick={() => window.location.reload()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#0ea5e9",
            color: "white",
            border: "none",
            borderRadius: "14px",
            padding: "12px 28px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background 0.2s",
            letterSpacing: "0.01em",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#0284c7")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#0ea5e9")
          }
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {/* Retry icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 4v6h6" />
            <path d="M3.51 15a9 9 0 1 0 .49-3" />
          </svg>
          Try Again
        </button>

        {/* Waiting dots */}
        <p
          style={{
            fontSize: "12px",
            color: "#cbd5e1",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          Waiting for connection
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: i < dots ? "#0ea5e9" : "#e2e8f0",
                transition: "background 0.3s",
                marginLeft: "2px",
              }}
            />
          ))}
        </p>
      </div>

      <style>{`
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.04); opacity: 0.7; }
        }
      `}</style>

      {/* Bottom credit */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          fontSize: "11px",
          color: "#cbd5e1",
        }}
      >
        © 2026 Aqua Forge · Smlo LLC
      </div>
    </div>
  );
};

export default OfflinePage;
