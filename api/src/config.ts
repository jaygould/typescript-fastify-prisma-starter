require("dotenv").config();

export default {
  authSecret: process.env.JWT_SECRET,
};
