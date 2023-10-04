import { Routes, Route } from "react-router-dom";

import Login from '../pages/login';
import Teste from '../pages/teste';

export const RouteList = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Login />
        }
      />
      <Route
        path="/teste"
        element={
          <Teste />
        }
      />
    </Routes>
  )
}