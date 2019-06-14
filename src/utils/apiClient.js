import axios from "axios";

const API_URL = "http://localhost:8080/api";

const getInfo = email => {
  return axios({
    method: "get",
    url: `${API_URL}/information?email=${email}`
  });
};

const requestLoan = (email, amount) => {
  return axios({
    method: "post",
    url: `${API_URL}/loan`,
    data: {
      email,
      amount: Number(amount)
    }
  });
};

const payLoan = (email, amount) => {
  return axios({
    method: "post",
    url: `${API_URL}/payments`,
    data: {
      email,
      amount: Number(amount)
    }
  });
};

export { getInfo, requestLoan, payLoan };
