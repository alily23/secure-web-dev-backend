const mongoose = require("mongoose");
require("dotenv").config();

const Recommandation = require("./src/recommandations/recommandations.model");

const Movie = require("./films.json");

function buildMovie(Movie) {
  return {
    filmName: Movie.titre,
    filmType: Movie.type,
    filmProducerName: Movie.producteur,
    filmDirectorName: Movie.realisateur,
    dataSortie: Movie.date_sortie,
    resume: Movie.resume,
    opinion: Movie.opinion,
    note: Movie.note,
  };
}

async function importBulkMovie() {
  const MovieArray = Movie.map((Movie) =>
      buildMovie(Movie)
  );
  await Recommandation.insertMany(MovieArray);
}
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Import script connected to database, starting import.");
  await importBulkMovie();
  console.log("Finished importing.");
}

main();
