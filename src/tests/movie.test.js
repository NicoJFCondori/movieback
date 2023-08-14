require("../models");
const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

const URL_MOVIE = "/api/v1/movies";

const movie = {
  name: "Thor",
  image:
    "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/a/a0/Thor_-_Portada_Ingl%C3%A9s.png/revision/latest?cb=20191029194705&path-prefix=es",
  synopsis:
    "In the present of Winters Past.",
  releaseYear: "2011",
};
let movieId;

test("POST -> 'URL_MOVIE', should return status code 201 and res.body.name === movie.name", async () => {
  const res = await request(app).post(URL_MOVIE).send(movie);
  movieId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test("GET -> 'URL_MOVIE', should return status code 200 and res.body.toHaveLength === 1", async () => {
  const res = await request(app).get(URL_MOVIE);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);

  expect(res.body[0].genres).toBeDefined();
  expect(res.body[0].genres).toHaveLength(0);

  expect(res.body[0].actors).toBeDefined();
  expect(res.body[0].actors).toHaveLength(0);

  expect(res.body[0].directors).toBeDefined();
  expect(res.body[0].directors).toHaveLength(0);
});

test("GET ONE -> 'URL_MOVIE/:id', should return status code 200 and res.body.name === movie.name", async () => {
  const res = await request(app).get(`${URL_MOVIE}/${movieId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test("PUT -> 'URL_MOVIE/:id', should return status code 200 and res.body.name === movieUpdated.name", async () => {
  const movieUpdated = {
    name: "The Lord of Ring",
    image:
      "https://i.blogs.es/535dc3/el-senor-de-los-anillos-y-el-hobbit/1366_2000.jpeg",
    synopsis:
      "Set in Middle-earth, it tells the story of the Dark Lord Sauron, who is searching for the One Ring, which has ended up in the possession of the hobbit Frodo Baggins (Elijah Wood).",
    releaseYear: "2001",
  };
  const res = await request(app)
    .put(`${URL_MOVIE}/${movieId}`)
    .send(movieUpdated);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movieUpdated.name);
});

test("POST -> 'URL_MOVIE/:id/actors', should return status code 200 and res.body.toHaveLength === 1", async () => {
    const actor = {
        firstname: "Christopher",
        lastname: "Hemsworth",
        nationality: "Australia",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Chris_Hemsworth_by_Gage_Skidmore.jpg/",
        birthday: "1983-08-11",
      };

  const createActor = await Actor.create(actor);

  const res = await request(app)
    .post(`${URL_MOVIE}/${movieId}/actors`)
    .send([createActor.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(createActor.id);

  await createActor.destroy();
});

test("POST -> 'URL_MOVIE/:id/directors', should return status code 200 and res.body.toHaveLength === 1", async () => {
    const director = {
        firstname: "Taika",
        lastname: "Cohen",
        nationality: "New Zeland",
        image:
          "https://media.vandalsports.com/i/640x360/6-2023/20236192829_1.jpg",
        birthday: "1975-08-16",
      };
  const createDirector = await Director.create(director);

  const res = await request(app)
    .post(`${URL_MOVIE}/${movieId}/directors`)
    .send([createDirector.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(createDirector.id);

  await createDirector.destroy();
});

test("POST -> 'URL_MOVIE/:id/genres', should return status code 200 and res.body.toHaveLength === 1", async () => {
  const genre = {
    name: "Science fiction",
  };

  const createGenre = await Genre.create(genre);

  const res = await request(app)
    .post(`${URL_MOVIE}/${movieId}/genres`)
    .send([createGenre.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(createGenre.id);

  await createGenre.destroy();
});

test("DELETE -> 'URL_MOVIE/:id', should return status code 204", async () => {
  const res = await request(app).delete(`${URL_MOVIE}/${movieId}`);

  expect(res.status).toBe(204);
});