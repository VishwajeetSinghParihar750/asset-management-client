import React from "react";

import TopSection from "./TopSection";
import BottomSection from "./BottomSection";
import Header from "../Header/Index";

function Index(props) {
  return (
    <div>
      <Header>
        <TopSection />
        <BottomSection />
      </Header>
    </div>
  );
}

export default Index;
