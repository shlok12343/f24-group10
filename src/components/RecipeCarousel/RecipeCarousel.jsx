import React, { useState } from 'react';
import styles from './RecipeCarousel.module.css'; // Assume you have styles defined

function RecipeCarousel({ recipes }) {
    const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(null);

    const selectRecipe = index => {
        setSelectedRecipeIndex(index);
    };

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.recipeList}>
                {recipes.map((recipe, index) => (
                    <div key={index} className={styles.recipeItem} onClick={() => selectRecipe(index)}>
                        {recipe.name}
                    </div>
                ))}
            </div>
            {selectedRecipeIndex !== null && (
                <div className={styles.recipeDetails}>
                    <h3>{recipes[selectedRecipeIndex].name}</h3>
                    <h4>Ingredients:</h4>
                    <ul>
                        {recipes[selectedRecipeIndex].ingredients.map((ingredient, i) => (
                            <li key={i}>{ingredient}</li>
                        ))}
                    </ul>
                    <h4>Directions:</h4>
                    <p>{recipes[selectedRecipeIndex].directions}</p>
                </div>
            )}
        </div>
    );
}

export default RecipeCarousel;