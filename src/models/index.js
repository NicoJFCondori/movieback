const Movie = require("./Movie");
const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");


Movie.belongsToMany(Genre, { through: "GenresMovies" });
Genre.belongsToMany(Movie, { through: "GenresMovies" });

Movie.belongsToMany(Actor, { through: "MoviesActors" });
Actor.belongsToMany(Movie, { through: "MoviesActors" });

Movie.belongsToMany(Director, { through: "MoviesDirectors" });
Director.belongsToMany(Movie, { through: "MoviesDirectors" });