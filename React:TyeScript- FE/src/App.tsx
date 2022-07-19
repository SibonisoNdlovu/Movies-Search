import "./App.scss";
import {BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import React, { Suspense } from 'react';
import Spinner from "./components/spinner/spinner";
const ViewFilm = React.lazy(()=> import('./pages/filmPage/filmPage'));
const Home = React.lazy(()=> import('./pages/homePage/homePage'));


function App() {
  return (
    <Router>
      <body className="app">
      <header className="header">
        <section className="links"><Link to="/">All Films</Link></section>
      </header>
      <section className="container">
        <Routes>
          <Route path="/" element={             
          <Suspense fallback={<Spinner/>}>
              <Home/>
          </Suspense>} />
          <Route path="/films" element={<Home />} />
          <Route path="/film/:id" element={
            <Suspense fallback={<Spinner/>}>
              <ViewFilm/>
            </Suspense>
          }/>
        </Routes>
      </section>
      </body>
    </Router>
  );
}

export default App;
