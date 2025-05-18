import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Wallet from "../components/Common/Wallet";
import { FaEdit, FaTrash, FaUserShield, FaCheck, FaTimes } from "react-icons/fa";

const DEFAULT_COVER = "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"; // use the same cover for all


const Tournaments = () => {
  const [joined, setJoined] = useState([]);
  const [paymentMsg, setPaymentMsg] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [editingTournament, setEditingTournament] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    date: '',
    entryFee: '',
    prize: '',
    cover: ''
  });
  const [formError, setFormError] = useState('');
  const { token, isAdmin, user } = useSelector((state) => state.auth);

  // Remove a tournament by id
  const handleRemove = async (id) => {
    try {
      setDeletingId(id);
      // Here you would typically make an API call to delete the tournament
      // await deleteTournamentAPI(id);
      
      // For now, we'll just update the local state
      setTournaments(tournaments.filter((t, idx) => t.id !== id && idx !== id));
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting tournament:", error);
      alert("Failed to delete tournament. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (tournament) => {
    setEditingTournament(tournament);
    // Set the form values for editing
    setForm({
      name: tournament.name,
      description: tournament.description || tournament.desc || '',
      date: tournament.date || '',
      entryFee: tournament.entryFee || tournament.prizePool || '',
      prize: tournament.prize || tournament.prizePool || '',
      cover: tournament.cover || ''
    });
  };

  // Load tournaments from localStorage
  React.useEffect(() => {
    const stored = localStorage.getItem('tournaments');
    if (stored) {
      setTournaments(JSON.parse(stored));
    } else {
      // Fallback sample tournaments
      setTournaments([
        {
          id: 1,
          name: "BGMI Classic Cup",
          description: "Classic TPP tournament for all squads.",
          date: "2025-05-20",
          entryFee: 50,
          prize: 500,
          cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
        },
        {
          id: 2,
          name: "Pro Scrims",
          description: "Competitive scrims for experienced teams.",
          date: "2025-05-25",
          entryFee: 100,
          prize: 1000,
          cover: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
        },
        {
          id: 3,
          name: "Ultimate Solo Showdown",
          description: "Solo players battle for the crown in this high-stakes event.",
          date: "2025-06-01",
          entryFee: 75,
          prize: 800,
          cover: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
        }
      ]);
    }
  }, []);

  const handleJoin = (id, entryFee) => {
    setJoined([...joined, id]);
    setPaymentMsg(`Payment of ₹${entryFee} successful! You have joined the tournament.`);
    setTimeout(() => setPaymentMsg(""), 2500);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-richblack-900 text-richblack-25 py-8">
      <h1 className="text-4xl font-bold mb-4">Tournaments</h1>
      <Wallet />
      {/* Create New Tournament Button (Admin only) */}
      {isAdmin && (
        <>
          <button
            className="mb-4 px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg shadow-lg"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? 'Cancel' : 'Create New Tournament'}
          </button>
          {/* New Tournament Form */}
          {showForm && (
            <div className="w-full max-w-6xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <FaUserShield className="text-yellow-400 text-xl" />
                <h2 className="text-2xl font-bold text-yellow-300">
                  {editingTournament ? 'Edit Tournament' : 'Create New Tournament'}
                </h2>
                {editingTournament && (
                  <button
                    onClick={() => {
                      setEditingTournament(null);
                      setForm({
                        name: "",
                        description: "",
                        date: "",
                        entryFee: "",
                        prize: "",
                        cover: "",
                      });
                    }}
                    className="ml-auto text-sm text-richblack-300 hover:text-yellow-400"
                  >
                    Create New Instead
                  </button>
                )}
              </div>
              <form
                className="bg-richblack-800 p-6 rounded-xl shadow-lg mb-6 w-full max-w-lg flex flex-col gap-3 border-2 border-yellow-400"
                onSubmit={e => {
                  e.preventDefault();
                  // Simple validation
                  if (!form.name || !form.date || !form.entryFee || !form.prize) {
                    setFormError('Please fill in all required fields.');
                    return;
                  }
                  // Add new tournament
                  const newTournament = {
                    id: Date.now(),
                    name: form.name,
                    description: form.description,
                    date: form.date,
                    entryFee: Number(form.entryFee),
                    prize: Number(form.prize),
                    cover: form.cover || DEFAULT_COVER
                  };
                  const updated = [newTournament, ...tournaments];
                  setTournaments(updated);
                  localStorage.setItem('tournaments', JSON.stringify(updated));
                  setShowForm(false);
                  setForm({ name: '', description: '', date: '', entryFee: '', prize: '', cover: '' });
                  setFormError('');
                }}
              >
                <input
                  className="px-3 py-2 rounded bg-richblack-700 text-white"
                  placeholder="Tournament Name*"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
                <textarea
                  className="px-3 py-2 rounded bg-richblack-700 text-white"
                  placeholder="Description"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                />
                <input
                  className="px-3 py-2 rounded bg-richblack-700 text-white"
                  type="date"
                  value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  required
                />
                <input
                  className="px-3 py-2 rounded bg-richblack-700 text-white"
                  type="number"
                  placeholder="Entry Fee (₹)*"
                  value={form.entryFee}
                  onChange={e => setForm(f => ({ ...f, entryFee: e.target.value }))}
                  required
                />
                <input
                  className="px-3 py-2 rounded bg-richblack-700 text-white"
                  type="number"
                  placeholder="Prize (₹)*"
                  value={form.prize}
                  onChange={e => setForm(f => ({ ...f, prize: e.target.value }))}
                  required
                />
                <input
                  className="px-3 py-2 rounded bg-richblack-700 text-white"
                  placeholder="Cover Image URL (optional)"
                  value={form.cover}
                  onChange={e => setForm(f => ({ ...f, cover: e.target.value }))}
                />
                {formError && <div className="text-red-400 text-sm">{formError}</div>}
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-400 text-black font-bold py-2 rounded-lg mt-2"
                >
                  {editingTournament ? 'Save Changes' : 'Add Tournament'}
                </button>
              </form>
            </div>
          )}
        </>
      )}
      {/* Tournament List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mt-8">
        {tournaments.length === 0 && (
          <div className="col-span-full text-center text-lg text-gray-400">No tournaments available.</div>
        )}
        {tournaments.map((t, idx) => (
          <div key={t.id || idx} className="bg-richblack-800 rounded-xl shadow-lg overflow-hidden flex flex-col items-center hover:scale-105 transition-transform border-2 border-yellow-400">
            <img src={t.cover || DEFAULT_COVER} alt={t.name} className="w-full h-48 object-cover" />
            <div className="p-5 flex flex-col items-center w-full">
              <h2 className="text-2xl font-bold mb-2 text-yellow-300">{t.name}</h2>
              <div className="mb-1 text-richblack-100">{t.description || t.desc}</div>
              <div className="mb-1">Date: <span className="text-yellow-200">{t.date}</span></div>
              <div className="mb-1">Entry Fee: <span className="text-yellow-400 font-semibold">₹{t.entryFee || t.prizePool}</span></div>
              <div className="mb-3">Prize: <span className="text-green-400 font-semibold">₹{t.prize || t.prizePool}</span></div>
              <button
                className={`w-full py-2 rounded-lg font-bold ${joined.includes(t.id || idx) ? 'bg-green-400 text-black cursor-not-allowed' : 'bg-yellow-400 text-black hover:bg-yellow-300'} ${!token ? 'opacity-60 cursor-not-allowed' : ''}`}
                disabled={joined.includes(t.id || idx) || !token}
                onClick={() => handleJoin(t.id || idx, t.entryFee || t.prizePool)}
              >
                {joined.includes(t.id || idx) ? 'Joined' : `Join & Pay ₹${t.entryFee || t.prizePool}`}
              </button>
              {isAdmin && (
                <div className="w-full flex gap-2 mt-2">
                  <button
                    type="button"
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg font-bold bg-red-500 text-white hover:bg-red-400"
                    onClick={() => setShowDeleteConfirm(t.id || idx)}
                    disabled={deletingId === (t.id || idx)}
                  >
                    {deletingId === (t.id || idx) ? (
                      <span className="animate-spin">🔄</span>
                    ) : (
                      <>
                        <FaTrash className="text-sm" /> Delete
                      </>
                    )}
                  </button>
                </div>
              )}
              
              {/* Delete Confirmation Modal */}
              {showDeleteConfirm === (t.id || idx) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-richblack-800 p-6 rounded-lg max-w-md w-full mx-4">
                    <h3 className="text-xl font-bold text-yellow-300 mb-4">Confirm Deletion</h3>
                    <p className="text-richblack-100 mb-6">Are you sure you want to delete this tournament? This action cannot be undone.</p>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="px-4 py-2 rounded-lg bg-richblack-700 text-richblack-100 hover:bg-richblack-600"
                      >
                        <FaTimes className="inline mr-1" /> Cancel
                      </button>
                      <button
                        onClick={() => handleRemove(t.id || idx)}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 flex items-center"
                        disabled={deletingId === (t.id || idx)}
                      >
                        <FaCheck className="inline mr-1" /> 
                        {deletingId === (t.id || idx) ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {!token && (
                <div className="text-red-400 mt-1 text-center text-sm">Please log in to join.</div>
              )}
            </div>
          </div>
        ))}
      </div>
      {paymentMsg && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50">
          {paymentMsg}
        </div>
      )}
    </div>
  );
};

export default Tournaments;
