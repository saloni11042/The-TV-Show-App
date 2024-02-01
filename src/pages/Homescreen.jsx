
import React from "react";
import Header from "../components/Header";
import Row from "../components/Row";

function Homescreen(){
  return (
    <div>
      <Header/>
      <div className='container-fluid'>
      <Row genreId={1} genreName="Drama" />
      <Row genreId={2} genreName="Crime" />
      <Row genreId={3} genreName="Horror" />
      <Row genreId={4} genreName="Comedy" />
      </div>
    </div>
  );
};

export default Homescreen;
