import { useState,useEffect } from 'react';
import './App.css';
import RecipeCarousel from './components/RecipeCarousel/RecipeCarousel';
import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Search from './components/Search/Search';
import Contribute from './components/Contribute/Contribute';
import Footer from './components/Footer/Footer';
import { supabase, upload_ingredient,get_all_recipes,delete_ingredient,ingredients_to_IDs } from './superbase';




let recipes = [
  {
      name: "Spaghetti Carbonara",
      image: "https://www.marthastewart.com/thmb/S9xVtnWSHldvxPHKOxEq0bALG-k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSL-338686-spaghetti-carbonara-hero-3x2-69999-560b45d1dd9f4741b717176eff024839.jpeg",
      ingredients: [
          "400g spaghetti",
          "100g pancetta",
          "2 large eggs",
          "1/2 cup grated Parmesan cheese",
          "2 cloves garlic, minced",
          "Salt and pepper to taste"
      ],
      directions: "Cook pasta, mix with other ingredients."
  },
  {
      name: "Chicken Curry",
      image: "https://www.allrecipes.com/thmb/FL-xnyAllLyHcKdkjUZkotVlHR8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/46822-indian-chicken-curry-ii-DDMFS-4x3-39160aaa95674ee395b9d4609e3b0988.jpg",
      ingredients: [
          "1 lb chicken breast, cubed",
          "2 tbsp curry powder",
          "1 onion, chopped",
          "2 tomatoes, diced",
          "1 cup coconut milk",
          "Salt and pepper to taste"
      ],
      directions: "Sauté onions, add chicken and curry powder, cook until browned. Add tomatoes and coconut milk, simmer for 20 mins. Season and serve with rice."
  },
  {
      name: "Chocolate Chip Cookies",
      image: "https://www.eatyourselfskinny.com/wp-content/uploads/2023/11/chocolate-chip-cookies-44-1200x1703.jpg",
      ingredients: [
          "2 1/4 cups all-purpose flour",
          "1/2 tsp baking soda",
          "1 cup unsalted butter, room temperature",
          "1/2 cup granulated sugar",
          "1 cup packed brown sugar",
          "1 tsp salt",
          "2 tsp pure vanilla extract",
          "2 large eggs",
          "2 cups semisweet chocolate chips"
      ],
      directions: "Preheat oven to 350°F. Mix dry ingredients. In another bowl, cream butter and sugars, add eggs and vanilla. Combine all ingredients, fold in chocolate chips. Bake for 10-12 mins."
  },

  {
    name: "Beef Stroganoff",
    image: "https://www.allrecipes.com/thmb/mSWde3PHTu-fDkbvWBw0D1JlS8U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25202beef-stroganoff-iii-ddmfs-3x4-233-0f26fa477e9c446b970a32502468efc6.jpg",
    ingredients: [
        "2 lbs beef sirloin, thinly sliced",
        "4 tbsp butter",
        "1 large onion, finely chopped",
        "2 garlic cloves, minced",
        "1 lb mushrooms, sliced",
        "1 cup beef broth",
        "1 cup sour cream",
        "1 tbsp Dijon mustard",
        "Salt and pepper to taste",
        "Chopped parsley for garnish"
    ],
    directions: "Sauté beef until browned and set aside. In the same pan, cook onions and garlic, add mushrooms until soft. Return beef to the pan, add broth, simmer for 10 mins. Stir in sour cream and mustard, heat through without boiling. Season with salt and pepper, garnish with parsley."
},
{
    name: "Vegetable Stir Fry",
    image: "https://natashaskitchen.com/wp-content/uploads/2020/08/Vegetable-Stir-Fry-2.jpg",
    ingredients: [
        "2 tbsp vegetable oil",
        "1 bell pepper, julienned",
        "1 zucchini, sliced",
        "1 carrot, julienned",
        "1 cup broccoli florets",
        "2 tbsp soy sauce",
        "1 tbsp oyster sauce",
        "1 tsp sesame oil",
        "2 tsp cornstarch mixed with 2 tbsp water",
        "1 tsp chopped ginger",
        "2 cloves garlic, minced"
    ],
    directions: "Heat oil in a large skillet, add garlic and ginger, sauté for 30 seconds. Add all vegetables, cook until just tender. Mix in soy sauce, oyster sauce, and sesame oil. Thicken with cornstarch mixture, stir well until sauce is glossy. Serve hot."
},
{
    name: "Classic Margherita Pizza",
    image: "https://www.abeautifulplate.com/wp-content/uploads/2015/08/the-best-homemade-margherita-pizza-1-4.jpg",
    ingredients: [
        "Pizza dough (store-bought or homemade)",
        "1/2 cup tomato sauce",
        "2 cups shredded mozzarella cheese",
        "Fresh basil leaves",
        "2 tomatoes, sliced",
        "Extra virgin olive oil",
        "Salt and pepper to taste"
    ],
    directions: "Preheat your oven to 475°F (245°C). Roll out pizza dough on a baking sheet. Spread tomato sauce, sprinkle mozzarella cheese, and arrange tomato slices. Drizzle with olive oil, season with salt and pepper. Bake for 12-15 minutes or until crust is golden and cheese is bubbly. Garnish with fresh basil before serving."
},
{
    name: "Lemon Garlic Shrimp",
    image: "https://www.oliveandmango.com/images/uploads/2019_08_22_lemon_garlic_shrimp_pasta_2.jpg",
    ingredients: [
        "1 lb spaghetti",
        "2 tbsp olive oil",
        "1 lb shrimp, peeled and deveined",
        "4 cloves garlic, minced",
        "1 lemon, juiced and zested",
        "1/2 tsp red pepper flakes",
        "1/4 cup parsley, chopped",
        "Salt and black pepper to taste"
    ],
    directions: "Cook pasta according to package instructions. Meanwhile, heat olive oil in a pan, add garlic and red pepper flakes, sauté for a minute. Add shrimp and cook until pink. Stir in lemon juice and zest. Drain pasta and add to the shrimp mixture, toss to combine. Season with salt and pepper, garnish with parsley."
},

{
name: "Vegetable Stir Fry",
image: "https://www.lecremedelacrumb.com/wp-content/uploads/2022/01/vegetable-stir-fry-10sm-7.jpg",
ingredients: [
    "2 tbsp vegetable oil",
    "1 bell pepper, julienned",
    "1 zucchini, sliced",
    "1 carrot, julienned",
    "1 cup broccoli florets",
    "2 tbsp soy sauce",
    "1 tbsp oyster sauce",
    "1 tsp sesame oil",
    "2 tsp cornstarch mixed with 2 tbsp water",
    "1 tsp chopped ginger",
    "2 cloves garlic, minced"
],
directions: "Heat oil in a large skillet, add garlic and ginger, sauté for 30 seconds. Add all vegetables, cook until just tender. Mix in soy sauce, oyster sauce, and sesame oil. Thicken with cornstarch mixture, stir well until sauce is glossy. Serve hot."
},
{
name: "Classic Margherita Pizza",
image: "https://cdn.shopify.com/s/files/1/0274/9503/9079/files/20220211142754-margherita-9920_5a73220e-4a1a-4d33-b38f-26e98e3cd986.jpg?v=1723650067",
ingredients: [
    "Pizza dough (store-bought or homemade)",
    "1/2 cup tomato sauce",
    "2 cups shredded mozzarella cheese",
    "Fresh basil leaves",
    "2 tomatoes, sliced",
    "Extra virgin olive oil",
    "Salt and pepper to taste"
],
directions: "Preheat your oven to 475°F (245°C). Roll out pizza dough on a baking sheet. Spread tomato sauce, sprinkle mozzarella cheese, and arrange tomato slices. Drizzle with olive oil, season with salt and pepper. Bake for 12-15 minutes or until crust is golden and cheese is bubbly. Garnish with fresh basil before serving."
},
{
name: "Lemon Garlic Shrimp Pasta",
image: "https://hostthetoast.com/wp-content/uploads/2016/09/Creamy-Lemon-Butter-Shrimp-with-Caramelized-Garlic-20.jpg",
ingredients: [
    "1 lb spaghetti",
    "2 tbsp olive oil",
    "1 lb shrimp, peeled and deveined",
    "4 cloves garlic, minced",
    "1 lemon, juiced and zested",
    "1/2 tsp red pepper flakes",
    "1/4 cup parsley, chopped",
    "Salt and black pepper to taste"
],
directions: "Cook pasta according to package instructions. Meanwhile, heat olive oil in a pan, add garlic and red pepper flakes, sauté for a minute. Add shrimp and cook until pink. Stir in lemon juice and zest. Drain pasta and add to the shrimp mixture, toss to combine. Season with salt and pepper, garnish with parsley."
}
];



