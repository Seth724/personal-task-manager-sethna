// "use client";
// import { useState } from "react";
// import { Button } from "./ui/button";


// const FORMSPREE = "https://formspree.io/f/mqadbwgr";

// export default function ContactSection() {
//   const [sent, setSent] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   async function onSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const form = e.currentTarget;
//       const r = await fetch(FORMSPREE, {
//         method: "POST",
//         headers: { "Accept": "application/json" },
//         body: new FormData(form),
//       });
//       const j = await r.json();
//       if (!r.ok || j.ok === false) throw new Error(j.errors?.[0]?.message || "Failed to send");
//       form.reset();
//       setSent(true);
//     } catch (err) {
//       setError(err.message || "Failed to send");
//     } finally {
//       setLoading(false);
//     }
//   }

//   const cardStyle = {
//     maxWidth: "760px",
//     padding: "2rem",
//     borderRadius: "24px",
//     background: "var(--panel, #1f1f3a)",
//     color: "var(--text, #eee)",
//     boxShadow: "0 30px 60px rgba(0,0,0,.5)",
//     transition: "background 0.3s, color 0.3s"
//   };

//   const inputStyle = {
//     width: "100%",
//     padding: "0.8rem",
//     borderRadius: "12px",
//     border: "1px solid var(--line, #555)",
//     background: "var(--input-bg, #2a2a4a)",
//     color: "var(--text, #eee)",
//     outline: "none",
//     transition: "border-color 0.3s, box-shadow 0.3s"
//   };

//   const buttonStyle = {
//     width: "100%",
//     padding: "1rem",
//     borderRadius: "12px",
//     border: "none",
//     fontWeight: 700,
//     background: "var(--accent, #fd6900)",
//     color: "blue",
//     cursor: "pointer",
//     transition: "transform 0.15s, filter 0.15s"
//   };

//   if (sent) {
//     return (
//       <section style={{ display: "grid", placeItems: "center", padding: "3rem 1rem", minHeight: "50vh" }}>
//         <div style={{ ...cardStyle, textAlign: "center" }}>
//           <h1 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Thanks! 🎉</h1>
//           <p>We will reply to you soon.</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section style={{ display: "grid", placeItems: "center", padding: "3rem 1rem", minHeight: "50vh" }}>
//       <div style={cardStyle}>
//         <header style={{ textAlign: "center", marginBottom: "1.25rem" }}>
//           <h1 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Contact Us</h1>
//           <p>Have a question or feedback? Fill out this form and we will get back to you.</p>
//         </header>

//         <form onSubmit={onSubmit} style={{ display: "grid", gap: "1rem" }}>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
//             <label>
//               <span>First Name *</span>
//               <input name="firstName" required style={inputStyle} />
//             </label>
//             <label>
//               <span>Last Name *</span>
//               <input name="lastName" required style={inputStyle} />
//             </label>
//           </div>

//           <label>
//             <span>Email *</span>
//             <input type="email" name="email" required style={inputStyle} />
//           </label>

//           <label>
//             <span>Phone Number</span>
//             <input type="tel" name="phone" placeholder="+1 (555) 000-0000" style={inputStyle} />
//           </label>

//           <label>
//             <span>Message *</span>
//             <textarea name="message" rows="5" required placeholder="Leave us a message..." style={inputStyle} />
//           </label>

//           <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text, #eee)" }}>
//             <input type="checkbox" name="agree" required />
//             <span>You agree to our <a href="/privacy" style={{ color: "gray" }}>privacy policy</a>.</span>
//           </label>

//           {error && <p style={{ color: "red" }}>{error}</p>}

//           <Button className="contact-submit" type="submit" disabled={loading} style={buttonStyle}>
//             {loading ? "Sending…" : "Send Message"}
//           </Button>
//         </form>
//       </div>
//     </section>
//   );
// }


"use client"

import { useState } from "react"
import { Button } from "./ui/button"

const FORMSPREE = "https://formspree.io/f/mqadbwgr"

export default function ContactSection() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const form = e.currentTarget
      const r = await fetch(FORMSPREE, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
      const j = await r.json()
      if (!r.ok || j.ok === false)
        throw new Error(j.errors?.[0]?.message || "Failed to send")
      form.reset()
      setSent(true)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Failed to send")
      }
    } finally {
      setLoading(false)
    }
  }

  const cardStyle = {
    maxWidth: "760px",
    padding: "2rem",
    borderRadius: "24px",
    background: "var(--panel, #1f1f3a)",
    color: "var(--text, #eee)",
    boxShadow: "0 30px 60px rgba(0,0,0,.5)",
    transition: "background 0.3s, color 0.3s",
  }

  const inputStyle = {
    width: "100%",
    padding: "0.8rem",
    borderRadius: "12px",
    border: "1px solid var(--line, #555)",
    background: "var(--input-bg, #2a2a4a)",
    color: "var(--text, #eee)",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
  }

  const buttonStyle = {
    width: "100%",
    padding: "1rem",
    borderRadius: "12px",
    border: "none",
    fontWeight: 700,
    background: "var(--accent, #fd6900)",
    color: "blue",
    cursor: "pointer",
    transition: "transform 0.15s, filter 0.15s",
  }

  if (sent) {
    return (
      <section
        style={{
          display: "grid",
          placeItems: "center",
          padding: "3rem 1rem",
          minHeight: "50vh",
        }}
      >
        <div style={{ ...cardStyle, textAlign: "center" }}>
          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: 800,
              marginBottom: "0.5rem",
            }}
          >
            Thanks! 🎉
          </h1>
          <p>We will reply to you soon.</p>
        </div>
      </section>
    )
  }

  return (
    <section
      style={{
        display: "grid",
        placeItems: "center",
        padding: "3rem 1rem",
        minHeight: "50vh",
      }}
    >
      <div style={cardStyle}>
        <header style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: 800,
              marginBottom: "0.5rem",
            }}
          >
            Contact Us
          </h1>
          <p>
            Have a question or feedback? Fill out this form and we will get
            back to you.
          </p>
        </header>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: "1rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <label>
              <span>First Name *</span>
              <input name="firstName" required style={inputStyle} />
            </label>
            <label>
              <span>Last Name *</span>
              <input name="lastName" required style={inputStyle} />
            </label>
          </div>

          <label>
            <span>Email *</span>
            <input type="email" name="email" required style={inputStyle} />
          </label>

          <label>
            <span>Phone Number</span>
            <input
              type="tel"
              name="phone"
              placeholder="+1 (555) 000-0000"
              style={inputStyle}
            />
          </label>

          <label>
            <span>Message *</span>
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Leave us a message..."
              style={inputStyle}
            />
          </label>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--text, #eee)",
            }}
          >
            <input type="checkbox" name="agree" required />
            <span>
              You agree to our{" "}
              <a href="/privacy" style={{ color: "gray" }}>
                privacy policy
              </a>
              .
            </span>
          </label>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Button
            className="contact-submit"
            type="submit"
            disabled={loading}
            style={buttonStyle}
          >
            {loading ? "Sending…" : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  )
}
