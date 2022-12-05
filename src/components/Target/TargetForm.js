import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { loginSliceActions } from "../../store/loginSlice";

function TargetForm(props) {
  let activeUser = useSelector((state) => state.login.user);
  let dispatch = useDispatch();

  let name = useRef("");
  let description = useRef("");
  let category = useRef("");
  let team = useRef("");

  let handleSubmitClick = async () => {
    try {
      let user = window.localStorage.getItem("user");
      user = JSON.parse(user);

      let { data } = await axios.post(
        `${process.env.REACT_APP_API}/addTarget`,
        {
          name: name.current?.value,
          description: description.current?.value,
          category: category.current?.value,
          team: team.current?.value,
          admin: user?.email,
        }
      );

      if (data) {
        console.log(data);
        toast("Target Added !");

        dispatch(loginSliceActions.setUser(data));
      }
    } catch (e) {
      if (e.response && e.response.data) {
        toast(e.response.data);
      }
      console.log(e);
    }
  };

  let handleFormSubmit = (e) => {
    e.preventDefault();
    // if form gets validated it comes here otherwise not

    handleSubmitClick();
  };

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-white2">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Target
          </h1>
          <form onSubmit={handleFormSubmit} className="mt-6">
            <div className="mb-2">
              <span className="text-2xl font-semibold">Step 1 : </span>{" "}
              <label className="py-1">Program Name</label>
              <input
                ref={name}
                type="text"
                placeholder="The Big Bang Theory"
                id="name"
                className="flex p-5 h-12  w-full bg-white2 items-center rounded-lg"
                required
              />
            </div>
            <div className="mb-2">
              <span className="text-2xl font-semibold">Step 2 : </span>{" "}
              <label className="py-1">Description</label>
              <input
                ref={description}
                type="text"
                placeholder="hot project !!!"
                id="description"
                className="flex p-5 h-12  w-full bg-white2 items-center rounded-lg"
                minLength="6"
                maxLength="64"
                required
              />
            </div>
            <div className="mb-2">
              <label className="py-1">Category</label>
              <select
                ref={category}
                id="category"
                className=" flex p-5  w-full bg-white2 items-center rounded-lg"
                required
              >
                <option value="Others">Others</option>
                <option value="Website Testing">Website Testing</option>
                <option value="API Testing">API Testing</option>
                <option value="iOS">iOS</option>
                <option value="Android">Android</option>
                <option value="IoT">IoT</option>
                <option value="Hardware Testing">Hardware Testing</option>
                <option value="Cloud Solution">Cloud Solution</option>
              </select>
            </div>
            <div className="mb-2">
              <span className="text-2xl font-semibold">Step 3 : </span>
              <label className="py-1">Team</label>
              <input
                multiple
                ref={team}
                type="email"
                placeholder="peter@team1.com, carla@team1.com"
                id="emails"
                className="flex p-5 h-12  w-full bg-white2 items-center rounded-lg"
              />
            </div>
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                Add Target
              </button>
            </div>
          </form>
        </div>
      </div>

      {}
      {/* 
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleFormSubmit}>
          <div className="mt-8 ">
            <span className="text-2xl font-semibold">Step 1 : </span>
            <label className="py-1">Program Name</label>
            <input
              ref={name}
              type="text"
              placeholder="The Big Bang Theory"
              id="name"
              className="flex px-4 py-8 h-12  w-full bg-white2 items-center rounded-lg"
              required
            />
          </div>
          <div className="mt-4">
            <span className="text-2xl font-semibold">Step 2 : </span>{" "}
            <label className="py-1">Description</label>
            <input
              ref={description}
              type="text"
              placeholder="hot project !!!"
              id="description"
              className="flex px-4 py-8 h-12  w-full bg-white2 items-center rounded-lg"
              minLength="6"
              maxLength="64"
              required
            />
          </div>
          <div className="mt-4 flex-row ">
            <label className="py-1">Category</label>
            <select
              ref={category}
              id="category"
              className=" flex px-4 py-5  w-full bg-white2 items-center rounded-lg"
              required
            >
              <option value="Others">Others</option>
              <option value="Website Testing">Website Testing</option>
              <option value="API Testing">API Testing</option>
              <option value="iOS">iOS</option>
              <option value="Android">Android</option>
              <option value="IoT">IoT</option>
              <option value="Hardware Testing">Hardware Testing</option>
              <option value="Cloud Solution">Cloud Solution</option>
            </select>
          </div>

          <div className="mt-4">
            <span className="text-2xl font-semibold">Step 3 : </span>
            <label className="py-1">Team</label>
            <input
              multiple
              ref={team}
              type="email"
              placeholder="peter@team1.com, carla@team1.com"
              id="emails"
              className="flex px-4 py-8 h-12  w-full bg-white2 items-center rounded-lg"
            />
          </div>

          <div className="flex justify-center mt-8">
            <button
              className={`px-20 py-4 text-lg bg-green opacity-80 rounded-lg text-white font-semibold cursor-pointer hover:opacity-70`}
            >
              Add
            </button>
          </div>
        </form>
      </div> */}
    </>
  );
}

export default TargetForm;
