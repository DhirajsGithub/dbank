import baseUrl from "./baseurl";
const signinApi = async (email, password) => {
  const url = `${baseUrl}signin/`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ email, password }),
  });
  return await response.json();
};

const signupApi = async (full_name, age, email, password) => {
  const url = `${baseUrl}signup/`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ full_name, age, email, password }),
  });
  return await response.json();
};

const getBalance = async (email) => {
  const url = `${baseUrl}balance/${email}/`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

const depositBalance = async (email, amount) => {
  const url = `${baseUrl}deposit/`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ email, amount }),
  });
  return await response.json();
};

const withdrawBalance = async (email, amount) => {
  const url = `${baseUrl}withdraw/`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ email, amount }),
  });
  return await response.json();
};

export { signinApi, signupApi, getBalance, depositBalance, withdrawBalance };
