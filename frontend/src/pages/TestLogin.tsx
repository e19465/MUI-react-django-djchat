// import axios from "axios";
import { useState } from "react";
import { useAuthServiceContext } from "../context/AuthContext";
import useAxiosWithInterceptor from "../helpers/jwt_interceptor";
import { BASE_URL } from "../api";
const TestLogin = () => {
  const { isLoggedIn, logout } = useAuthServiceContext();
  const [username, setUsername] = useState("");
  const jwtAxios = useAxiosWithInterceptor();

  const getUserDetails = async () => {
    try {
      const response = await jwtAxios.get(`${BASE_URL}/account/?userId=1`, {
        withCredentials: true,
      });
      console.log("res: ", response.data);
      const userDetails = response.data;
      setUsername(userDetails.username);
    } catch (err: unknown) {
      return err;
    }
  };

  return (
    <>
      <div>{isLoggedIn.toString()}</div>
      <div>
        <button type="button" onClick={logout}>
          Logout
        </button>
        <button type="button" onClick={getUserDetails}>
          Get User Details
        </button>
      </div>
      <div>Username: {username}</div>
    </>
  );
};

export default TestLogin;
