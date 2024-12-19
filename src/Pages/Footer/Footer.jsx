import React, { useEffect, useState } from "react";
import './Footer.css';
import Reviews from "../Reviews/Reviews";
import FacebookIcon from "../../Assests/Facebook.png";
import WhatsAppIcon from "../../Assests/Whatsapp.png";
import InstagramIcon from "../../Assests/Instagram.png";
import LocationIcon from "../../Assests/road.png";
import YouTubeIcon from "../../Assests/Youtube.png";
import { ShopDetailApi } from "../Api/Api";
// import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import APPIMAGE1 from "../../Assests/AppImage1.png";
import APPIMAGE2 from "../../Assests/AppImage2.png";
import Logo from "../../Assests/Logo.png";
import APPSTORE from "../../Assests/App Store Download Button.png";
import PLAYSTORE from "../../Assests/Google Play Download.png"

const Footer = () => {
    const [shopDetails, setShopDetails] = useState(null);
    const [error, setError] = useState(null);
    // const { id } = useParams();

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    // console.log("User ID:", id);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await ShopDetailApi(id);
                setShopDetails(data.data);
                console.log('Shop Details:', data.data);
            } catch (err) {
                setError('Failed to fetch shop data');
            }
        };
        fetchData();
    }, [id]);

    return (
        <>
            {shopDetails && (
                <div className="footer-container-Social">
                    <div className="social-links">
                        <div className="social-item">
                            <a
                                href={`https://wa.me/${shopDetails.whatsapp}`}
                                style={{ textDecoration: "none" }}
                                target="_blank" rel="noopener noreferrer"
                            >
                                <img src={WhatsAppIcon} alt="WhatsApp" />
                                <span>WhatsApp</span>
                            </a>
                        </div>
                        <div className="social-item">
                            <a
                                href={`https://instagram.com/${shopDetails.insta}`}
                                style={{ textDecoration: "none" }}
                                target="_blank" rel="noopener noreferrer"
                            >
                                <img src={InstagramIcon} alt="Instagram" />
                                <span>Instagram</span>
                            </a>
                        </div>
                        <div className="social-item">
                            <a
                                href={`${shopDetails.youtube}`}
                                style={{ textDecoration: "none" }}
                                target="_blank" rel="noopener noreferrer"
                            >
                                <img src={YouTubeIcon} alt="YouTube" />
                                <span>YouTube</span>
                            </a>
                        </div>
                        <div className="social-item">
                            <a
                                href={`${shopDetails.facebook}`}
                                style={{ textDecoration: "none" }}
                                target="_blank" rel="noopener noreferrer"
                            >
                                <img src={FacebookIcon} alt="Facebook" />
                                <span>Facebook</span>
                            </a>
                        </div>
                        <div className="social-item">
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${shopDetails.latitude},${shopDetails.longitude}`}
                                style={{ textDecoration: "none" }}
                                target="_blank" rel="noopener noreferrer"
                            >
                                <img src={LocationIcon} alt="Location" />
                                <span>Location</span>
                            </a>

                        </div>
                    </div>
                </div>
            )}


            <div className="container-fluid CardBackground promo-section py-5">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6 col-12 text-center mb-4 mb-md-0">
                        <div className="d-flex flex-wrap justify-content-center">
                            <img
                                src={APPIMAGE1}
                                alt="First App Screenshot showcasing features"
                                className="img-fluid mb-3 mx-2"
                                style={{ maxWidth: "48%", maxHeight: "400px" }}
                                loading="lazy"
                            />
                            <img
                                src={APPIMAGE2}
                                alt="Second App Screenshot showcasing features"
                                className="img-fluid mb-3 mx-2"
                                style={{ maxWidth: "48%", maxHeight: "400px" }}
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12 text-center text-md-start">
                        <h2
                            className="display-5 fw-bold mb-3"
                            style={{
                                background: "linear-gradient(to right, #303030, #FF8A00)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Install the App
                        </h2>
                        <p style={{ textAlign: "left" }}>
                            It's never been easier to order food. Look for the finest
                            discounts and you'll be lost in a world of delectable food.
                        </p>
                        <div className="promo-buttons d-flex justify-content-center justify-content-md-start mt-4">
                            <a
                                href="https://play.google.com/store/apps/details?id=com.offer_360_vendor.offer_vendor_app"
                                className="me-3"
                                aria-label="Download from Google Play"
                            >
                                <img
                                    src={PLAYSTORE}
                                    alt="Google Play Store Badge"
                                    className="store-badge"
                                    loading="lazy"
                                    style={{ maxWidth: "190px" }}
                                />
                            </a>
                            <a href="https://apps.apple.com/app/id6739167036" aria-label="Download from App Store">
                                <img
                                    src={APPSTORE}
                                    alt="App Store Badge"
                                    className="store-badgeAppStore"
                                    loading="lazy"
                                    style={{ maxWidth: "180px", marginRight: "20px" }}
                                />
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12 text-center">
                        <img
                         src={Logo}
                         alt="Offer App Logo"
                         className="Logo"
                          />
                    </div>
                </div>
            </div>


            <div className="mt-2">
                <Reviews />
            </div>

            <div className="footer-container mt-3">
                <div className="footer-overlay">
                    <h2>Are you ready to Use the best Offer?</h2>
                    <button className="footer-button">CLICK HERE</button>
                </div>
            </div>
            <div>
                {error && <div className="error">{error}</div>}
            </div>

        </>
    )
}
export default Footer;