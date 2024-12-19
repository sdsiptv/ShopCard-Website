import React, { useEffect, useState } from "react";
import './Reviews.css';
// import Man1 from "../../Assests/Man1.png";
import { Reviews as fetchReview } from "../Api/Api";
// import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    // const { id } = useParams();

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    // console.log("User ID:", id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchReview(id);
                console.log('Fetched Data:', data);
                setReviews(data.data.reviews || []);
            } catch (err) {
                setError('Failed to fetch offer details');
            }
        };
        fetchData();
    }, [id]);

    return (
        <>
            <div>
                <h1 className="ShopReview">Shop Reviews</h1>
            </div>
            <div className="row mt-2">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="col-sm-6 col-md-5 col-lg-3 mt-3">
                            <div className="review-card">
                                <div className="review-header">
                                    {review.images ? (
                                        <img
                                            src={review.images}
                                            alt="Reviewer"
                                            className="review-image"
                                        />
                                    ) : (
                                        <div
                                            className="placeholder-avatar"
                                            style={{
                                                backgroundColor: "#bb8fce",
                                                color: "white",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: "50%",
                                                width: "50px",
                                                height: "50px",
                                            }}
                                        >
                                            {review.username?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <div className="review-details">
                                        <h2>{review.username}</h2>
                                        <div className="review-stars">
                                            {[...Array(Math.round(review.rating))].map((star, index) => (
                                                <span key={index} className="star">
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                                <div className="review-content">
                                    <p>{review.comment || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews available</p>
                )}
            </div>
            {error && <div className="error">{error}</div>}
        </>

    );
};

export default Reviews;
