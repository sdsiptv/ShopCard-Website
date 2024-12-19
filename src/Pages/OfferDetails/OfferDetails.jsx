import React, { useState, useEffect } from "react";
import {
  Button,
  CardActionArea,
  CardActions,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid
} from '@mui/material';
import { OfferTags as fetchOfferTags } from "../Api/Api";
import { OfferDetails as fetchOfferDetails } from "../Api/Api";
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';
// import CryptoJS from "crypto-js";
import { useSearchParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const OfferDetails = () => {
  const [offerTags, setOfferTags] = useState([]);
  const [OfferPost, setOfferPost] = useState([]);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(0);
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const selected = newValue === 0 ? "all" : offerTags[newValue - 1]?.id?.toString();
    setSelectedTag(selected);
  };

  const handleOpenModal = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOffer(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOfferTags();
        setOfferTags(data.data);
        // const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data.data), 'SDS').toString();
      } catch (err) {
        setError('Failed to fetch dashboard data');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOfferDetails(id);
        setOfferPost(data.data);
      } catch (err) {
        setError('Failed to fetch offer details');
      }
    };
    fetchData();
  }, [id]);

  const filteredOffers = selectedTag === "all"
    ? OfferPost
    : OfferPost.filter(offer => offer.offer_tags?.toString() === selectedTag);

  return (
    <>
      {offerTags.length > 0 && (
        <div style={{ backgroundColor: "#fff5de", borderRadius: "12px" }}>
          <div>
            <span style={{
              fontSize: "18px",
              fontWeight: "600",
              display: "flex",
              justifyContent: "center"
            }}>Offer Category</span>
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
              {offerTags.map((item) => (
                <Tab key={item.id} label={item.name} />
              ))}
            </Tabs>
          </Box>
        </div>
      )}

      <div className="container popular-container">
        <span className="Popular">Popular Item</span>
      </div>
      <Box className="container-fluid">
        <Grid container spacing={3} justifyContent="center">
          {filteredOffers.length > 0 ? (
            filteredOffers.map((offer) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={offer.id}>
                <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
                  <CardActionArea>
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={offer.images || require('../../Assests/NoImage.png')}
                        alt={offer.offer_name}
                        sx={{ borderRadius: "4px", objectFit: "cover" }}
                      />
                      <Chip
                        label={offer.offer_name}
                        sx={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          bgcolor: "rgba(0,0,0,0.6)",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                      <Box
                        sx={{
                          // position: "absolute",
                          top: 0,
                          right: 0,
                          bgcolor: "rgba(0, 0, 0, 0.6)",
                          borderRadius: 1,
                          width: '100%',
                          p: 0.5,
                          display: "flex",
                          alignItems: "center",
                          color: 'white',
                          position: "relative",
                        }}
                      >

                        <Box display="flex" alignItems="center">
                          <FontAwesomeIcon icon={faTags} style={{ color: "#fff000" }} />
                          <Typography variant="body2" ml={1} style={{ color: "white" }}>
                            {offer.product_tags}
                          </Typography>
                          <Chip label={offer.is_available ? "Available" : "Unavailable"} color={offer.is_available ? "success" : "error"} size="small" sx={{ ml: 27 }} />
                        </Box>
                      </Box>

                    </Box>
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="div"
                        color="orange"
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textAlign: "center",
                        }}
                      >
                        {offer.offer_name}
                      </Typography>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                        <Typography variant="body2" color="text.secondary">
                          Valid: {offer.end_date ? formatDate(offer.end_date) : "N/A"}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <Typography
                            variant="body2"
                            sx={{ textDecoration: "line-through", color: "red", marginRight: 1 }}
                          >
                            ₹{offer.original_price}
                          </Typography>
                          <Typography variant="h6" color="text.primary">
                            ₹{offer.discounted_price}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        bgcolor: "orange",
                        color: "white",
                        fontWeight: "bold",
                        "&:hover": {
                          bgcolor: "#ffdb37",
                          color: "black",
                        },
                      }}
                      onClick={() => handleOpenModal(offer)}
                    >
                      More Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "20px", color: "#e74c3c" }}>
              <h3>No Offers available</h3>
            </div>
          )}
        </Grid>
      </Box>

      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth>
        <DialogTitle style={{ backgroundColor: "#fff5de", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#2874a6", fontSize: "24px", fontWeight: "700" }}>
            {selectedOffer?.offer_name}
          </span>
          <IconButton
            onClick={handleCloseModal}
            style={{ color: "Black" }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#fff5de" }}>
          <CardMedia
            component="img"
            height="300"
            image={selectedOffer?.images || require('../../Assests/NoImage.png')}
            alt={selectedOffer?.offer_name}
            style={{ marginBottom: "15px", borderRadius: "8px" }}
          />

          <Typography variant="body1" gutterBottom>
            <strong style={{ color: "#FFB20E" }}>Price: </strong>
            <span style={{ textDecoration: "line-through", color: "#FF0000" }}>
              ₹{selectedOffer?.original_price}
            </span>
            <text>  -  ₹{selectedOffer?.discounted_price}{" "}</text>

          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong style={{ color: "#FFB20E" }}>Product Tags:</strong>{" "}
            {selectedOffer?.product_tags || "No description available"}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong style={{ color: "#FFB20E" }}>Offer Tags:</strong>{" "}
            {selectedOffer?.offer_tags || "No description available"}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong style={{ color: "#FFB20E" }}>Description:</strong>{" "}
            {selectedOffer?.description || "No description available"}
          </Typography>
          {/* <Typography variant="body1" gutterBottom>
            <strong style={{ color: "#FFB20E" }}>Location:</strong> Anna Nagar East, Chennai
          </Typography> */}
          <Typography variant="body1" gutterBottom>
            <strong style={{ color: "#FFB20E" }}>Validity:</strong>{" "}
            {selectedOffer?.end_date ? formatDate(selectedOffer?.end_date) : "N/A"}
          </Typography>
        </DialogContent>
      </Dialog>

      <div>
        {error && <div className="error">{error}</div>}
      </div>
    </>
  );
};

export default OfferDetails;
