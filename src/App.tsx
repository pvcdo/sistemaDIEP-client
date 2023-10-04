import React from 'react';
import { BrowserRouter, useLocation } from "react-router-dom";

import { RouteList } from "./routes";

function App() {
  return (
    <BrowserRouter>
        <RouteList/>
    </BrowserRouter>
  );
}

export default App;
