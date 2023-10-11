import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { RouteList } from "./routes";

import { UserProvider } from './context/UserContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <RouteList/>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
