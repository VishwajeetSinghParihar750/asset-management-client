import React from "react";
import Header from "../Header/Index";
import Assets from "./Assets";
import Sidebar from "./Sidebar";

function Index(props) {
  return (
    <Header>
      <Sidebar>
        <Assets />
      </Sidebar>
    </Header>
  );
}

export default Index;
