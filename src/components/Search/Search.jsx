import { useState } from 'react';
import styles from './Search.module.css';

function Search() {
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

  return (
    <>
      <div className={styles.container}>
        <h1>Search For Recipes</h1>
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

        <button className={styles.searchbtn}>Search</button>
      </div>
    </>
  );
}

export default Search;
