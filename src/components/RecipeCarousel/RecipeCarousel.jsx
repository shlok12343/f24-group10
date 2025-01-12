import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState } from 'react';

function RecipeCarousel({ recipes }) {
  const [visible, setVisible] = useState(Array(recipes.length).fill(false));

  const toggleOverlay = (index) => {
    const newVisible = [...visible];
    newVisible[index] = !newVisible[index];
    setVisible(newVisible);
  };

  const settings = {
    infinite: true,
    speed: 1200,
    slidesToShow: 4,
    slidesToScroll: 4,
    swipe: true,
    touchMove: true,
    swipeToSlide: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <h1
        id="explore"
        class="text-4xl text-[#2a3124] font-bold text-center mb-10"
      >
        Explore Recipes
      </h1>
      <Slider {...settings}>
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="border-black"
            onClick={() => toggleOverlay(index)}
          >
            <div className="text-xl text-center text-white bg-[#363f2f] p-3 w-full h-20">
              {recipe.name}
            </div>
            <div className="relative w-full h-full">
              <img
                src={recipe.image}
                alt={recipe.name}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  border: '2px solid black',
                  borderRadius: '10px',
                }}
              />
              {visible[index] && (
                <div className="activate info-overlay absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3 overflow-y-auto">
                  <p className="text-sm text-left mb-2">
                    <span className="text-base">Ingredients:</span>{' '}
                    {recipe.ingredients.join(', ')}
                  </p>
                  <p className="text-sm text-left">
                    <span className="text-base">Directions:</span>{' '}
                    {recipe.directions}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default RecipeCarousel;
