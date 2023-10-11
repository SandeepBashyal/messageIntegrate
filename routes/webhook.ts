import express, { Request, Response } from "express";
const router = express.Router();
require("dotenv").config();

import { chatCompletion } from "../services/openAIServise";
import { sendMessage, GetUserDetails } from "../services/messangerService";

router.get("/", (req: Request, res: Response) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  if (mode && token) {
    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    let body = req.body;
    let requestType = body.object;
    let senderId = body.entry[0].messaging[0].sender.id;
    let query = body.entry[0].messaging[0].message.text;
    const response = await GetUserDetails(senderId);
    console.log(query);
    console.log(response);
    res.status(200).json({
      status: "success",
      message: query,
      profileDetails: response,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/sendMsg", async (req: Request, res: Response) => {
  try {
    let senderId = process.env.SENDER_ID
      ? parseInt(process.env.SENDER_ID)
      : undefined;
    let promptMessage = req.body.message;
    if (!promptMessage) {
      res.status(400).send("Error: promptMessage is required");
    }
    const response = await sendMessage(senderId, promptMessage);
    if (response) {
      res.status(200).send("Message sent");
    } else {
      res.status(500).send("Message not sent");
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
