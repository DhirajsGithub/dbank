import { useEffect, useState } from "react";
import "./App.css";
import SigninSignup from "./pages/SigninSignup";
import Main from "./pages/Main";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);
  const handleUser = (user) => {
    setUser(user);
  };
  const handleLogoutClick = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return (
    <>
      {!user && <SigninSignup handleUser={handleUser} />}
      {user && <Main user={user} handleLogoutClick={handleLogoutClick} />}
    </>
  );
}

export default App;
