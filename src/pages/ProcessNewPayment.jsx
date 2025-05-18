import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProcessNewPayment() {
  const [teams] = useState([
    { id: "1", name: "Team Alpha" },
    { id: "2", name: "Team Bravo" },
    { id: "3", name: "Team Charlie" },
  ]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handlePay = (e) => {
    e.preventDefault();
    const selected = teams.find(t => t.id === selectedTeam);
    setStatus(`Payment of ₹${amount} sent to ${selected?.name || "team"}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-richblack-800 p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Process New Payment</h2>
      <form onSubmit={handlePay}>
        <label className="block mb-2 text-sm">Select Winning Team:</label>
        <select
          className="w-full mb-4 p-2 rounded bg-richblack-700 text-white"
          value={selectedTeam}
          onChange={e => setSelectedTeam(e.target.value)}
          required
        >
          <option value="">-- Select Team --</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
        <label className="block mb-2 text-sm">Prize Amount (₹):</label>
        <input
          type="number"
          className="w-full mb-4 p-2 rounded bg-richblack-700 text-white"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          min="1"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 text-richblack-900 font-bold py-2 px-4 rounded hover:bg-yellow-300 transition-colors"
        >
          Pay Now
        </button>
      </form>
      {status && <div className="mt-4 text-green-400">{status}</div>}
      <button className="mt-6 text-xs text-yellow-400 hover:underline" onClick={() => navigate(-1)}>Back to Dashboard</button>
    </div>
  );
}
