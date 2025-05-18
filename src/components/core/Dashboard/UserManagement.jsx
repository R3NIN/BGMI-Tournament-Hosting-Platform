import React, { useState, useEffect } from "react";
import { FaUserEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
// Home page background images
import backgroundImg1 from '../../../assets/Images/random bg img/coding bg1.jpeg';
import backgroundImg2 from '../../../assets/Images/random bg img/coding bg2.jpeg';
import backgroundImg3 from '../../../assets/Images/random bg img/coding bg3.jpeg';
import backgroundImg4 from '../../../assets/Images/random bg img/coding bg4.jpeg';
import backgroundImg5 from '../../../assets/Images/random bg img/coding bg5.jpeg';
import backgroundImg6 from '../../../assets/Images/random bg img/coding bg6.jpeg';
import backgroundImg7 from '../../../assets/Images/random bg img/coding bg7.jpeg';
import backgroundImg8 from '../../../assets/Images/random bg img/coding bg8.jpeg';
import backgroundImg9 from '../../../assets/Images/random bg img/coding bg9.jpeg';
import backgroundImg10 from '../../../assets/Images/random bg img/coding bg10.jpeg';
import backgroundImg11 from '../../../assets/Images/random bg img/coding bg11.jpeg';

const randomImages = [
  backgroundImg1,
  backgroundImg2,
  backgroundImg3,
  backgroundImg4,
  backgroundImg5,
  backgroundImg6,
  backgroundImg7,
  backgroundImg8,
  backgroundImg9,
  backgroundImg10,
  backgroundImg11,
];



const initialUsers = [
  { id: 1, name: "RONIN", email: "ronin@example.com", role: "Admin" },
  { id: 2, name: "RIYA", email: "riya@example.com", role: "User" },
  { id: 3, name: "CAPTAIN LiVi", email: "livi@example.com", role: "User" },
];

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "User" });
  const [showForm, setShowForm] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState(null);

  useEffect(() => {
    const bg = randomImages[Math.floor(Math.random() * randomImages.length)];
    setBackgroundImg(bg);
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setForm({ name: "", email: "", role: "User" });
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, role: user.role });
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...form } : u)));
    } else {
      setUsers([
        ...users,
        { ...form, id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1 },
      ]);
    }
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-2 text-white relative" style={{ background: 'transparent' }}>
      {/* Background image like Home page */}
      {backgroundImg && (
        <div className="w-full h-[450px] md:h-[650px] absolute top-0 left-0 opacity-[0.3] overflow-hidden object-cover mt-14 -z-10">
          <img src={backgroundImg} alt="Background" className="w-full h-full object-cover" />
          <div className="absolute left-0 bottom-0 w-full h-[250px] opacity_layer_bg"></div>
        </div>
      )}
      <div className="w-full max-w-3xl rounded-xl shadow-lg p-8 text-white" style={{ background: 'transparent' }}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-yellow-50">User Management</h2>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-lg font-semibold shadow transition"
          >
            <FaPlus /> Add User
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg border border-richblack-700 bg-richblack-900 text-white">
          <table className="min-w-full text-left">
            <thead className="bg-richblack-700 text-white">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-richblack-300">No users found.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-richblack-800 transition">
                    <td className="py-3 px-4 font-semibold">{user.id}</td>
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'Admin' ? 'bg-yellow-400 text-black' : 'bg-blue-500 text-white'}`}>{user.role}</span>
                    </td>
                    <td className="py-3 px-4 flex gap-3">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-2 rounded hover:bg-blue-600 bg-blue-500 text-white transition"
                        title="Edit"
                      >
                        <FaUserEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 rounded hover:bg-red-600 bg-red-500 text-white transition"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <form
              onSubmit={handleFormSubmit}
              className="bg-richblack-800 rounded-xl shadow-xl p-8 w-full max-w-md animate-fadeIn"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-yellow-50">{editingUser ? "Edit User" : "Add User"}</h3>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-richblack-200 hover:text-red-500 text-lg"
                  title="Close"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-richblack-100 mb-1">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 rounded bg-richblack-900 text-white border border-richblack-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-richblack-100 mb-1">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                  type="email"
                  className="w-full px-3 py-2 rounded bg-richblack-900 text-white border border-richblack-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-6">
                <label className="block text-richblack-100 mb-1">Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded bg-richblack-900 text-white border border-richblack-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded bg-richblack-700 text-richblack-100 hover:bg-richblack-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
                >
                  {editingUser ? "Update" : "Add"} User
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
