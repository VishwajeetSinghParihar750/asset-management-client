import React, { useRef } from "react";
import WrappedAssetsForm from "./CreateAssetForm/WrappedAssetsForm";
import WrappedAddAssetsForm from "./AddAssetForm/WrappedAddAssetForm";

import { useSelector, useDispatch } from "react-redux";
import { currentTeamSliceActions } from "../../store/currentTeamSlice";

export default function Sidebar({ children }) {
  let dispatch = useDispatch();

  let user = useSelector((state) => state.login.user);
  let currentTeam = useSelector((state) => state.currentTeam.currentTeam);

  // set curretn team
  let handleTeamChange = (e) => {
    let curTeamId = e.currentTarget.value;

    console.log("team change hui : ", curTeamId);

    dispatch(currentTeamSliceActions.setTeam(curTeamId));
  };

  // console.log("cuurent Team  : ", currentTeam);

  return (
    <div className="flex">
      <div className="flex flex-col h-screen p-3 bg-white shadow w-60">
        <div className="space-y-3">
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <select
                  onChange={handleTeamChange}
                  className=" flex p-3 w-full bg-white2 items-center rounded-lg"
                  required
                  defaultValue={"DEFAULT"}
                >
                  <option disabled hidden value="DEFAULT">
                    Select Target
                  </option>
                  {user &&
                    user.teams &&
                    user.teams.map((team) => {
                      return (
                        <option value={team.teamId} key={team.teamId}>
                          {team.teamName}
                        </option>
                      );
                    })}
                </select>
              </li>
              {currentTeam && (
                <>
                  <WrappedAssetsForm />
                  <WrappedAddAssetsForm />
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
