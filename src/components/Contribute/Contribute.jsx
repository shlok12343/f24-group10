import { useState, useEffect, useRef } from 'react';
import styles from './Contribute.module.css';
import {
  upload_ingredient,
  upload_recipe,
  get_all_ingredients,
} from '../../superbase';

function Contribute({ allSuggestions }) {
  const [activeComponent, setActiveComponent] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [suggestions, setSuggestions] = useState(allSuggestions);

  const inputRef = useRef(null);

  const handleAdd = (selectedIngredient) => {
    if (selectedIngredient && !ingredientsList.includes(selectedIngredient)) {
      setIngredientsList([...ingredientsList, selectedIngredient]);
      setIngredient('');
      setFilteredSuggestions([]);
    }
  };

  useEffect(() => {
    if (allSuggestions && allSuggestions.length > 0) {
      console.log('Updating suggestions:', allSuggestions);
      setSuggestions(allSuggestions);
    }
  }, [allSuggestions]);

  const handleDelete = (index) => {
    setIngredientsList(ingredientsList.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setIngredient(input);

    if (input) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleIngredientSubmit = async () => {
    if (ingredient.trim() === '') {
      alert('Please enter an ingredient');
      return;
    }
    const ingredientToStore = ingredient;

    try {
      const uploadResult = await upload_ingredient(ingredientToStore);
      if (uploadResult === 'Error') {
        alert('Ingredient is already in the database');
        return;
      }
      setIngredient('');
      const newIngredientList = await get_all_ingredients(); // Ensure this returns an array of strings
      setSuggestions(newIngredientList);
      alert('Ingredient added successfully!');
    } catch (error) {
      console.error('Error uploading ingredient:', error);
      alert('An error occurred while adding the ingredient.');
    }
  };

  const handleRecipeSubmit = async () => {
    const recipeName = document.querySelector('[name="recipeName"]').value;
    const directionsInput = document.querySelector(
      '[name="directionsInput"]'
    ).value;

    if (!recipeName.trim()) {
      alert('Please enter a recipe name.');
      return;
    }

    if (!ingredientsList.length) {
      alert('Please add at least one ingredient.');
      return;
    }

    if (!directionsInput.trim()) {
      alert('Please enter directions for the recipe.');
      return;
    }

    if (!selectedImage) {
      alert('Please upload an image for the recipe.');
      return;
    }

    const directions = directionsInput.split(',').map((step) => step.trim());

    const recipeData = {
      name: recipeName,
      ingredients: ingredientsList,
      directions,
      image: selectedImage, // Include the selected image
    };

    try {
      await upload_recipe(recipeData);
      document.querySelector('[name="recipeName"]').value = '';
      document.querySelector('[name="directionsInput"]').value = '';
      setIngredientsList([]);
      setSelectedImage(null);
      alert('Recipe submitted successfully!');
    } catch (error) {
      console.error('Error uploading recipe:', error);
      alert('An error occurred while submitting the recipe.');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setFilteredSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 id="contribute">Contribute</h1>
      <div className={styles.buttons}>
        <button onClick={() => setActiveComponent('addIngredient')}>
          Add Ingredient
        </button>
        <button onClick={() => setActiveComponent('addRecipe')}>
          Add Recipe
        </button>
      </div>

      {activeComponent === 'addIngredient' && (
        <div className={styles.addIngredient}>
          <h3>Add Ingredient:</h3>
          <p>Type in the ingredient you want to add.</p>
          <input
            type="text"
            name="addIngredient"
            placeholder="Type in ingredient"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
          <button onClick={handleIngredientSubmit}>Submit</button>
        </div>
      )}

      {activeComponent === 'addRecipe' && (
        <>
          <div className={styles.inputContainer} ref={inputRef}>
            <h3>Add Recipe:</h3>
            <input
              type="text"
              name="recipeName"
              placeholder="Name your recipe"
            />
            <p>
              Select ingredients from the dropdown below, write directions
              separated by a comma, and upload a picture of your creation!
            </p>
            <input
              type="text"
              name="ingredientSearch"
              placeholder="Search ingredient"
              value={ingredient}
              onChange={handleInputChange}
            />
            {filteredSuggestions.length > 0 && (
              <ul className={styles.dropdown}>
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleAdd(suggestion)}
                    className={styles.suggestion}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.ingredientList}>
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

          <div className={styles.directionsInput}>
            <textarea
              name="directionsInput"
              placeholder="Type the directions for the recipe here"
              rows="5"
              cols="50"
            />
          </div>

          <div className={styles.imageUpload}>
            <h3>Upload an Image:</h3>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className={styles.submit}>
            <button onClick={handleRecipeSubmit}>Submit</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Contribute;
