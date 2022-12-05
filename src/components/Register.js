import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
  let navigate = useNavigate();

  let name = useRef("");
  let email = useRef("");
  let password = useRef("");

  let handleSubmitClick = async () => {
    try {
      let { data } = await axios.post(`${process.env.REACT_APP_API}/register`, {
        name: name.current?.value,
        email: email.current?.value,
        password: password.current?.value,
      });
      console.log(data);
      data && data.message && toast("Registered !");

      navigate("/login");
    } catch (e) {
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
    <div className="bg-white2">
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <Link to="/">
            <h3 className="text-4xl font-bold text-purple-400">Register</h3>
          </Link>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={handleFormSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  ref={name}
                  type="text"
                  name="name"
                  className="block h-12 border w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  ref={email}
                  type="email"
                  name="email"
                  className="block h-12 border w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  ref={password}
                  type="password"
                  name="password"
                  className="block h-12 border w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="flex items-center justify-end mt-4">
              <Link
                className="text-sm text-gray-600 underline hover:text-gray-900"
                to="/login"
              >
                Already registered?
              </Link>
              <button
                type="submit"
                className="inline-flex  items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest  uppercase transition duration-150 ease-in-out bg-purple-100 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
