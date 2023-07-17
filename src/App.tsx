import React from "react";
import "./App.css";
import MapCapture from "./Components/MapCapture";
import CubeWithTexture from "./Components/CubewithTexture";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CONSTANTS from "./Utils/Contants";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path={CONSTANTS.APP_ROOT} element={<MapCapture />} />
            <Route
              path={CONSTANTS.RENDER_3D_IMAGE}
              element={<CubeWithTexture />}
            />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
