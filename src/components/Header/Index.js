import React from "react";
import { Link } from "react-router-dom";

import TopSection from "./TopSection";
import BottomSection from "./BottomSection";

function Index(props) {
  return (
    <div className="">
      <TopSection />
      <BottomSection />
      {props.children}
    </div>
  );
}

export default Index;
