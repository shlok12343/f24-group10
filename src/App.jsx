import { useState } from 'react';
import './App.css';
import RecipeCarousel from './components/RecipeCarousel/RecipeCarousel';
import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Search from './components/Search/Search';

const recipes = [
  {
      name: "Spaghetti Carbonara",
      ingredients: ["Pasta", "Eggs", "Pancetta", "Parmesan Cheese"],
      directions: "Cook pasta. Mix eggs and cheese. Fry pancetta. Combine all and serve."
  },
  {
      name: "Chicken Curry",
      ingredients: ["Chicken", "Curry Paste", "Coconut Milk", "Rice"],
      directions: "Cook chicken. Add curry paste and coconut milk. Serve with rice."
  }
  // Add more recipes as needed
]

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <NavBar />
      <Search />
      <RecipeCarousel recipes={recipes} />

    </>
  );
}

export default App;
