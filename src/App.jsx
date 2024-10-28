import { useState } from 'react';
import './App.css';
import RecipeCarousel from './components/RecipeCarousel/RecipeCarousel';
import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Search from './components/Search/Search';

const recipes = [
  {
      name: "Spaghetti Carbonara",
      image: "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8=",
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
      image: "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8=",
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
      image: "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8=",
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
    image: "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8=",
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
    image: "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8=",
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
    image: "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8=",
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
    image: "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8=",
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
image: "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8=",
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
image: "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8=",
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
image: "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8=",
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
