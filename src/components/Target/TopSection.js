import React from "react";

import TargetForm from "./TargetForm";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function TopSection(props) {
  return (
    <Popup
      trigger={
        <div
          className="p-3 m-2 border rounded-lg cursor-pointer w-1/3 mx-auto flex justify-center hover:bg-blueLight"
          id="addTargetButton"
        >
          Add Target
        </div>
      }
      modal
    >
      <TargetForm />
    </Popup>
  );
}

export default TopSection;
