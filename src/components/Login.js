import React from "react";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSliceActions } from "../store/loginSlice";

export default function Login() {
  console.log("process.env.REACT_APP_API :", process.env.REACT_APP_API);
  let navigate = useNavigate();

  let dispatch = useDispatch();

  // user state

  let email = useRef("");
  let password = useRef("");

  useEffect(() => {
    try {
      const jsonData = window.localStorage.getItem("user");

      const userInfo = JSON.parse(jsonData);
      if (userInfo && userInfo.email) {
        email.current.value = userInfo.email;
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  let handleSubmitClick = async () => {
    try {
      let { data } = await axios.post(
        `${process.env.REACT_APP_API}/login`,
        {
          email: email.current?.value,
          password: password.current?.value,
        },
        { withCredentials: true }
      );

      console.log(data);
      if (data) toast("Login Success!");

      document.cookie = `email=${data.email}`;

      window.localStorage.setItem("user", JSON.stringify(data));

      dispatch(loginSliceActions.setUser(data));

      navigate("/target");
    } catch (e) {
      console.log(e);
      e.response &&
        e.response.data &&
        e.response.data.message &&
        toast(e.response.data.message);
    }
  };

  let handleFormSubmit = (e) => {
    e.preventDefault();
    // if form gets validated it comes here otherwise not

    handleSubmitClick();
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-white2">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Sign in
        </h1>
        <form onSubmit={handleFormSubmit} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              ref={email}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              ref={password}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
