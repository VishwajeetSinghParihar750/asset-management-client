import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loginSliceActions } from "../../store/loginSlice";

function MessagesDropdown(props) {
  let dispatch = useDispatch();
  let user = useSelector((state) => state.login.user);

  let { messages } = user;

  let handleAcceptClick = async (message) => {
    try {
      let { data } = await axios.post(
        `${process.env.REACT_APP_API}/handleInvitation`,
        {
          teamId: message.teamId,
          userEmail: user.email,
        },
        { withCredentials: true }
      );
      if (data) {
        toast("Added to Team!");
        dispatch(loginSliceActions.setUser(data.user));
        window.localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (e) {
      console.log(e);

      e.response && e.response.data && toast(e.response.data.message);
    }
  };

  let handleRejectClick = async (message) => {
    console.log("message : ", message);

    try {
      let { data } = await axios.post(
        `${process.env.REACT_APP_API}/handleInvitation`,
        {
          teamId: message.teamId,
          notAccepted: true,
          userEmail: user.email,
        },
        { withCredentials: true }
      );
      if (data) {
        toast("Request Cancelled!");
        dispatch(loginSliceActions.setUser(data.user));
        window.localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (e) {
      console.log(e);

      e.response && e.response.data && toast(e.response.data.message);
    }
  };

  return (
    <div
      // className="absolute right-8 top-14 bg-white2 rounded-lg w-1/5"
      className="border-red border"
    >
      {messages &&
        messages.map((message, i) => (
          <div
            key={i}
            className="p-4 rounded-lg flex items-center justify-between border-b"
          >
            <div className="w-2/3">
              <div className="text-lg font-light"> Team Invite</div>
              <div>
                From : <span className="font-bold">{message.adminName}</span>
              </div>
              <div>
                Team : <span className="font-bold">{message.teamName}</span>
              </div>
            </div>
            <div className="flex flex-col w-1/3">
              <div
                className="px-3 py-2 rounded-lg mx-2 mt-2 bg-lime-300 cursor-pointer"
                onClick={() => handleAcceptClick(message)}
              >
                Accept
              </div>
              <div
                className="px-3 py-2 rounded-lg mx-2 mt-2 bg-rose-300 cursor-pointer"
                onClick={() => handleRejectClick(message)}
              >
                Reject
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default MessagesDropdown;
