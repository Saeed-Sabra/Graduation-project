const expressJwt = require("express-jwt");

function authJwt() {
  return expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/users\/confirmEmail(.*)/, methods: ["GET", "OPTIONS"] },
      "/users/login",
      "/users/signup",
      "/users/me",
      "/users/prediction",
      "/users/history",
    ],
  });
}
async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }
  done();
}

module.exports = authJwt;
