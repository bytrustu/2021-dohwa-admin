const config = {
  LOCAL_URL: 'http://localhost:9000',
  SERVER_URL: 'http://15.164.101.160:9000',
  BASE_URL: process.env.NODE_ENV === 'production' ? `http://15.164.101.160:9000/api` : `http://localhost:9000/api`,
  IMAGE_URL: process.env.NODE_ENV === 'production' ? `http://15.164.101.160:9000/image` : `http://localhost:9000/image`,
};

export default config;