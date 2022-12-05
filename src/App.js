import Target from "./components/Target/Index";
import Setting from "./components/Setting";
import Dashboard from "./components/Dashboard/Index";
import Report from "./components/Report";
import Team from "./components/Team";
import Login from "./components/Login";
import Register from "./components/Register";

import Protected from "./util/Protected";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/team"
          element={
            <Protected>
              <Team />
            </Protected>
          }
        />
        <Route
          path="/report"
          element={
            <Protected>
              <Report />
            </Protected>
          }
        />

        <Route
          path="/target"
          element={
            <Protected>
              <Target />
            </Protected>
          }
        />
        <Route
          path="/setting"
          element={
            <Protected>
              <Setting />
            </Protected>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
