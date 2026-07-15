import React, { useState } from "react";
import { useDatabase } from "../db";
import { translations } from "../i18n";

export default function AuthPage({ language, onBackToGuest }) {
  const { login } = useDatabase();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const t = translations[language] || translations.en;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setLoading(true);

    // Simulate network delay slightly for realistic feel
    setTimeout(() => {
      const res = login(username, password);
      setLoading(false);
      if (res.error) {
        setError(res.error);
      }
    }, 600);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-logo">
            <span className="brand">Digital</span>
            <span className="brand-accent">Menu</span>
          </div>
          <h2>{t.role_auth}</h2>
          <p className="auth-subtitle">Access your restaurant panel</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">{t.username}</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin, kitchen, waiter"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t.password}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? <span className="spinner" /> : t.sign_in}
          </button>
        </form>

        <div className="auth-footer">
          <button type="button" className="back-guest-btn" onClick={onBackToGuest}>
            ← {t.customer_view}
          </button>
        </div>

        <div className="demo-credentials">
          <h4>Demo Accounts:</h4>
          <ul>
            <li><strong>Admin:</strong> admin / admin123</li>
            <li><strong>Kitchen:</strong> kitchen / kitchen123</li>
            <li><strong>Waiter:</strong> waiter / waiter123</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
