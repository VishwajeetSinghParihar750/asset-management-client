import React from "react";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import { useSelector } from "react-redux";

import AddAssetForm from "./AddAssetForm";

function WrappedAddAssetsForm(props) {
  return (
    <>
      <Popup
        trigger={
          <li className="rounded-sm">
            <a href="#" className="flex items-center p-2 space-x-3 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <span>Add Asset</span>
            </a>
          </li>
        }
        modal
      >
        <AddAssetForm />
      </Popup>
    </>
  );
}

export default WrappedAddAssetsForm;
