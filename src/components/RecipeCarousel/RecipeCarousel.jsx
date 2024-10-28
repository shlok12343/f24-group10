import React, { useState } from "react";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";

export default function RecipeCarousel({ recipes }) {
    const [current, setCurrent] = useState(0);
     // Number of images visible at one time

    const previousSlide = () => {
        setCurrent(current === 0 ? recipes.length - 1 : current - 1);
    };

    const nextSlide = () => {
        setCurrent(current === recipes.length - 1 ? 0 : current + 1);
    };

    return (
        <div className="carousel-container overflow-hidden relative">
            <div
                className="flex transition ease-out duration-300"
                style={{
                    transform: `translateX(-${current * (100 / 3)}%)`,
                    width: `${100}%`
                }}
            >
                {recipes.map((recipe, index) => (
                    <div key={index} className="slide w-full flex-shrink-0" style={{ width: `calc(100% / ${3})` }}>
                        <img alt={recipe.name} src={recipe.image}  className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            <div className="absolute top-0 h-full w-full flex justify-between items-center text-white px-4 text-3xl">
                <button onClick={previousSlide} className="focus:outline-none">
                    <BsFillArrowLeftCircleFill />
                </button>
                <button onClick={nextSlide} className="focus:outline-none">
                    <BsFillArrowRightCircleFill />
                </button>
            </div>
        </div>
    );
}