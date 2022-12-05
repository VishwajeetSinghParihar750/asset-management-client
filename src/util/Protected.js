import axios from "axios";
import React, { useEffect, useState } from "react";

function Protected({ children }) {
  // console.log("protected");
  let [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    let toRun = async () => {
      try {
        let { data } = await axios.get(
          `${process.env.REACT_APP_API}/verifyLogin`,

          { withCredentials: true }
        );

        if (data) setLoggedIn(() => true);
      } catch (e) {
        console.log(e);
        setLoggedIn(() => false);
      }
    };
    toRun();
  }, []);

  return <>{loggedIn && children}</>;
}

export default Protected;
