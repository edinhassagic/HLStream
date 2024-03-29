import axios from "axios";

export const login = async ({ username, password }) => {
  try {
    const response = await axios.get("http://localhost:4000/login", {
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        "Content-Type": "application/json",
      },
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", response.data.user.name);

    return response.data.user;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const getContent = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:4000/channels", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.channels;
  } catch (error) {
    console.error("Error during getting data:", error);
  }
};

export const getContentById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:4000/channels/${id}`, {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
  }
};
