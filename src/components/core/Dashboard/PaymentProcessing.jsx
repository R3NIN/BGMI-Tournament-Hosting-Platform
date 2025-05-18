import React, { useState, useEffect } from "react";
import { FaRegEye, FaUndo } from "react-icons/fa";
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

const initialPayments = [
  { id: 1, user: "RONIN", email: "ronin@example.com", amount: 500, status: "Success", date: "2025-05-14" },
  { id: 2, user: "RIYA", email: "riya@example.com", amount: 1000, status: "Pending", date: "2025-05-13" },
  { id: 3, user: "CAPTAIN LiVi", email: "livi@example.com", amount: 750, status: "Failed", date: "2025-05-12" },
];

const statusColors = {
  Success: "bg-green-600",
  Pending: "bg-yellow-500",
  Failed: "bg-red-600",
};

export default function PaymentProcessing() {
  const [payments] = useState(initialPayments);
  const [backgroundImg, setBackgroundImg] = useState(null);

  useEffect(() => {
    const bg = randomImages[Math.floor(Math.random() * randomImages.length)];
    setBackgroundImg(bg);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-2 text-white relative" style={{ background: 'transparent' }}>
      {/* Background image like Home page */}
      {backgroundImg && (
        <div className="w-full h-[450px] md:h-[650px] absolute top-0 left-0 opacity-[0.3] overflow-hidden object-cover mt-14 -z-10">
          <img src={backgroundImg} alt="Background" className="w-full h-full object-cover" />
          <div className="absolute left-0 bottom-0 w-full h-[250px] opacity_layer_bg"></div>
        </div>
      )}
      <div className="w-full max-w-4xl rounded-xl shadow-lg p-8 text-white" style={{ background: 'transparent' }}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-yellow-50">Payment Processing</h2>
        </div>
        <div className="overflow-x-auto rounded-lg border border-richblack-700 bg-richblack-900 text-white">
          <table className="min-w-full text-left">
            <thead className="bg-richblack-700 text-white">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-richblack-300">No payments found.</td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-richblack-800 transition">
                    <td className="py-3 px-4 font-semibold">{payment.id}</td>
                    <td className="py-3 px-4">{payment.user}</td>
                    <td className="py-3 px-4">{payment.email}</td>
                    <td className="py-3 px-4">₹{payment.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${statusColors[payment.status]}`}>{payment.status}</span>
                    </td>
                    <td className="py-3 px-4">{payment.date}</td>
                    <td className="py-3 px-4 flex gap-2">
                      <button
                        className="p-2 rounded hover:bg-blue-600 bg-blue-500 text-white transition"
                        title="View Details"
                      >
                        <FaRegEye />
                      </button>
                      {payment.status === "Success" && (
                        <button
                          className="p-2 rounded hover:bg-yellow-600 bg-yellow-500 text-black transition"
                          title="Refund"
                        >
                          <FaUndo />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
