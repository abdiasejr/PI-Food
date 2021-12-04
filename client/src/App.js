import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Home } from './pages/Home';
import { Nav } from './components/Nav'; 
import { RecipeDetail } from './pages/RecipeDetail';
import { CreateForm } from './pages/CreateForm';

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='recipes' element={<Nav />} >
          <Route index element={<Home />} />
          <Route path="create" element={<CreateForm />} />
          <Route path=":recipeId" element={<RecipeDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
