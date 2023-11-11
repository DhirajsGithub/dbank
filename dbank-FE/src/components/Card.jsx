import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { depositBalance, getBalance, withdrawBalance } from "../utils/apis";
import LoadingSpinner from "./LoadingSpinner";

const Card = ({ user }) => {
  const [deposit, setDeposit] = useState("");
  const [withdraw, setWithdraw] = useState("");
  const [loading, setLoading] = useState(false); //

  const [error, setError] = useState(null); //

  const [balance, setBalance] = useState(0);
  const getBalanceFunc = async () => {
    try {
      setLoading(true);
      const res = await getBalance(user.email);
      setLoading(false);
      if (res.balance) {
        setBalance(res.balance);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getBalanceFunc();
  }, []);
  const handleDepositClick = async () => {
    try {
      setLoading(true);
      const res = await depositBalance(user.email, deposit);
      setLoading(false);

      if (res.balance) {
        getBalanceFunc();
      }
      if (res.error) {
        setError(res.error);
      }
    } catch (error) {
      setLoading(false);
    }
    setDeposit("");
  };
  const handleWithdrawClick = async () => {
    try {
      setLoading(true);
      const res = await withdrawBalance(user.email, withdraw);
      setLoading(false);

      if (res.balance) {
        getBalanceFunc();
      }
      if (res.error) {
        setError(res.error);
      }
    } catch (error) {
      setLoading(false);
    }
    setWithdraw("");
  };
  return (
    <div className={style.card}>
      {loading && <LoadingSpinner />}
      <p>
        Welcome <b>{user.full_name}</b> !
      </p>
      <div style={{ textAlign: "center" }}>
        <h1>{balance}</h1>
        <p>Total Balance</p>
      </div>
      <br />
      <br />

      <br />

      {error && (
        <p style={{ textAlign: "center", color: "#cc0000", fontSize: "large" }}>
          {error}
        </p>
      )}
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          value={deposit}
          onChange={(e) => setDeposit(+e.target.value)}
          onFocus={() => setError(null)}
          className={style.input}
          type="number"
          placeholder="Deposit"
        />
        <button
          disabled={loading}
          onClick={handleDepositClick}
          className={style.btn}
        >
          Deposit
        </button>
      </div>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          value={withdraw}
          onFocus={() => setError(null)}
          onChange={(e) => setWithdraw(+e.target.value)}
          className={style.input}
          type="number"
          placeholder="Withdraw"
        />
        <button
          disabled={loading}
          onClick={handleWithdrawClick}
          className={style.btn}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default Card;
