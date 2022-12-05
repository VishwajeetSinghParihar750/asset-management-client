import React, { useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { assetsSliceActions } from "../../../store/assetsSlice";

function AddAssetForm(props) {
  let asset = useRef("");
  let count = useRef(0);

  let currentTeam = useSelector((state) => state.currentTeam.currentTeam);
  let teamId = currentTeam;

  let assets = useSelector((state) => state.assets.assets);

  let dispatch = useDispatch();

  useEffect(() => {
    if (!currentTeam) return;
    // console.log("currentTeam use", currentTeam);
    let getData = async () => {
      try {
        let { data } = await axios.post(
          `${process.env.REACT_APP_API}/getAssets`,
          {
            teamId: teamId,
          }
        );

        data &&
          data.assets &&
          dispatch(assetsSliceActions.setAssets(data.assets));
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, [currentTeam]);

  let handleSubmitClick = async () => {
    try {
      let { data } = await axios.post(`${process.env.REACT_APP_API}/addAsset`, {
        assetId: asset.current?.value,
        count: count.current?.value,
        teamId: teamId,
      });

      if (data && data.assets) {
        console.log(data);
        dispatch(assetsSliceActions.setAssets(data.assets));

        toast("Assets Added !");
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
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-white2">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Asset
        </h1>
        <form onSubmit={handleFormSubmit} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Asset
            </label>
            <select
              ref={asset}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            >
              {assets.length > 0
                ? assets.map((assetObj, i) => (
                    <option value={assetObj.asset._id} key={i}>
                      {assetObj.asset.name}
                    </option>
                  ))
                : "No assets"}
            </select>
          </div>
          <div className="mb-2">
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-800"
            >
              Count
            </label>
            <input
              ref={count}
              type="number"
              min={1}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Add Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAssetForm;
