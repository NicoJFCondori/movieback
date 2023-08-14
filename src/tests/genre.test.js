const request = require("supertest");
const app = require("../app");

const URL_GENRE = "/api/v1/genres";

const genre = {
  name: "Science Fiction",
};

let genreId;

test("POST -> 'URL_GENRE', should return status code 201 and res.body.name === genre.name", async () => {
  const res = await request(app).post(URL_GENRE).send(genre);
  genreId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genre.name);
});

test("GET -> 'URL_GENRE', should return status code 200 and res.body.toHaveLength === 1", async () => {
  const res = await request(app).get(URL_GENRE);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("GET ONE -> 'URL_GENRE/:id', should return status code 200 and res.body.name === genre.name", async () => {
  const res = await request(app).get(`${URL_GENRE}/${genreId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genre.name);
});

test("PUT -> 'URL_GENRE/:id', should return status code 200 and res.body.name === genreUpdated.name", async () => {
  const genreUpdated = {
    name: "Comedy",
  };

  const res = await request(app)
    .put(`${URL_GENRE}/${genreId}`)
    .send(genreUpdated);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genreUpdated.name);
});

test("DELETE -> 'URL_GENRE/:id', should return status code 204", async () => {
  const res = await request(app).delete(`${URL_GENRE}/${genreId}`);

  expect(res.status).toBe(204);
});