import { useState, useEffect } from 'react';
import './App.css';
import RecipeCarousel from './components/RecipeCarousel/RecipeCarousel';
import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Search from './components/Search/Search';
import Contribute from './components/Contribute/Contribute';
import Footer from './components/Footer/Footer';
import { get_all_recipes, get_all_ingredients } from './superbase';

const promises = [];
async function fetchRecipeDetails(recipe) {
  const ingredient = recipe.ingredients.ingredients;
  const instructions = recipe.instructions.instructions.join('.\n');
  const recipeName = recipe.recipeName;
  const image = recipe.Image_Name;
  const this_recipe = [];
  const no_duplicate_ingredient = [...new Set(ingredient)];

  return {
    name: recipeName,
    image: '../public/recipeImages/Recipes/' + image + '.jpg',
    ingredients: no_duplicate_ingredient,
    directions: instructions,
  };
}

async function processRecipes() {
  const originalRecipes = await get_all_recipes(['']);
  const promises = originalRecipes.map((element) =>
    fetchRecipeDetails(element)
  );
  const rec = await Promise.all(promises);
  return rec;
}

function App() {
  const [rec, setRec] = useState([]);
  const [allSuggestions, setAllSuggestions] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedRecipes = await processRecipes();
        setRec(fetchedRecipes);
      } catch (error) {}
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function getIngredient() {
      try {
        const ingredient = await get_all_ingredients();
        setAllSuggestions(ingredient);
      } catch (error) {}
    }
    getIngredient();
  }, []);

  return (
    <>
      <NavBar />
      <Search setRec={setRec} />
      <RecipeCarousel recipes={rec} />
      <Contribute allSuggestions={allSuggestions} />
      <Footer />
    </>
  );
}

export default App;
