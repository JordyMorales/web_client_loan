import axios from "axios";

const API_URL = "http://localhost:8080/api";

const getInfo = email => {
  return axios.get(`${API_URL}/information?email=${email}`);
};

const requestLoan = (email, amount) => {
  return axios.post(`${API_URL}/loan`, {
    email,
    amount: Number(amount)
  });
};

const payLoan = (email, amount) => {
  return axios.post(`${API_URL}/payments`, {
    email,
    amount: Number(amount)
  });
};

export { getInfo, requestLoan, payLoan };
