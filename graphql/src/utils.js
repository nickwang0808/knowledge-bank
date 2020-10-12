const jwt = require("jsonwebtoken");
const SECRET = "secret";

const getUserId = (context) => {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, SECRET);
    return userId;
  }

  throw new Error("Not Authenticated");
};

module.exports = { getUserId };
