import React from "react";
import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function AssetForm(props) {
  let name = useRef("");
  let description = useRef("");
  let price = useRef(0);

  let currentTeam = useSelector((state) => state.currentTeam.currentTeam);
  console.log("currentTeam  assetform: ", currentTeam);

  let handleSubmitClick = async () => {
    try {
      let { data } = await axios.post(
        `${process.env.REACT_APP_API}/createAsset`,
        {
          name: name.current?.value,
          description: description.current?.value,
          price: price.current?.value,
          teamId: currentTeam,
        }
      );

      if (data) {
        console.log(data);
        toast("New Asset Created !");
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
              Name
            </label>
            <input
              ref={name}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-800"
            >
              Price ( in $)
            </label>
            <input
              ref={price}
              type="number"
              min={1}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-800"
            >
              Description
            </label>
            <input
              ref={description}
              type="text"
              min={1}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Create Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssetForm;
