import React from "react";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import { useSelector } from "react-redux";

import MessagesDropdown from "./MessagesDropdown";

function WrappedMessages(props) {
  let user = useSelector((state) => state.login.user);

  let { messages } = user;
  let messagesCount = messages ? messages.length : 0;
  return (
    <>
      <Popup
        trigger={
          <span className=" cursor-pointer w-max">Noti : {messagesCount}</span>
        }
      >
        {messagesCount ? (
          <div className="fixed right-8 top-14 bg-white2 rounded-lg w-1/5 border">
            <MessagesDropdown />
          </div>
        ) : (
          "No Messages !"
        )}
      </Popup>
    </>
  );
}

export default WrappedMessages;
