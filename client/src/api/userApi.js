import axios from "axios";

const USER_BASE_URL = "/api/v1/user";

async function getUser(token) {
  const { data, status } = await axios.get(USER_BASE_URL, {
    headers: { "auth-token": token },
  });
  return { data, status };
}
async function logout() {
  const { data, status } = await axios.get(`${USER_BASE_URL}/logout`);
  return { data, status };
}
async function login({ email, password }) {
  const { data, status } = await axios.post(`${USER_BASE_URL}/login`, {
    email,
    password,
  });
  return { data, status };
}
async function register({ name, email, password, cPassword }) {
  const { data, status } = await axios.post(`${USER_BASE_URL}/register`, {
    name,
    email,
    password,
    cPassword,
  });
  return { data, status };
}

export default Object.freeze({
  getUser,
  logout,
  login,
  register,
});
