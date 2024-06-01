import express, { Router } from "express";
import { createTicket, deleteticket, getticketstatus } from "./userservice.js";

const app = express();

export const userRoute = express.Router();

userRoute.post("/createticket", async (req, res) => {
  const result = await createTicket(req.body.username, req.body.issue);
  res.json(result);
});

userRoute.get("/ticketstatus/:ticketid", async (req, res) => {
  console.log(req.params.ticketid);
  const getstatus = await getticketstatus(req.params.ticketid);
  res.json(getstatus);
});

userRoute.delete("/deleteticket", async (req, res) => {
  const result = await deleteticket(req.body.username);
  console.log(result);
  res.json(result);
});
