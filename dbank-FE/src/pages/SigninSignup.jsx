import React, { useState } from "react";
import styles from "./SigninSignup.module.css";
import { signinApi, signupApi } from "../utils/apis";
import LoadingSpinner from "../components/LoadingSpinner";

const SigninSignup = ({ handleUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [signUpError, setSignUpError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false); //

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signinApi(loginEmail, loginPassword);
    setLoading(false);
    if (res.status === "success") {
      handleUser(res.user);
      localStorage.setItem("user", JSON.stringify(res.user));
    } else if (res.error) {
      setLoginError(res.error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signupApi(fullName, age, signupEmail, signupPassword);
    setLoading(false);
    if (res.status === "success") {
      setSignUpError(null);
      setIsLogin(!isLogin);
    } else if (res.error) {
      setSignUpError(res.error);
    }
  };

  return (
    <div className={styles.container}>
      {loading && <LoadingSpinner />}
      <div style={{ textAlign: "center" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          width="70"
          height="70"
          viewBox="0 0 256 256"
          xmlSpace="preserve"
        >
          <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
            <path
              d="M 84.668 38.004 v -6.27 H 90 V 20 L 45 3.034 L 0 20 v 11.734 h 5.332 v 6.27 h 4.818 v 30.892 H 5.332 v 6.271 H 0 v 11.8 h 90 v -11.8 h -5.332 v -6.271 H 79.85 V 38.004 H 84.668 z M 81.668 35.004 H 66.332 v -3.27 h 15.336 V 35.004 z M 63.332 68.896 v 6.271 h -7.664 v -6.271 H 50.85 V 38.004 h 4.818 v -6.27 h 7.664 v 6.27 h 4.818 v 30.892 H 63.332 z M 26.668 38.004 v -6.27 h 7.664 v 6.27 h 4.818 v 30.892 h -4.818 v 6.271 h -7.664 v -6.271 H 21.85 V 38.004 H 26.668 z M 42.15 68.896 V 38.004 h 5.7 v 30.892 H 42.15 z M 37.332 35.004 v -3.27 h 15.336 v 3.27 H 37.332 z M 37.332 71.896 h 15.336 v 3.271 H 37.332 V 71.896 z M 3 22.075 L 45 6.24 l 42 15.835 v 6.659 H 3 V 22.075 z M 8.332 31.734 h 15.336 v 3.27 H 8.332 V 31.734 z M 13.15 38.004 h 5.7 v 30.892 h -5.7 V 38.004 z M 8.332 71.896 h 15.336 v 3.271 H 8.332 V 71.896 z M 87 83.966 H 3 v -5.8 h 84 V 83.966 z M 81.668 75.166 H 66.332 v -3.271 h 15.336 V 75.166 z M 76.85 68.896 H 71.15 V 38.004 h 5.699 V 68.896 z"
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeMiterlimit: 10,
                fill: "#009579",
                fillRule: "nonzero",
                opacity: 1,
              }}
              transform="matrix(1 0 0 1 0 0)"
              strokeLinecap="round"
            />
          </g>
        </svg>
        <h1 className={styles.dbank}>DBank</h1>
      </div>

      {isLogin && (
        <div className={`${styles.login} ${styles.form}`}>
          <header>Login</header>
          <form onSubmit={handleLoginSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={loginEmail}
              onChange={(e) => {
                setLoginError(null);
                setLoginEmail(e.target.value);
              }}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={loginPassword}
              onChange={(e) => {
                setLoginError(null);
                setLoginPassword(e.target.value);
              }}
              required
            />
            {loginError && (
              <p style={{ textAlign: "center", color: "#cc0000" }}>
                {loginError}
              </p>
            )}
            <input type="submit" className={styles.button} value="Login" />
          </form>

          <div className={styles.signup}>
            <span className={styles.signup}>
              Don't have an account?{" "}
              <label htmlFor="check" onClick={toggleForm}>
                Signup
              </label>
            </span>
          </div>
        </div>
      )}

      {!isLogin && (
        <div className={`${styles.registration} ${styles.form}`}>
          <header>Signup</header>
          <form onSubmit={handleSignupSubmit}>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={signupEmail}
              onChange={(e) => {
                setSignUpError(null);
                setSignupEmail(e.target.value);
              }}
              required
            />
            <input
              type="password"
              placeholder="Create a password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
            />
            <input
              min={18}
              max={100}
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            {signUpError && (
              <p style={{ textAlign: "center", color: "#cc0000" }}>
                {signUpError}
              </p>
            )}
            <input type="submit" className={styles.button} value="Signup" />
          </form>

          <div className={styles.signup}>
            <span className={styles.signup}>
              Already have an account?{" "}
              <label htmlFor="check" onClick={toggleForm}>
                Login
              </label>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SigninSignup;
