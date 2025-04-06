import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const ContactMessage = mongoose.model("ContactMessage", contactSchema);
export default ContactMessage;
