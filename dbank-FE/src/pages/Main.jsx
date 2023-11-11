import React, { useEffect, useState } from "react";
import { getBalance } from "../utils/apis";
import Header from "../components/Header";
import Card from "../components/Card";

const Main = ({ user, handleLogoutClick }) => {
  const [balance, setBalance] = useState(0);
  const getBalanceFunc = async () => {
    const res = await getBalance(user.email);
    if (res.balance) {
      setBalance(res.balance);
    }
  };
  useEffect(() => {
    getBalanceFunc();
  }, []);
  return (
    <div>
      <Header handleLogoutClick={handleLogoutClick} />
      <br />
      <br />
      <Card user={user} getBalanceFunc={getBalanceFunc} balance={balance} />
    </div>
  );
};

export default Main;
