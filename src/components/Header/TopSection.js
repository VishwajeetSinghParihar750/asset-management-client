import axios from "axios";
import { toast } from "react-toastify";
import React from "react";
import { useNavigate } from "react-router-dom";

import WrappedMessages from "./WrappedMessages";

import { useDispatch } from "react-redux";
import { loginSliceActions } from "../../store/loginSlice";

function TopSection(props) {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let handleLogout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API}/logout`, {
        withCredentials: true,
      });
      toast("Logout Success !");
      window.localStorage.removeItem("user");

      dispatch(loginSliceActions.setUser({}));

      navigate("/login");
    } catch (e) {
      console.log(e);
      if (e.response && e.response.data) toast(e.response.data);
    }
  };
  return (
    <div className=" bg-white2 p-1">
      <div className="flex justify-between mx-8 my-3 items-center">
        <div>Logo</div>
        <div className="flex items-center">
          <div className="w-2/5 mr-5">
            <WrappedMessages />
          </div>
          <div
            className="cursor-pointer py-1 px-3 bg-rose-300 rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopSection;
