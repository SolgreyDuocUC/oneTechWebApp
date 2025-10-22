
import React from "react";

import { Carousel as BsCarousel } from 'react-bootstrap'; 

import Banner1 from "../assets/HomePageBanner/Banner_1.png";
import Banner2 from "../assets/HomePageBanner/Banner_2.png";
import Banner3 from "../assets/HomePageBanner/Banner_3.png";

function Carousel (){

    const slides = [Banner1, Banner2, Banner3];

    return(
        <BsCarousel>
            {slides.map((bannerSrc, index) => (
                <BsCarousel.Item key={index}>
                    {}
                    <img 
                        className="d-block w-100"
                        src={bannerSrc} 
                        alt={`Banner ${index + 1}`}
                    />
                    {}
                </BsCarousel.Item>
            ))}
        </BsCarousel>
    );

}

export default Carousel;