import React, { useEffect, useState } from "react";

const PROJECTS = [
  {
    name: "Full Stack Managment Project",
    url: "https://fullstackmangproj88backfronted.onrender.com/ins/home",
    github: "https://github.com/Vamsi759/FullstackMangProj88fronted/tree/main",
    icon: "🗄️",
    desc: "Full Stack Backend + Frontend",
  },
  {
    name: "Student Management (Thymeleaf)",
    url: "https://emp1-jan-thymleaf-2-us8d.onrender.com/students/open",
    github: "https://github.com/Vamsi759/emp1_jan_thymleaf/tree/main",
    icon: "🎓",
    desc: "Student Portal with Thymeleaf",
  },
  {
    name: "Entity Data Registration",
    url: "https://entitydataregistrationproject.onrender.com/students",
    github: "https://github.com/Vamsi759/EntityDataRegistrationproject/tree/main",
    icon: "🗄️",
    desc: "Entity & Data Registration System",
  },
  {
    name: "AI Study Notes",
    url: "https://aistudynotesavingonlinewebapp.onrender.com/api/open7",
    github: "https://github.com/Vamsi759/AiNoteden/tree/main",
    icon: "🤖",
    desc: "AI-Powered Study Notes Saver",
  },
   {
    name: "CyclesManagmentfullstackproject",
    url: "https://cyclescompanyfullstackproject.onrender.com/api/open",
    github: "https://github.com/Vamsi759/CyclesCompanyFullStackProject",
    icon: "🗄️",
    desc: "Full Stack Backend + Frontend",
  },
  
];
/*
{
    name: "Ai ChatBoot",
    url: "https://aistudynotessaving.onrender.com/api/open7",
    github: "https://github.com/Vamsi759/AIStudyNotesSave/tree/main",
    icon: "🗄️",
    desc: "Ai ChatBoot",
  },
*/
const TOTAL_SECONDS = 120;

