import admin from "../config/firebaseAdmin.js";

const authMiddlware = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.staus(401).send("unauthorized access");
  }

  const token = header.split("Bearer ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.id = decodedToken.uid;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).send("unauthorized");
  }
};

export default authMiddlware;
