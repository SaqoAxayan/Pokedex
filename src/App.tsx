import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonIndividual from "./components/PokemonIndividual/PokemonIndividual.tsx";
import PokemonList from "./components/PokemonList/PokemonList.tsx";
import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<PokemonList />}></Route>
          <Route path="/pokemon/:name" element={<PokemonIndividual />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
