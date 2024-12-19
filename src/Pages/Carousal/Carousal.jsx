import React, { useEffect, useState, useRef } from "react";
import { Dashboard } from "../Api/Api";
import { useSearchParams } from "react-router-dom";
import {
  CarouselProvider,
  Slider,
  Slide,
  // ButtonBack,
  // ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./Carousel.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHandPointLeft, faHandPointRight } from "@fortawesome/free-solid-svg-icons";
// import NoImage from "../../Assests/NoImage.png"
const Carousel = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Dashboard(id);
        setDashboardData(data.data);
      } catch (err) {
        setError("Failed to fetch dashboard data");
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (dashboardData) {
      const totalSlides = dashboardData.banner_images.length;
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
      }, 2000);
    }
    return () => clearInterval(intervalRef.current);
  }, [dashboardData]);

  return (
    <div className="image-section">
      {dashboardData ? (
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={50}
          totalSlides={dashboardData.banner_images.length}
          currentSlide={currentSlide}
        >
          <Slider>
            {dashboardData.banner_images.map((imageData, index) => (
              <Slide index={index} key={index}>
                <img
                  src={imageData.image || "/NoImage.png"}
                  alt={`Slide ${index + 1}`}
                  className="carousel-image"
                />

              </Slide>
            ))}
          </Slider>
          {/* <div className="carousel-controls">
            <ButtonBack>
              <FontAwesomeIcon icon={faHandPointLeft} />
            </ButtonBack>
            <ButtonNext>
              <FontAwesomeIcon icon={faHandPointRight} />
            </ButtonNext>
          </div> */}
        </CarouselProvider>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Carousel;
