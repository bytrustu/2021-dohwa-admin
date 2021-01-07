const config = {
  LOCAL_URL: 'http://localhost:9000',
  SERVER_URL: 'http://server.dowha.loplab.kr',
  BASE_URL: process.env.NODE_ENV === 'production' ? `http://server.dowha.loplab.kr/api` : `http://localhost:9000/api`,
  IMAGE_URL: process.env.NODE_ENV === 'production' ? `http://server.dowha.loplab.kr/images` : `http://localhost:9000/images`,
  DOMAIN: '.loplab.kr',
};

export default config;