import React, { useState, useEffect, useRef } from "react";
import "./ShopDetails.css";
import "./Gallery.css";
import { GalleryApi, ShopDetailApi } from "../Api/Api";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import Gallery from "react-photo-gallery";

const ShopDetails = () => {
    const [shopDetails, setShopDetails] = useState(null);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [gallery, setGallery] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);


    const [currentIndex, setCurrentIndex] = useState(0);

    const galleryRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await ShopDetailApi(id);
                setShopDetails(data.data);
            } catch (err) {
                setError('Failed to fetch shop details');
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await GalleryApi(id);
                const formattedGallery = response.data.map((item, index) => ({
                    src: item.image,
                    width: 4,
                    height: 3,
                    index,
                }));
                setGallery(formattedGallery);
            } catch (err) {
                setError("Failed to fetch gallery images");
            }
        };
        fetchGallery();
    }, [id]);


    const openModal = (photo, index) => {
        setSelectedImage(photo.src);
        setCurrentIndex(index);
    };

    const closeModal = () => {
        setSelectedImage(null);
        console.log('image', selectedImage)
    };

    const navigateLeft = () => {
        const newIndex = (currentIndex - 1 + gallery.length) % gallery.length;
        setSelectedImage(gallery[newIndex].src);
        setCurrentIndex(newIndex);
    };

    const navigateRight = () => {
        const newIndex = (currentIndex + 1) % gallery.length;
        setSelectedImage(gallery[newIndex].src);
        setCurrentIndex(newIndex);
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowLeft") {
            navigateLeft();
        } else if (e.key === "ArrowRight") {
            navigateRight();
        } else if (e.key === "Escape") {
            closeModal();
        }
    };

    useEffect(() => {
        if (selectedImage) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedImage, currentIndex]);

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <>
            <div className="row-gallery" style={{ backgroundColor: "#FEEDCD" }}>
                <div className="row-gallery-wrapper">
                    <div className="row-gallery" ref={galleryRef}>
                        {gallery.length > 0 ? (
                            gallery.map((photo, index) => (
                                <img
                                    key={index}
                                    src={photo.src || "No Image Upload"}
                                    alt={`Gallery ${index + 1}`}
                                    onClick={() => openModal(photo, index)}
                                />
                            ))
                        ) : (
                            <div style={{ textAlign: "center", padding: "20px", color: "#e74c3c" }}>
                                <h3>No Images Uploaded</h3>
                            </div>
                        )}
                    </div>

                </div>

                {selectedImage && (
                    <div
                        className="modal-overlay"
                        onClick={closeModal}
                        aria-hidden="true"
                    >
                        <div
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                            role="dialog"
                            aria-live="polite"
                        >
                            <button
                                className="nav-button left"
                                onClick={navigateLeft}
                                aria-label="Previous Image"
                                style={{ color: "white" }}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <img
                                src={selectedImage}
                                className="full-screen-image"
                                alt="Full Screen"
                            />
                            <button
                                className="nav-button right"
                                onClick={navigateRight}
                                aria-label="Next Image"
                                style={{ color: "white" }}
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                            <button
                                className="close-button"
                                onClick={closeModal}
                                aria-label="Close Modal"
                                style={{ color: "white" }}
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {shopDetails && (
                <div className="shop-details-container">
                    <div className="shop-address">
                        <h2>Shop Address</h2>
                        <div className="address-details">
                            <p className="address">{shopDetails.address}</p>
                            <p className="landmark">{shopDetails.landmark}</p>
                        </div>
                    </div>

                    <div>
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col-6 col-sm-6">
                                <div style={{ backgroundColor: "#F3F3F3", padding: "20px", borderRadius: "8px" }}>
                                    <h2 style={{ margin: "0 0 10px 0", display: "flex", justifyContent: "center", fontWeight: "600" }}>Shop Timing</h2>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                        {daysOfWeek.map((day, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    padding: "10px",
                                                    backgroundColor: index % 2 === 0 ? "#e2f0cb" : "#ece8f7",
                                                    borderRadius: "5px",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                <span>{day}</span>
                                                {shopDetails.opening_days.includes(index) ? (
                                                    <span style={{ backgroundColor: "#ffa500", padding: "5px 10px", borderRadius: "5px", color: "#fff" }}>
                                                        Shop Open
                                                    </span>
                                                ) : (
                                                    <span>Closed</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-3"></div>
                        </div>
                    </div>
                </div>
            )}

            <div>
                {error && <div className="error">{error}</div>}
            </div>
        </>
    );
};

export default ShopDetails;
