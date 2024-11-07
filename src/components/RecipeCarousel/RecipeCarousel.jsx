
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from './RecipeCarousel.module.css';



function RecipeCarousel({ recipes }) {



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      };

    return (
     <div className="carousel-container">
         <Slider {...settings}>
         {recipes.map((recipe, index) => (
                    <div key={index} className="p-4">
                        <div className="relative w-full h-full">
                            <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                            <div className="info-overlay absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3">
                                <h2 className="text-xl mb-1">{recipe.name}</h2>
                                <p className="text-sm">Ingredients: {recipe.ingredients.join(', ')}</p>
                                <p className="text-sm">Directions: {recipe.directions}</p>
                            </div>
                        </div>
                    </div>
                ))}
        </Slider>
      </div>
    );
}

export default RecipeCarousel;




