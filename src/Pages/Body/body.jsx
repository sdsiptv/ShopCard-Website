import React, { useState, useEffect } from "react";
import './body.css';
import { Category, ProductDetails } from "../Api/Api";
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useSearchParams } from "react-router-dom";

const Body = () => {
    const [CategoryData, setCategoryData] = useState(null);
    const [ProductData, setProductData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(0);
    const [visibleDetails, setVisibleDetails] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    // // console.log("User ID:", id);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const selectedCategoryId = newValue === 0 ? "all" : CategoryData[newValue - 1]?.id;
        setSelectedCategory(selectedCategoryId);
    };

    const toggleDetails = (productId) => {
        setVisibleDetails((prevState) => ({
            ...prevState,
            [productId]: !prevState[productId],
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await Category(id);
                setCategoryData(categoryResponse.data);

                const productResponse = await ProductDetails(id);
                setProductData(productResponse.data);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const filteredProducts = selectedCategory === "all"
        ? ProductData
        : ProductData.filter(product => product.product_tags?.includes(Number(selectedCategory)));


    return (
        <>
            {CategoryData && (
                <div style={{ backgroundColor: "#fff5de", borderRadius: "12px" }}>
                    <div>
                        <span style={{
                            fontSize: "18px",
                            fontWeight: "600",
                            display: "flex",
                            justifyContent: "center"
                        }}
                        >Product Category</span>
                    </div>
                    <Box
                        sx={{
                            flexGrow: 1,
                            maxWidth: { xs: 320, sm: 760 },
                            margin: '0 auto',
                            display: 'flex',
                            justifyContent: 'center',
                            bgcolor: '#fff5de',
                            p: 2,
                        }}
                    >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="visible arrows tabs example"
                            TabIndicatorProps={{
                                sx: {
                                    display: 'none',
                                },
                            }}
                            sx={{
                                [`& .${tabsClasses.scrollButtons}`]: {
                                    '&.Mui-disabled': { opacity: 0.3 },
                                },
                                '& .MuiTab-root': {
                                    borderRadius: '25px',
                                    margin: '0 8px',
                                    minHeight: '48px',
                                    minWidth: '100px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    color: '#FFA000',
                                    border: "double",
                                    '&.Mui-selected': {
                                        backgroundColor: '#FFA000',
                                        color: '#ffffff',
                                    },
                                },
                            }}
                        >
                            <Tab key="all" label="All" />
                            {CategoryData.map((item, index) => (
                                <Tab key={item.id} label={item.name} />
                            ))}
                        </Tabs>
                    </Box>
                </div>
            )}

            <div className="container popular-container">
                <span className="Popular">Popular Items</span>
            </div>

            {filteredProducts && filteredProducts.length > 0 ? (
                <div className="container demo-product-container">
                    <div className="row product-row">
                        {filteredProducts.map((product) => (
                            <div
                                className="card col-6 col-sm-3 mt-3 ml-2"
                                key={product.id}
                                style={{
                                    backgroundColor: "#ffffff",
                                    borderRadius: "20px",
                                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
                                    overflow: "hidden",
                                    textAlign: "center",
                                    position: "relative",
                                    padding: "15px",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                    e.currentTarget.style.boxShadow = "0px 10px 25px rgba(0, 0, 0, 0.2)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0px 8px 20px rgba(0, 0, 0, 0.15)";
                                }}
                            >
                                {visibleDetails[product.id] && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "0",
                                            left: "0",
                                            width: "100%",
                                            height: "100%",
                                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                                            zIndex: "10",
                                            padding: "15px",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            color: "#ffffff",
                                            borderRadius: "20px",
                                        }}
                                    >
                                        <p style={{ marginBottom: "10px", fontWeight: "bold", fontSize: "16px" }}>
                                            <strong >
                                                <span style={{ color: "#FFA000" }}>Product Name:</span>
                                            </strong> <text style={{ color: "#f4f6f7" }}>{product.product_name || "N/A"}</text>
                                            <br />
                                            <strong>
                                                <span style={{ color: "#FFA000" }}>Quantity:</span>
                                            </strong> <text style={{ color: "#f4f6f7" }}>{product.quantity || "N/A"}</text>
                                            <br />
                                            <strong>
                                                <span style={{ color: "#FFA000" }}>Price:</span>
                                            </strong> <text style={{ color: "#f4f6f7" }}>₹{product.price || "N/A"}</text>
                                            <br />
                                            <strong>
                                                <span style={{ color: "#FFA000" }}>Description:</span>
                                            </strong>
                                            <div style={{
                                                // display: "block",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitBoxOrient: "vertical",
                                                WebkitLineClamp: 2,
                                                display: "-webkit-box",
                                            }}>
                                                <text style={{ color: "#f4f6f7" }}> {product.description || "N/A"}</text>
                                            </div>
                                        </p>
                                        <button
                                            onClick={() => toggleDetails(product.id)}
                                            style={{
                                                padding: "8px 20px",
                                                backgroundColor: "#FFA000",
                                                border: "none",
                                                color: "#fff",
                                                fontWeight: "bold",
                                                borderRadius: "8px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Close
                                        </button>
                                    </div>
                                )}

                                <img
                                    src={product.images[0]?.image || require('../../Assests/NoImage.png')}
                                    className="card-img-top"
                                    alt={product.product_name}
                                    style={{
                                        height: "160px",
                                        objectFit: "cover",
                                        borderRadius: "15px",
                                        margin: "10px 0",
                                    }}
                                />
                                <div className="card-body">
                                    <div className="card-text">
                                        <span
                                            style={{
                                                fontWeight: "700",
                                                display: "block",
                                                margin: "10px 0",
                                                fontSize: "18px",
                                                color: "#333",
                                            }}
                                        >
                                            {product.product_name}
                                        </span>
                                        <span
                                            style={{
                                                color: "#FFA000",
                                                fontSize: "14px",
                                                display: "block",
                                                marginBottom: "5px",
                                            }}
                                        >
                                            QTY : {product.quantity}
                                        </span>
                                        <span
                                            style={{
                                                fontWeight: "700",
                                                fontSize: "18px",
                                                color: "#333",
                                            }}
                                        >
                                            ₹{product.price}
                                        </span>
                                    </div>
                                    <button
                                        className="btn btn-warning Details"
                                        style={{
                                            marginTop: "10px",
                                            backgroundColor: "#FFA000",
                                            color: "#fff",
                                            fontWeight: "700",
                                            width: "100%",
                                            borderRadius: "12px",
                                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                                            padding: "10px 0",
                                            transition: "background-color 0.3s ease",
                                        }}
                                        onClick={() => toggleDetails(product.id)}
                                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#ff8c00")}
                                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#FFA000")}
                                    >
                                        {visibleDetails[product.id] ? "Hide Details" : "More Detail"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: "center", padding: "20px", color: "#e74c3c" }}>
                    <h3>No products available</h3>
                </div>
            )}

        </>
    );
};

export default Body;
