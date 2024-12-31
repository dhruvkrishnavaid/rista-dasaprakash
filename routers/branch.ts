import axios from "axios";
import { Router } from "express";
import jwt from "jsonwebtoken";
const router = Router();

// Load environment variables
const baseUrl = process.env.RISTA_BASEURL;
const apiKey = process.env.RISTA_API_KEY;
const secretKey = process.env.RISTA_SECRET_KEY;
const tokenCreationTime = Math.floor(Date.now() / 1000);
const payload = { iss: apiKey, iat: tokenCreationTime };

//jwt library uses HS256 as default.
const token = jwt.sign(payload, secretKey);

const getBranches = async (_req, res) => {
  try {
    const response = await axios.get(
      `${baseUrl}/branch/list`,
      {
        headers: {
          "x-api-key": apiKey,
          "x-api-token": token,
          "content-type": "application/json",
        },
      },
    );
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", msg: error });
  }
};

const getBranchTxns = async (req, res) => {
  try {
    const { id, day } = req.params;
    const response = await axios.get(
      `${baseUrl}/branch/txn/list?branchCode=${id}&day=${day}`,
      {
        headers: {
          "x-api-key": apiKey,
          "x-api-token": token,
          "content-type": "application/json",
        },
      },
    );
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", msg: error });
  }
};

router.get("/branches", getBranches);
router.get("/branches/:id/txns/:day", getBranchTxns);
export default router;
