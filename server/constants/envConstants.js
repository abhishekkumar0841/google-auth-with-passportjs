module.exports = {
  MONGO_URI: process.env.MONGO_URI,

  JWT: {
    JWT_SECRET: process.env.JWT_SECRET,
    TOKEN_LIFE: "7d",
  },

  GOOGLE: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },

  URLS:{
    CLIENT_BASE_URL: process.env.CLIENT_BASE_URL
  }
};
