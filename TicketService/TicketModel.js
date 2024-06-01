import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  TicketId: {
    type: String,
  },
  AgentId: {},
  issue: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  feedback: {},
});

export const TicketModel = mongoose.model("ticket", ticketSchema);

export async function ActivateTicketdbconnection() {
  try {
    //console.log(mongoose.connection.readyState);
    //console.log(mongoose.connection.db.databaseName)
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      //console.log(mongoose.connection.readyState);
      await mongoose.connect("mongodb://localhost:27017/Ticketsdb");
      console.log(mongoose.connection.db.databaseName);
    } else {
      const ticetdb = await mongoose.connect(
        "mongodb://localhost:27017/Ticketsdb"
      );
      console.log("Connected Ticketsdb");
      return 1;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}
