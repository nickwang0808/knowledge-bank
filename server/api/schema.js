const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("useFindAndModify", false);

const connectionStatus = () =>
  console.log("connection State: ", mongoose.connection.readyState);

mongoose.connection.on("connected", () => connectionStatus());
mongoose.connection.on("disconnected", () => connectionStatus());

const knowledgeSchema = new Schema({
  title: { type: String, required: true },
  body: String,
  author: String,
  date: { type: String, default: Date.now },
});

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const knowledgeModel = mongoose.model("knowledge", knowledgeSchema);
const UserModel = mongoose.model("user", UserSchema);

module.exports.knowledgeModel = knowledgeModel;
module.exports.UserModel = UserModel;
