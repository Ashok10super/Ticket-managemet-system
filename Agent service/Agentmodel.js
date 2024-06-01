import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  agentName: {
    type: String,
    required: true,
  },
  agentId: {},
  agentStatus: {},
});

export const agentmodel = mongoose.model("Agent", agentSchema);

export async function ActivateAgentdbconnection() {
  try {
        // console.log(mongoose.connection.readyState)    7485036
         if (mongoose.connection.readyState==1) {
         await mongoose.disconnect();
         //console.log(mongoose.connection.readyState);
         await mongoose.connect("mongodb://localhost:27017/Agent")
          //console.log(mongoose.connection.readyState);
          //console.log(mongoose.connection.db.databaseName);
         }
         else{
       await mongoose.connect("mongodb://localhost:27017/Agent").then(

        () => {
         // console.log(mongoose.connection.readyState);
          //console.log(mongoose.connection.db.databaseName)
          console.log("successfully connected agent");
        },
        () => {
          console.log("failed to connect agent");
        }
      );
     
    }
  }
    //console.log("Connected Agent");
    catch (error) {
    console.log(error);
    return error;
  }
  return 1;
}
