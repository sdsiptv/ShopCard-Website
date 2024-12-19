import React, { useEffect, useState } from "react";
import '../Pages/home.css';
import { Dashboard } from "./Api/Api";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";
// import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal, faMapPin } from "@fortawesome/free-solid-svg-icons";
import Carousel from "./Carousal/Carousal";
import { useSearchParams } from "react-router-dom";
import Logo from "../Assests/Logo.png";
import VendorLogo from "../Assests/VendorLogo.png";
function Home() {

    // const { id } = useParams();
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null);

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    // console.log("User ID:", id);

    const subscriptionMap = {
        1: 'Freetire',
        2: 'Bronze',
        3: 'Silver',
        4: 'Gold',
        5: 'Platinum',
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Dashboard(id);
                setDashboardData(data.data);
                console.log('Shop Name:', data.data);
            } catch (err) {
                setError('Failed to fetch Ids');
            }
        };
        fetchData(); 
    }, [id]);

    const formatTime = (hour, minute) => {
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        const formattedMinute = minute < 10 ? `0${minute}` : minute;
        return `${formattedHour}:${formattedMinute} ${ampm}`;
    };

    return (
        <>
            {dashboardData && (
                <div className="container-fluid">
                    <div className="row Address">
                        <div className="col-1">
                            <div className='content'>
                            </div>
                        </div>
                        <div className="col-6" >
                            <div style={{ marginTop: "15px" }}>
                                <span className="dealer">{subscriptionMap[dashboardData.subscription]} dealer</span>
                                <FontAwesomeIcon icon={faMedal} style={{ color: "#f39c12", fontSize: "20px", marginLeft: "5px" }} />
                            </div>
                        </div>
                        <div className="col-5 ">
                            <div style={{ marginTop: "15px" }}>
                                <span className="dealer">Shop Address :</span>
                                <FontAwesomeIcon icon={faMapPin} style={{ color: "#f39c12", fontSize: "18px", marginLeft: "5px" }} />
                                <span className="Address">{dashboardData.address}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-1 rk-food-shop">
                        <div className="row justify-content-center">
                            <div className="col-lg-2 col-md-3 d-flex align-items-center justify-content-between order-1 order-md-2">
                                <img
                                    className="AppLogo"
                                    src={Logo}
                                    alt="Offer App Logo"
                                />
                                <img
                                    className="AppLogo"
                                    src={VendorLogo}
                                    alt="Vendor App Logo"
                                />
                            </div>

                            <div className="col-lg-5 col-md-6 text-center order-3 order-md-1">
                                <div className="logo mb-3 order-1">
                                    <img
                                        src={dashboardData.images || require('../Assests/NoImage.png')}
                                        alt="Logo"
                                        className="rounded-circle"
                                    />
                                </div>
                                <h2 className="shop-title">{dashboardData.shop_name}</h2>
                                <p className="shop-subtitle">{dashboardData.vendor_tags.join(' | ')}</p>
                                <div className="info-boxes mt-4">
                                    <div className="info-box mb-3">
                                        <strong>Open now :</strong> {formatTime(dashboardData.hour_open, dashboardData.min_open)} - {formatTime(dashboardData.hour_close, dashboardData.min_close)}
                                    </div>
                                    <div className="info-box mb-3">
                                        <strong>Price Range :</strong> ₹ {dashboardData.price_range_min} - ₹ {dashboardData.price_range_max}
                                    </div>
                                    <div className="info-box mb-3">
                                        <strong>Contact :</strong> {dashboardData.shop_mobile_no}
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-5 col-md-6  pb-2 order-2">
                                <Carousel />
                            </div>
                        </div>
                    </div>

                    <div className="mt-2">
                        <NavBar />
                    </div>

                    <div className="mt-2">
                        <Footer />
                    </div>

                </div>
            )}
            <div>
                {error && <div className="error">{error}</div>}
            </div>
        </>
    );
}

export default Home;
