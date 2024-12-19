import axios from 'axios';
// import CryptoJS from 'crypto-js';
// const BASE_URL = 'http://192.168.1.5:3000';
// const BASE_URL = 'https://192.168.1.11:4000/offerapp';
// const BASE_URL = 'https://192.168.1.11/offerapp';
const BASE_URL = 'https://148.113.1.126/offerapp';
// const BASE_URL = 'https://103.219.207.71/offerapp';
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInJvbGVfbmFtZSI6IkRpc3RyaWN0QWRtaW4iLCJyb2xlIjoiNCIsIm5hbWUiOiJ3ZWJhZG1pbiIsImlhdCI6MTcyNDA3MDAzOX0.qTHpdkbQETT9cEJx_2vKeCf_wcSHNpfn3HyXkq1BxV4';
// const SECRET_KEY = 'my_secret_key';
// const secretKey = crypto.createHash('sha256').update(String(process.env.SECRET_KEY)).digest('base64').substr(0, 32);


export const Dashboard = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/vendorwebdetails/dashboard/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const Category = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/webproductTags/selected/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const ProductDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/webproducts/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const OfferDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/weboffers/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const OfferTags = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/weboffertags`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const GalleryApi = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/webgallery/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const Reviews = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/userwebreviews/getreviews/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const ShopDetailApi = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/vendorwebdetails/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

