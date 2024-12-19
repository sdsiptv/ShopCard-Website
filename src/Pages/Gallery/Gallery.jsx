// import React, { useState, useEffect } from 'react';
// import {
//     CarouselProvider,
//     Slider,
//     Slide,
//     ButtonBack,
//     ButtonNext
// } from 'pure-react-carousel';
// import 'pure-react-carousel/dist/react-carousel.es.css';
// import { GalleryApi } from "../Api/Api";
// import { useParams } from "react-router-dom";
// import './GalleryWithCarousel.css'; // Assuming custom styles

// const GalleryWithCarousel = () => {
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [gallery, setGallery] = useState([]);
//     const [error, setError] = useState(null);
//     const { id } = useParams();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await GalleryApi(id);
//                 setGallery(response.data);
//             } catch (err) {
//                 setError('Failed to fetch gallery images');
//             }
//         };
//         fetchData();
//     }, [id]);

//     const openModal = (image) => {
//         setSelectedImage(image);
//     };

//     const closeModal = () => {
//         setSelectedImage(null);
//     };

//     return (
//         <div className="gallery-container">
//             {error && <p className="error-message">{error}</p>}

//             <CarouselProvider
//                 naturalSlideWidth={100}
//                 naturalSlideHeight={125}
//                 totalSlides={gallery.length}
//                 visibleSlides={3}
//                 isIntrinsicHeight={true}
//             >
//                 <Slider>
//                     {gallery.map((item, index) => (
//                         <Slide index={index} key={index}>
//                             <div className="gallery-item" onClick={() => openModal(item.image)}>
//                                 <img src={item.image} className="gallery-image" alt={`Gallery ${index + 1}`} />
//                             </div>
//                         </Slide>
//                     ))}
//                 </Slider>
//                 <ButtonBack className="carousel-button">Back</ButtonBack>
//                 <ButtonNext className="carousel-button">Next</ButtonNext>
//             </CarouselProvider>

//             {selectedImage && (
//                 <div className="modal-overlay" onClick={closeModal}>
//                     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                         <img src={selectedImage} className="full-screen-image" alt="Full Screen" />
//                         <button className="close-button" onClick={closeModal}>×</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default GalleryWithCarousel;
