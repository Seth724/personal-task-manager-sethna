"use client";
import { useEffect, useState } from "react";

export default function Footer() {
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowUp(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer style={{
      marginTop: "3rem",
      background: "var(--surface, #1a1a2e)",
      borderTop: "1px solid var(--line, #333)",
      color: "var(--text, #eee)",
      position: "relative",
      transition: "background 0.3s, color 0.3s"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
          <span style={{ fontSize: "1.3rem", color: "var(--accent, #fd6900)" }}>⚡</span>
          <strong>TaskMaster</strong>
          <span style={{ color: "var(--text-muted, #aaa)", marginLeft: "0.5rem" }}>Organize • Track • Achieve</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", margin: "1rem 0 1.5rem" }}>
          <div>
            <h4 style={{ marginBottom: ".4rem", color: "blue" }}>Product</h4>
            
            <a href="/tasks" style={{ display: "block", padding: ".2rem 0", color: "var(--text, #eee)", textDecoration: "none" }}>Task</a>
          </div>
          <div>
            <h4 style={{ marginBottom: ".4rem", color: "blue" }}>Resources</h4>
            <a href="https://github.com/Seth724/personal-task-manager-sethna" target="_blank" rel="noreferrer"
               style={{ display: "block", padding: ".2rem 0", color: "var(--text, #eee)", textDecoration: "none" }}>GitHub</a>
          </div>
          <div>
            <h4 style={{ marginBottom: ".4rem", color: "blue" }}>Legal</h4>
            <a href="#" style={{ display: "block", padding: ".2rem 0", color: "var(--text, #eee)", textDecoration: "none" }}>Terms</a>
            <a href="#" style={{ display: "block", padding: ".2rem 0", color: "var(--text, #eee)", textDecoration: "none" }}>Privacy</a>
          </div>
        </div>

        <div style={{ color: "var(--text-muted, #aaa)", fontSize: ".9rem" }}>
          © {new Date().getFullYear()} TaskMaster. All rights reserved.
        </div>
      </div>

      {showUp && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top"
          style={{
            position: "fixed",
            right: "18px",
            bottom: "22px",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "1px solid var(--line, #333)",
            background: "var(--surface, #1a1a2e)",
            color: "var(--text, #eee)",
            cursor: "pointer",
            boxShadow: "0 10px 24px rgba(0,0,0,.25)",
            transition: "background 0.3s, color 0.3s"
          }}>↑</button>
      )}
    </footer>
  );
}
