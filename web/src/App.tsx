import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/layouts/Layout";
import Home from "@/pages/Home";
import MovieDetails from "@/pages/MovieDetails";
import PersonDetails from "@/pages/PersonDetails";
import { LoadingProvider, useLoading } from "@/context/LoadingContext";
import LoadingOverlay from "@/components/LoadingOverlay";

const AppContent: React.FC = () => {
  const { isLoading } = useLoading();

  return (
    <Router>
      <Layout>
        {isLoading && <LoadingOverlay />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/person/:id" element={<PersonDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
};

export default App;