/*
print
(originalRecipes)/*



/*recipes = originalRecipes.map(recipe => ({
    name: recipe.recipeName,
    image: `"https://www.marthastewart.com/thmb/S9xVtnWSHldvxPHKOxEq0bALG-k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSL-338686-spaghetti-carbonara-hero-3x2-69999-560b45d1dd9f4741b717176eff024839.jpeg"`, // Assuming a base path for images
    ingredients: recipe.ingredients.ingredients,
    directions: recipe.instructions.instructions.join(" ")
  }));*/
    const promises = [];
  async function fetchRecipeDetails(recipe) {
    
    const ingredient = recipe.ingredients.ingredients
    const instructions = recipe.instructions.instructions.join(".\n")
    const recipeName = recipe.recipeName
    const image = recipe.Image_Name
    const this_recipe = []
    const no_duplicate_ingredient = [...new Set(ingredient)];

    return {
        name: recipeName,
        image: "https://www.marthastewart.com/thmb/S9xVtnWSHldvxPHKOxEq0bALG-k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSL-338686-spaghetti-carbonara-hero-3x2-69999-560b45d1dd9f4741b717176eff024839.jpeg",
        ingredients: no_duplicate_ingredient,
        directions: instructions
    };
}

async function processRecipes() {
    const originalRecipes = await get_all_recipes(['']);
    console.log(originalRecipes);
    const promises = originalRecipes.map(element => fetchRecipeDetails(element));
    const rec = await Promise.all(promises);
    return rec;
}


function App() {
    const [rec, setRec] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedRecipes = await processRecipes();
                setRec(fetchedRecipes);
            } catch (error) {
                console.error('Failed to fetch recipes:', error);
            }
        }
        fetchData();
    }, []);
    
    return (
      <>
        <NavBar/>
        <Search/>
        <RecipeCarousel recipes={rec}/>
        <Contribute/>
        <Footer/>
      </>
    );
  }

export default App;

