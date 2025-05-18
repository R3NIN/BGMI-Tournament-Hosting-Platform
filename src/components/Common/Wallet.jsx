import React, { useState } from "react";
import { useSelector } from "react-redux";

const Wallet = () => {
  // Simulate wallet balance
  const [balance, setBalance] = useState(1500); // ₹1500
  const [withdrawMsg, setWithdrawMsg] = useState("");
  const { token } = useSelector((state) => state.auth);

  const handleWithdraw = () => {
    if (balance > 0) {
      setWithdrawMsg("Withdrawal request sent! Amount: ₹" + balance);
      setBalance(0);
    } else {
      setWithdrawMsg("No balance to withdraw.");
    }
  };

  return (
    <div className="bg-richblack-800 rounded-lg shadow-md p-6 mb-8 w-full max-w-md flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-2">Wallet</h2>
      <div className="text-lg mb-4">
        {token ? (
          <>Balance: <span className="text-yellow-300 font-semibold">₹{balance}</span></>
        ) : (
          <span className="text-red-400">Please log in to view your wallet balance.</span>
        )}
      </div>
      <button
        onClick={handleWithdraw}
        className={`bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition mb-2 ${!token ? 'opacity-60 cursor-not-allowed' : ''}`}
        disabled={!token}
      >
        Withdraw
      </button>
      {!token && (
        <div className="text-red-400 mt-1 text-center">Please log in to withdraw money.</div>
      )}
      {withdrawMsg && <div className="text-green-400 mt-2 text-center">{withdrawMsg}</div>}
    </div>
  );
};

export default Wallet;
