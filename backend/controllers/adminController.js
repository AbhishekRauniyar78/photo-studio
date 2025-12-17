import Admin from "../models/Admin.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email, password });

  if (admin) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
};
