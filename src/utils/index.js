import axios from "axios";

const GET = url => {
  return axios.get(url);
};

const POST = (url, email, amount) => {
  return axios({
    method: "post",
    url,
    data: {
      email,
      amount: Number(amount)
    }
  });
};

export { GET, POST };