export default function App() {
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const [showButtons, setShowButtons] = useState(false);
  const [serverStatus, setServerStatus] = useState(
    PROJECTS.map(() => "waking")
  );

  useEffect(() => {
    PROJECTS.forEach((project, idx) => {
      fetch(project.url)
        .then(() => {
          setServerStatus((prev) => {
            const next = [...prev];
            next[idx] = "online";
            return next;
          });
        })
        .catch(() => {
          setServerStatus((prev) => {
            const next = [...prev];
            next[idx] = "sleeping";
            return next;
          });
        });
    });

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowButtons(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  const progress = ((TOTAL_SECONDS - seconds) / TOTAL_SECONDS) * 100;
  const radius = 95;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const statusColor = {
    online: "#22c55e",
    sleeping: "#ef4444",
    waking: "#fbbf24",
  };
  const statusLabel = {
    online: "✅ Online",
    sleeping: "💤 Sleeping",
    waking: "⏳ Waking...",
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; background: #0f172a; }

        .main {
          min-height: 100vh;
          background: linear-gradient(-45deg, #0f172a, #1e3a5f, #1a2e4a, #0f2027);
          background-size: 400% 400%;
          animation: bgShift 14s ease infinite;
          padding: 32px 16px;
        }
        @keyframes bgShift {
          0%   { background-position: 0% 50% }
          50%  { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }

        .dashboard {
          max-width: 920px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .header {
          text-align: center;
          margin-bottom: 36px;
        }
        .rocket { font-size: 64px; display: inline-block; animation: fly 2s ease-in-out infinite; }
        @keyframes fly { 50% { transform: translateY(-12px); } }
        .header h1 {
          font-size: 2rem;
          font-weight: 800;
          color: #fff;
          margin-top: 12px;
          letter-spacing: -0.5px;
        }
        .header p { color: #94a3b8; margin-top: 6px; font-size: 0.95rem; }

        /* ── Timer Card ── */
        .timer-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
          margin-bottom: 28px;
          backdrop-filter: blur(16px);
        }
        .timer-ring { position: relative; width: 220px; height: 220px; margin: 0 auto 20px; }
        .timer-ring svg { transform: rotate(-90deg); }
        .time-text {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-size: 42px; font-weight: 800; color: #fff; letter-spacing: 2px;
        }
        .progress-bar-wrap {
          background: rgba(255,255,255,0.1);
          border-radius: 99px; height: 10px; overflow: hidden; margin-top: 4px;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00ffcc, #00b4d8);
          border-radius: 99px;
          transition: width 1s linear;
        }
        .timer-note { color: #94a3b8; font-size: 0.85rem; margin-top: 14px; }

        /* ── Section Title ── */
        .section-title {
          color: #e2e8f0;
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .section-title span { color: #00ffcc; }

        /* ── Project Cards Grid ── */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 28px;
        }
        .proj-card {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          transition: transform 0.2s, background 0.2s;
        }
        .proj-card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.12); }
        .proj-icon { font-size: 36px; }
        .proj-name { color: #fff; font-weight: 700; font-size: 0.9rem; text-align: center; }
        .proj-desc { color: #94a3b8; font-size: 0.78rem; text-align: center; }

        .btn-open {
          width: 100%;
          padding: 9px 0;
          border: none;
          border-radius: 9px;
          background: linear-gradient(135deg, #00ffcc, #00b4d8);
          color: #0f172a;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
        }
        .btn-open:hover { opacity: 0.88; transform: scale(1.03); }
        .btn-open:disabled {
          background: rgba(255,255,255,0.12);
          color: #64748b;
          cursor: not-allowed;
          transform: none;
        }

        .btn-github {
          width: 100%;
          padding: 8px 0;
          border: 1.5px solid rgba(255,255,255,0.2);
          border-radius: 9px;
          background: transparent;
          color: #e2e8f0;
          font-weight: 600;
          font-size: 0.82rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: background 0.2s, border-color 0.2s;
          text-decoration: none;
        }
        .btn-github:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.4);
        }
        .github-icon { width: 15px; height: 15px; fill: #e2e8f0; flex-shrink: 0; }

        /* ── Status List ── */
        .status-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
        .status-row {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 12px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.2s;
        }
        .status-row:hover { background: rgba(255,255,255,0.1); }
        .status-left { display: flex; align-items: center; gap: 12px; }
        .status-icon { font-size: 22px; }
        .status-name { color: #fff; font-weight: 600; font-size: 0.88rem; }
        .status-url { color: #64748b; font-size: 0.73rem; margin-top: 2px; word-break: break-all; }
        .status-badge {
          font-size: 0.78rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 99px;
          white-space: nowrap;
        }

        /* ── Footer ── */
        .footer { text-align: center; color: #475569; font-size: 0.8rem; margin-top: 8px; padding-bottom: 16px; }
        .footer strong { color: #64748b; }
      `}</style>

      <div className="main">
        <div className="dashboard">

          {/* Header */}
          <div className="header">
            <div className="rocket">🚀</div>
            <h1>Render Server Dashboard</h1>
            <p>Waking up all services — this takes about 2 minutes on free tier.</p>
          </div>

          {/* Timer Card */}
          <div className="timer-card">
            <div className="timer-ring">
              <svg width="220" height="220">
                <circle cx="110" cy="110" r={radius}
                  stroke="rgba(255,255,255,0.12)" strokeWidth="12" fill="none" />
                <circle cx="110" cy="110" r={radius}
                  stroke="#00ffcc" strokeWidth="12" fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s linear" }} />
              </svg>
              <div className="time-text">{minutes}:{sec}</div>
            </div>
            <div className="progress-bar-wrap">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="timer-note">
              {showButtons
                ? "✅ All servers should be awake — open your projects below!"
                : "⏳ Open buttons will appear after the countdown."}
            </p>
          </div>

          {/* Project Cards Grid */}
          <p className="section-title"><span>⚡</span>Full Stack Projects</p>
          <div className="grid">
            {PROJECTS.map((proj, idx) => (
              <div className="proj-card" key={idx}>
                <div className="proj-icon">{proj.icon}</div>
                <div className="proj-name">{proj.name}</div>
                <div className="proj-desc">{proj.desc}</div>

                <button
                  className="btn-open"
                  disabled={!showButtons}
                  onClick={() => window.open(proj.url, "_blank")}
                >
                  {showButtons ? "Open App" : `${minutes}:${sec}`}
                </button>

                {/* GitHub Button */}
                <a
                  className="btn-github"
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="github-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  GitHub Repo
                </a>
              </div>
            ))}
          </div>

          {/* Status List */}
          <p className="section-title"><span>📡</span> Server Status</p>
          <div className="status-list">
            {PROJECTS.map((proj, idx) => (
              <div className="status-row" key={idx}>
                <div className="status-left">
                  <div className="status-icon">{proj.icon}</div>
                  <div>
                    <div className="status-name">{proj.name}</div>
                    <div className="status-url">{proj.url}</div>
                  </div>
                </div>
                <span
                  className="status-badge"
                  style={{
                    background: statusColor[serverStatus[idx]] + "22",
                    color: statusColor[serverStatus[idx]],
                    border: `1px solid ${statusColor[serverStatus[idx]]}44`,
                  }}
                >
                  {statusLabel[serverStatus[idx]]}
                </span>
              </div>
            ))}
          </div>

          <div className="footer">
            <strong>Render free tier</strong> — instances spin down after 15 min of inactivity and take 1–2 min to wake.
          </div>

        </div>
      </div>
    </>
  );
}
