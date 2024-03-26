import axios from "axios";
import { AuthServiceProps } from "../@types/auth-service.d";
import { BASE_URL } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuthServices(): AuthServiceProps {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const getUserDetails = async () => {
    const user_id = localStorage.getItem("user_id");

    try {
      const response = await axios.get(
        `${BASE_URL}/account/?userId=${user_id}`,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("username", response.data.username);
      setIsLoggedIn(true);
    } catch (err) {
      setIsLoggedIn(false);
      console.log(err);
      return err;
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/token/`,
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      );
      // console.log(response.data);
      const user_id = response.data.user_id;
      localStorage.setItem("IsLoggedIn", "true");
      localStorage.setItem("user_id", user_id);
      getUserDetails();
      navigate("/testLogin");
    } catch (err) {
      localStorage.setItem("IsLoggedIn", "false");
      console.log(err);
      return err;
    }
  };

  const refreshAccessToken = async () => {
    try {
      await axios.post(
        `${BASE_URL}/token/refresh/`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/account/logout/`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        if (localStorage.getItem("username")) {
          localStorage.removeItem("username");
          localStorage.removeItem("user_id");
        }
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
          document.cookie =
            name +
            "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" +
            window.location.hostname;
        }
        navigate("/login");
      }
    } catch (err) {
      return err;
    }
  };

  return { login, isLoggedIn, logout, refreshAccessToken };
}
