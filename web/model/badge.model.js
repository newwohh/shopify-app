import mongoose from "mongoose";

const BadgeSchema = new mongoose.Schema({
  store: String,
  name: String,
  url: String,
});

const TrustBadge = mongoose.model("TrustBadge", BadgeSchema);

export default TrustBadge;
