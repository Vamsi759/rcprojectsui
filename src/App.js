import React, { useEffect, useState } from "react";
import "./App.css";

const PROJECT_URLS = [
  "https://fullstackmangproj88backfronted.onrender.com/ins/home",
  "https://emp1-jan-thymleaf-2-us8d.onrender.com/students/open","https://entitydataregistrationproject.onrender.com/students","https://aistudynotessaving.onrender.com/api/open",
];

const TOTAL_SECONDS = 120;

function App() {
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const [showButtons, setShowButtons] = useState(false); // ✅ moved INSIDE component

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      body { margin:0; font-family:'Segoe UI',sans-serif; background:#0f172a; }
      .main { min-height:100vh; display:flex; justify-content:center; align-items:center;
        background:linear-gradient(-45deg,#1e3c72,#2a5298,#4facfe,#00c6ff);
        background-size:400% 400%; animation:bg 12s ease infinite; }
      @keyframes bg { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
      .glass { width:750px; padding:40px; border-radius:25px; background:rgba(255,255,255,.15);
        backdrop-filter:blur(18px); color:white; box-shadow:0 15px 40px rgba(0,0,0,.3); }
      .rocket { font-size:70px; animation:fly 2s infinite; }
      @keyframes fly { 50%{transform:translateY(-10px)} }
      .timer { width:220px; height:220px; margin:auto; position:relative; }
      .timer svg { transform:rotate(-90deg); }
      .timeText { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
        font-size:38px; font-weight:bold; }
      .server { background:rgba(255,255,255,.1); padding:15px; border-radius:12px;
        margin-top:15px; transition:.3s; }
      .server:hover { transform:scale(1.02); background:rgba(255,255,255,.2); }
      .footer { margin-top:25px; text-align:center; opacity:.9; }

      /* ✅ Bootstrap utilities (no longer needing Bootstrap import) */
      .text-center { text-align:center; }
      .fw-bold { font-weight:bold; }
      .mt-4 { margin-top:1.5rem; }
      .mt-5 { margin-top:3rem; }
      .mb-4 { margin-bottom:1.5rem; }
      .mb-3 { margin-bottom:1rem; }
      .d-flex { display:flex; }
      .justify-content-between { justify-content:space-between; }
      .align-self-center { align-self:center; }
      .row { display:flex; flex-wrap:wrap; margin:0 -8px; }
      .col-md-4 { width:33.33%; padding:0 8px; box-sizing:border-box; }
      .card { background:rgba(255,255,255,.15); border-radius:12px; border:none; }
      .card-body { padding:1rem; text-align:center; }
      .badge { padding:5px 12px; border-radius:6px; font-size:13px; font-weight:600; }
      .bg-warning { background:#fbbf24; }
      .text-dark { color:#1a1a1a; }
      .bg-success { background:#22c55e; }
      .btn { padding:10px 16px; border:none; border-radius:8px; cursor:pointer;
        font-weight:600; font-size:15px; transition:.2s; }
      .btn-success { background:#22c55e; color:white; }
      .btn-success:hover { background:#16a34a; }
      .w-100 { width:100%; }
      .progress { background:rgba(255,255,255,.15); border-radius:9px; overflow:hidden; height:18px; }
      .progress-bar { height:100%; transition:width 1s linear; }
      .progress-bar-animated { animation:none; }
      .spinner-border { display:block; width:50px; height:50px; border:5px solid rgba(255,255,255,.2);
        border-top-color:#fbbf24; border-radius:50%; animation:spin 0.8s linear infinite; margin:auto; }
      @keyframes spin { to { transform:rotate(360deg); } }
    `;
    document.head.appendChild(style);

    PROJECT_URLS.forEach((url) => {
      fetch(url)
        .then(() => console.log("Waking:", url))
        .catch(() => console.log("Sleeping:", url));
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

    return () => {
      clearInterval(timer);
      document.head.removeChild(style);
    };
  }, []);

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  const progress = ((TOTAL_SECONDS - seconds) / TOTAL_SECONDS) * 100;
  const radius = 95;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="main">
      <div className="glass">
        <div className="text-center">
          <div className="rocket">🚀</div>
          <h1 className="fw-bold">Starting Render Servers</h1>
          <p>Please wait while all applications wake up...</p>
        </div>

        <div className="timer">
          <svg width="220" height="220">
            <circle cx="110" cy="110" r={radius}
              stroke="rgba(255,255,255,.2)" strokeWidth="12" fill="none" />
            <circle cx="110" cy="110" r={radius}
              stroke="#00ffcc" strokeWidth="12" fill="none"
              strokeDasharray={circumference} strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s linear" }} />
          </svg>
          <div className="timeText">{minutes}:{sec}</div>
        </div>

        <div className="progress mt-4">
          <div className="progress-bar bg-success"
            style={{ width: `${progress}%` }}></div>
        </div>

       

         {showButtons && (
          <div className="mt-5">
            <h2 className="text-center mb-4">🚀 Open Your Projects</h2>
            <div className="row">
              {PROJECT_URLS.map((url, index) => (
                <div className="col-md-4 mb-3" key={index}>
                  <div className="card">
                    <div className="card-body text-center">
                      <h5>Project {index + 1}</h5>
                      <button className="btn btn-success w-100"
                        onClick={() => window.open(url, "_blank")}>
                        Open Project
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <h3 className="mt-5 text-center">Projects</h3>

        {PROJECT_URLS.map((url, index) => (
          <div key={index} className="server">
            <div className="d-flex justify-content-between">
              <div>
                <strong>Project {index + 1}</strong><br />
                <small>{url}</small>
              </div>
              <span className="badge bg-warning text-dark align-self-center">
                Starting...
              </span>
            </div>
          </div>
        ))}

        <div className="footer">
          <h5>⏳ Projects open buttons will create after the countdown.</h5>
          <p>Render free instances may take 1–2 minutes to wake up.</p>
        </div>

       
      </div>
    </div>
  );
}

export default App;