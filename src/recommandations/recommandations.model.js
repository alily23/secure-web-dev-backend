const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  filmType: String,
  filmProducerName: String,
  filmName: String,
  filmDirectorName: String,
  dataSortie: Date,
  resume: String,
  opinion: String,
  note: Number,
});

const Recommandation = mongoose.model("Recommandation", MovieSchema);

module.exports = Recommandation;
