import { Truck } from "lucide-react";

const StoreLoader = () => {
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
        zIndex: 9999,
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
            <path d="M12 2C8 2 4 5 4 10c0 6 8 12 8 12s8-6 8-12c0-5-4-8-8-8zm0 10a3 3 0 110-6 3 3 0 010 6z" />
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

      {/* Center content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Road + Truck animation */}
        <div style={{ position: "relative", width: "320px", height: "120px" }}>
          {/* Road */}
          <div
            style={{
              position: "absolute",
              bottom: "18px",
              left: 0,
              right: 0,
              height: "3px",
              backgroundColor: "#e2e8f0",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                backgroundColor: "#0ea5e9",
                borderRadius: "2px",
                animation: "roadFill 2s ease-in-out infinite",
              }}
            />
          </div>

          {/* Dashed road line */}
          <div
            style={{
              position: "absolute",
              bottom: "22px",
              left: 0,
              right: 0,
              height: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                animation: "dashMove 0.6s linear infinite",
                display: "flex",
                gap: "8px",
                width: "200%",
              }}
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "20px",
                    height: "2px",
                    backgroundColor: "#cbd5e1",
                    borderRadius: "1px",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Truck SVG */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              animation: "truckDrive 2s ease-in-out infinite",
            }}
          >
            {/* Brand label above truck */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "4px",
                animation: "bobble 2s ease-in-out infinite",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "700",
                  color: "#0ea5e9",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Aqua Forge
              </span>
            </div>

            {/* Truck body */}
            <svg
              width="100"
              height="52"
              viewBox="0 0 100 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Trailer */}
              <rect x="0" y="8" width="62" height="32" rx="3" fill="#0ea5e9" />
              {/* Trailer detail lines */}
              <line
                x1="20"
                y1="8"
                x2="20"
                y2="40"
                stroke="white"
                strokeWidth="0.8"
                strokeOpacity="0.4"
              />
              <line
                x1="40"
                y1="8"
                x2="40"
                y2="40"
                stroke="white"
                strokeWidth="0.8"
                strokeOpacity="0.4"
              />
              {/* Logo on trailer */}
              <text
                x="31"
                y="28"
                textAnchor="middle"
                fill="white"
                fontSize="7"
                fontWeight="bold"
                opacity="0.9"
              >
                AF
              </text>
              {/* Cab */}
              <rect
                x="62"
                y="14"
                width="30"
                height="26"
                rx="3"
                fill="#0284c7"
              />
              {/* Windshield */}
              <rect
                x="66"
                y="16"
                width="18"
                height="14"
                rx="2"
                fill="#bae6fd"
                opacity="0.9"
              />
              {/* Cab top curve */}
              <path d="M62 17 Q70 8 84 14" fill="#0284c7" />
              {/* Front bumper */}
              <rect x="90" y="32" width="10" height="5" rx="1" fill="#0369a1" />
              {/* Exhaust pipe */}
              <rect x="86" y="8" width="4" height="8" rx="1" fill="#475569" />
              {/* Smoke puffs */}
              <circle cx="88" cy="5" r="2.5" fill="#cbd5e1" opacity="0.7">
                <animate
                  attributeName="cy"
                  values="5;0;-5"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.7;0.3;0"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="r"
                  values="2.5;4;5"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="86" cy="3" r="1.5" fill="#e2e8f0" opacity="0.5">
                <animate
                  attributeName="cy"
                  values="3;-2;-7"
                  dur="0.8s"
                  begin="0.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.5;0.2;0"
                  dur="0.8s"
                  begin="0.2s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Front wheel */}
              <circle cx="78" cy="42" r="8" fill="#1e293b" />
              <circle cx="78" cy="42" r="4" fill="#475569" />
              <circle cx="78" cy="42" r="1.5" fill="#94a3b8" />
              {/* Rear wheel */}
              <circle cx="14" cy="42" r="8" fill="#1e293b" />
              <circle cx="14" cy="42" r="4" fill="#475569" />
              <circle cx="14" cy="42" r="1.5" fill="#94a3b8" />
              {/* Second rear wheel */}
              <circle cx="30" cy="42" r="8" fill="#1e293b" />
              <circle cx="30" cy="42" r="4" fill="#475569" />
              <circle cx="30" cy="42" r="1.5" fill="#94a3b8" />
              {/* Water droplet on trailer */}
              <path
                d="M52 18 Q54 14 56 18 Q56 22 52 22 Z"
                fill="white"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Wheel spin overlay (rotation effect) */}
          <style>{`
            @keyframes truckDrive {
              0%   { transform: translateX(-20px); }
              50%  { transform: translateX(10px); }
              100% { transform: translateX(-20px); }
            }
            @keyframes bobble {
              0%, 100% { transform: translateY(0px); }
              50%       { transform: translateY(-2px); }
            }
            @keyframes roadFill {
              0%   { width: 0%; }
              50%  { width: 100%; }
              100% { width: 0%; }
            }
            @keyframes dashMove {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes dotPulse {
              0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
              40%           { opacity: 1;   transform: scale(1); }
            }
          `}</style>
        </div>

        {/* Text */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "13px",
              color: "#64748b",
              fontWeight: "500",
              letterSpacing: "0.02em",
              display: "flex",
              alignItems: "center",
              gap: "2px",
            }}
          >
            Please Waiting
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: "#0ea5e9",
                  animation: `dotPulse 1.4s ease-in-out ${i * 0.15}s infinite`,
                  marginLeft: i === 0 ? "4px" : "2px",
                }}
              />
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreLoader;
