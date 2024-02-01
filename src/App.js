import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homescreen from "./pages/Homescreen";
import ShowDetails from "./pages/ShowDetails";
import Navigation from "./components/Navigation";
import AllShows from "./pages/AllShows";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homescreen />}></Route>
        <Route path="/allshows/:genreId" element={<AllShows />} />
        <Route path="/show/:id" element={<ShowDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
