import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { assetsSliceActions } from "../../store/assetsSlice";

function Assets(props) {
  let currentTeam = useSelector((state) => state.currentTeam.currentTeam);

  let assets = useSelector((state) => state.assets.assets);

  let dispatch = useDispatch();

  useEffect(() => {
    let getAssets = async () => {
      console.log("currentTeam in assets : ", currentTeam);
      if (!currentTeam) return;
      try {
        let { data } = await axios.post(
          `${process.env.REACT_APP_API}/getAssets`,
          {
            teamId: currentTeam,
          }
        );

        if (data && data.assets) {
          dispatch(assetsSliceActions.setAssets(data.assets));
        }
      } catch (e) {
        if (e.response && e.response.data) {
          toast(e.response.data);
        }
        console.log(e);
      }
    };

    getAssets();
  }, [currentTeam, dispatch]);

  return (
    <div className="flex flex-col p-10 w-full ">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 pl-4">
                    <div className="flex items-center h-5">
                      <input
                        id="checkbox-all"
                        type="checkbox"
                        className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="checkbox" className="sr-only">
                        Checkbox
                      </label>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Asset Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Count
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    Delete
                  </th>
                </tr>
              </thead>

              {assets && assets.filter((item) => item.count !== 0) ? (
                assets
                  .filter((item) => item.count !== 0)
                  .map((assetObj, i) => (
                    <tbody className="divide-y divide-gray-200" key={i}>
                      <tr>
                        <td className="py-3 pl-4">
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="checkbox" className="sr-only">
                              Checkbox
                            </label>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {assetObj.asset?._id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {assetObj.asset?.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {assetObj.asset?.description}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {assetObj.asset?.price}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {assetObj?.count}
                        </td>

                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            className="text-red-500 hover:text-red-700"
                            href="#"
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  ))
              ) : (
                <></>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assets;
