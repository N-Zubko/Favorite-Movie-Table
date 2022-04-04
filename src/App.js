
import React from "react"
import MovieTable from './components/movieTable';
import './App.css';

function App(){
    return (
    <div className="main">
      <h1>Favorite Movie List</h1>
      <MovieTable />
    </div>
  );
};

export default App;
