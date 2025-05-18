import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const paymentMethods = ["UPI", "Bank Transfer", "Paytm", "Google Pay", "Other"];

const ProcessPayment = () => {
  const [tournaments, setTournaments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    tournament: "",
    team: "",
    amount: "",
    method: "",
    transactionId: "",
    note: ""
  });
  const navigate = useNavigate();

  // Load tournaments from localStorage (or mock data if not found)
  React.useEffect(() => {
    const stored = localStorage.getItem("tournaments");
    if (stored) {
      setTournaments(JSON.parse(stored));
    } else {
      setTournaments([
        { name: "BGMI May Cup", prizePool: 10000, teams: ["Team Alpha", "Team Bravo"] },
        { name: "BGMI Spring Bash", prizePool: 5000, teams: ["Team X", "Team Y"] }
      ]);
    }
  }, []);

  // Update teams and prize pool when tournament changes
  React.useEffect(() => {
    if (!form.tournament) return;
    const t = tournaments.find(t => t.name === form.tournament);
    setTeams(t && t.teams ? t.teams : []);
    setForm(f => ({ ...f, amount: t && t.prizePool ? t.prizePool : "" }));
  }, [form.tournament, tournaments]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1200));
      setSuccess("Prize payment processed successfully!");
      setTimeout(() => navigate("/admin"), 1800);
    } catch (err) {
      setError("Failed to process payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 430, margin: "40px auto", padding: 28, background: "#fff", borderRadius: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.10)" }}>
      <h2 style={{ marginBottom: 20, textAlign: "center" }}>Process New Payment</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ fontWeight: 500 }}>Tournament</label>
        <select
          name="tournament"
          value={form.tournament}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 16 }}
        >
          <option value="">Select Tournament</option>
          {tournaments.map((t) => (
            <option key={t.name} value={t.name}>{t.name}</option>
          ))}
        </select>

        <label style={{ fontWeight: 500 }}>Winning Team</label>
        <select
          name="team"
          value={form.team}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 16 }}
          disabled={!form.tournament}
        >
          <option value="">Select Team</option>
          {teams.map((team) => (
            <option key={team} value={team}>{team}</option>
          ))}
        </select>

        <label style={{ fontWeight: 500 }}>Prize Amount (₹)</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          min={1}
          required
          style={{ width: "100%", padding: 8, marginBottom: 16 }}
        />

        <label style={{ fontWeight: 500 }}>Payment Method</label>
        <select
          name="method"
          value={form.method}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 16 }}
        >
          <option value="">Select Method</option>
          {paymentMethods.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <label style={{ fontWeight: 500 }}>Transaction ID / Note</label>
        <input
          type="text"
          name="transactionId"
          value={form.transactionId}
          onChange={handleChange}
          style={{ width: "100%", padding: 8, marginBottom: 16 }}
          placeholder="Enter transaction ID or note (optional)"
        />

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: 10, background: "#1976d2", color: "#fff", border: "none", borderRadius: 5, fontWeight: 600, fontSize: 16, cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Processing..." : "Process Payment"}
        </button>
        {success && <div style={{ color: "green", marginTop: 16, textAlign: "center" }}>{success}</div>}
        {error && <div style={{ color: "red", marginTop: 16, textAlign: "center" }}>{error}</div>}
      </form>
    </div>
  );
};

export default ProcessPayment;
