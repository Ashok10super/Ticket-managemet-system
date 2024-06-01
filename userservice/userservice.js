import {
  TicketModel,
  ActivateTicketdbconnection,
} from "../TicketService/TicketModel.js";
import {
  agentmodel,
  ActivateAgentdbconnection,
} from "../Agent service/Agentmodel.js";
import { generateAgentId } from "../Agent service/helper.js";
import { json } from "express";

//creating a ticket for the user
export async function createTicket(username, issue) {
  const tickedid = generateAgentId();
  const freeagent = await findAgent();
  const ticket = new TicketModel({
    username: username,
    issue: issue,
    TicketId: tickedid,
    AgentId: freeagent.agentId,
    status: "open",
    feedback: "",
  });
  try {
    await ActivateTicketdbconnection().then(async () => {
      await ticket.save().then(() => {
        console.log("successfully saved");
      });
    });
    //await ticket.save();
    return "Ticket raised successfully";
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteticket(username) {
  try {
    return await findtickettodelete(username);
  } catch (error) {
    return error;
  }
}
export async function getticketstatus(ticketid) {
  try {
    return await findticketstatus(ticketid);
  } catch (error) {
    return error;
  }
}
async function findtickettodelete(username) {
  try {
    await ActivateTicketdbconnection();
    const deleteddata = await TicketModel.findOneAndDelete({
      username: username,
    });
    if (deleteddata == null) {
      return "sorry no tickets found on this username " + username;
    } else {
      //console.log(deleteddata);
      return deleteddata;
    }
  } catch (error) {
    return error;
  }
}

async function findAgent() {
  try {
    await ActivateAgentdbconnection();
    const agent = await agentmodel.findOne({ agentStatus: "free" });
    await agentmodel.findOneAndUpdate({agentId:agent.agentId},{agentStatus:"busy"})
    return agent;
  } catch (error) {
    return error;
  }
}
async function findticketstatus(ticketid) {
  try {
    await ActivateTicketdbconnection();
    const ticketstatus = await TicketModel.findOne({ TicketId: ticketid });
    //console.log(ticketstatus);
    if (ticketstatus === null) {
      return "Sorry No Tickets Found";
    } else {
      //console.log(ticketstatus.status);
      if (ticketstatus.status === "open") {
        return "Sorry " +ticketstatus.username + " your Ticket is open it will be resolved soon";
      } else {
        return "Ticket is resolved";
      }
    }
  } catch (error) {
    return error;
  }
}
