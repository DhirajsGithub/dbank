import React, { useEffect, useState } from "react";
import { getBalance } from "../utils/apis";
import Header from "../components/Header";
import Card from "../components/Card";

const Main = ({ user, handleLogoutClick }) => {
  return (
    <div>
      <Header handleLogoutClick={handleLogoutClick} />
      <br />
      <br />
      <Card user={user} />
    </div>
  );
};

export default Main;
