import { userRoute } from "./userservice/usersroute.js";
import { agentroute } from "./Agent service/agentroute.js";
import express from 'express'
const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hit')
})
app.use('/user',userRoute)

app.use('/agent',agentroute)


app.listen(5000,()=>{console.log('server is running');})
