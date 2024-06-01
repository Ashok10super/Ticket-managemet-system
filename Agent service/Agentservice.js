import mongoose from "mongoose";
import { agentmodel, ActivateAgentdbconnection } from "./Agentmodel.js";
import { generateAgentId } from "./helper.js";
import { ActivateTicketdbconnection, TicketModel } from "../TicketService/TicketModel.js";

export async function createAgent(AgentName) {
  let created;
  try {
      let dbconnect = await ActivateAgentdbconnection()
      //console.log(dbconnect);
      if (dbconnect==1) {
          created = await savetodb(AgentName)
          return created
      }
    }catch(error){
      console.log("sorry some technical error occured")
      return error
     
    }}
export async function Ticketupdate(agentid,updatingmsg) {
  try {
    await ActivateAgentdbconnection();
    console.log(agentid,updatingmsg);
    console.log(await agentmodel.findOne({agentId:Number(agentid)}));
   console.log(await agentmodel.findOneAndUpdate({agentId:Number(agentid)},{agentStatus:updatingmsg}))
    return "Status updated successfully"
  } catch (error) {
    return error
  }
}
async function savetodb(AgentName) {
  const agentid = generateAgentId();
  const agent = new agentmodel({
    agentName: AgentName,
    agentId: agentid,
    agentStatus: "free",
  });
  try {
    await agent.save()
    return "Agent successfully registered"
  } catch (error) {
    return "Failed to Register Agent"
  }
 
}
