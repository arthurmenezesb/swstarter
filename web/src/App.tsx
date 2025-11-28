import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/layouts/Layout";
import Home from "@/pages/Home";
import MovieDetails from "@/pages/MovieDetails";
import PersonDetails from "@/pages/PersonDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/person/:id" element={<PersonDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
