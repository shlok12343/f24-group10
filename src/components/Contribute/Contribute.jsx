import { useState, useEffect, useRef } from 'react';
import styles from './Contribute.module.css';

function Contribute() {
  const [activeComponent, setActiveComponent] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const allSuggestions = [
    'Tomato',
    'Onion',
    'Garlic',
    'Basil',
    'Oregano',
    'Chicken',
    'Beef',
    'Carrot',
    'Pepper',
  ];

  const inputRef = useRef(null);

  const handleAdd = (selectedIngredient) => {
    if (selectedIngredient && !ingredientsList.includes(selectedIngredient)) {
      setIngredientsList([...ingredientsList, selectedIngredient]);
      setIngredient('');
      setFilteredSuggestions([]);
    }
  };

  const handleDelete = (index) => {
    setIngredientsList(ingredientsList.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setIngredient(input);
    if (input) {
      const filtered = allSuggestions.filter((suggestion) =>
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
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleImageDelete = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  const handleIngredientSubmit = () => {
    if (ingredient.trim() === '') {
      alert('Please enter an ingredient');
      return;
    }

    const ingredientToStore = ingredient;

    console.log('Stored Ingredient:', ingredientToStore);

    setIngredient('');
  };

  const handleRecipeSubmit = () => {
    const recipeName = document.querySelector('[name="recipeName"]').value;
    const directionsInput = document.querySelector(
      '[name="directionsInput"]'
    ).value;

    // Validate input
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
      imagePath: 'C:/Users/mathe/Desktop/RecipeImage/' + selectedImage.name,
    };

    document.querySelector('[name="recipeName"]').value = '';
    document.querySelector('[name="directionsInput"]').value = '';
    setIngredientsList([]);
    setPreviewUrl(null);
    setSelectedImage(null);

    alert('Recipe submitted successfully!');
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
    <>
      <div className={styles.container}>
        <h1>Contribute</h1>
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
                seperated by a comma, and upload a picture of your creation!
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
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {previewUrl && (
                <div className={styles.imagePreview}>
                  <h4>Preview:</h4>
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here to view your uploaded image
                  </a>
                  <button
                    className={styles.deleteButton}
                    onClick={handleImageDelete}
                  >
                    Delete Image
                  </button>
                </div>
              )}
            </div>

            <div className={styles.submit}>
              <button onClick={handleRecipeSubmit}>Submit</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Contribute;
