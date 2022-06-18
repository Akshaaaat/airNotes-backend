var jwt = require("jsonwebtoken");
const JWT_SECRET = "TechnicllyThisSHouldBeSecret";

const fetchuser = (req, res, next) => {
  //Get the user from JWT token and add id to the reqd object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "Authenticate using a valid token" });
  }

  try {

    //Verfying the token
    const data = jwt.verify(token, JWT_SECRET);
    req.user= data.user;
    next();

  }
  catch (error) {
    console.error(error.message);
    return res.status().json({error:"Internal Server Error Occured"})
  }
};

module.exports = fetchuser;
