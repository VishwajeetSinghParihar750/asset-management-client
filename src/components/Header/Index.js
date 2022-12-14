import React from "react";

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
