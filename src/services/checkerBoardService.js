import axios from "axios";

let create = (payload) => {
  const config = {
    method: "POST",
    url: `http://localhost:5000/checker/add'`,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config);
};

let get = () => {
  const config = {
    method: "GET",
    url: "http://localhost:5000/checker/",
    crossdomain: true,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config);
};

let updateNumber = (id, payload) => {
  const config = {
    method: "POST",
    url: `http://localhost:5000/checker/update/${id}`,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config);
};

export { get, create, updateNumber };
