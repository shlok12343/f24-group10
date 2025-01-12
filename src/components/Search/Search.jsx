import { useState } from 'react';
import styles from './Search.module.css';
import { get_all_recipes } from '../../superbase';

function Search({ setRec }) {
  const [ingredient, setIngredient] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);

  const handleAdd = () => {
    if (ingredient.trim()) {
      setIngredientsList([...ingredientsList, ingredient]);
      setIngredient('');
    }
  };

  const handleDelete = (index) => {
    setIngredientsList(ingredientsList.filter((_, i) => i !== index));
  };

  const handleSearch = async () => {
    if (!ingredientsList.length) {
      alert('Please add at least one ingredient.');
      return;
    }

    const rec = await processRecipes(ingredientsList);

    if (!rec.length) {
      alert('No recipes found for inputted ingredients');
      return;
    }
    setIngredientsList([]);
    setRec(rec);
  };

  async function fetchRecipeDetails(recipe) {
    const ingredient = recipe.ingredients.ingredients;
    const instructions = recipe.instructions.instructions.join('.\n');
    const recipeName = recipe.recipeName;
    const image = recipe.Image_Name;
    const this_recipe = [];
    const no_duplicate_ingredient = [...new Set(ingredient)];

    return {
      name: recipeName,
      image: '../../../public/recipeImages/Recipes/' + image + '.jpg',
      ingredients: no_duplicate_ingredient,
      directions: instructions,
    };
  }

  async function processRecipes(onHandIngredients) {
    const recomendedRecipes = await get_all_recipes(onHandIngredients);
    const promises = recomendedRecipes.map((element) =>
      fetchRecipeDetails(element)
    );
    const rec = await Promise.all(promises);
    return rec;
  }

  return (
    <>
      <div className={styles.container}>
        <h1 id="search">Search For Recipes</h1>
        <p>Add available ingredients to your wishlist.</p>

        <div className={styles.addItems}>
          <input
            type="text"
            name="ingredients"
            id="ingredients"
            placeholder="Type ingredient here"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            required
          />
          <button onClick={handleAdd}>Add</button>
        </div>

        <div className={styles.ingredientList}>
          <h3>Wishlist:</h3>
          <div className={styles.ingredientItemsContainer}>
            {ingredientsList.map((item, index) => (
              <div key={index} className={styles.ingredientItem}>
                {item}
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleSearch} className={styles.searchbtn}>
          Search
        </button>
      </div>
    </>
  );
}

export default Search;
