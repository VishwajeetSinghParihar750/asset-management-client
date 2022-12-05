import React from "react";
import { Link } from "react-router-dom";

function BottomSection(props) {
  return (
    <div className="border-b">
      <div className="flex justify-between mx-8 my-3">
        <div className="flex">
          <Link to="/dashboard" className="mr-10">
            Dashboard
          </Link>

          <Link to="/team" className="mr-10">
            Team
          </Link>

          <Link to="/report" className="mr-10">
            Report
          </Link>

          <Link to="/target" className="mr-10">
            Target
          </Link>

          <Link to="/setting" className="">
            Setting
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BottomSection;
