import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
// If you add a real endpoint, import it here
// import { paymentEndpoints } from "../services/apis";

const PaymentHistory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [payments, setPayments] = useState([]);
  const token = useSelector((state) => state.auth.token?.token || state.auth.token);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with real endpoint if available
        // const response = await apiConnector("GET", paymentEndpoints.PAYMENT_HISTORY_API, null, { Authorization: `Bearer ${token}` });
        // setPayments(response.data.data);

        // Mock data for now
        setPayments([
          { id: 1, team: "Team Alpha", amount: 500, date: "2025-05-10T18:30:00Z", status: "Success" },
          { id: 2, team: "Team Beta", amount: 300, date: "2025-05-11T14:15:00Z", status: "Failed" },
          { id: 3, team: "Team Gamma", amount: 800, date: "2025-05-12T12:00:00Z", status: "Success" },
        ]);
      } catch (err) {
        setError("Could not fetch payment history.");
        toast.error("Could not fetch payment history.");
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentHistory();
  }, [token]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && payments.length === 0 && <div>No payment history found.</div>}
      {!loading && !error && payments.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Team</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, idx) => (
                <tr key={p.id} className="text-center">
                  <td className="py-2 px-4 border-b">{idx + 1}</td>
                  <td className="py-2 px-4 border-b">{p.team}</td>
                  <td className="py-2 px-4 border-b">₹{p.amount}</td>
                  <td className="py-2 px-4 border-b">{new Date(p.date).toLocaleString()}</td>
                  <td className={`py-2 px-4 border-b ${p.status === "Success" ? "text-green-600" : "text-red-600"}`}>{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
