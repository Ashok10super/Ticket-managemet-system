import express from 'express'
import { Ticketupdate, createAgent } from './agentService.js';
const app = express();
export const agentroute = express.Router()
agentroute.post('/registration',async(req,res)=>{
const result = await createAgent(req.body.agentname)
console.log(result);
   res.send(result)
})
agentroute.put('/statusupdate/:agentid',async(req,res)=>{
   console.log('hi');
     res.json(await Ticketupdate(req.params.agentid,req.body.status))
})

