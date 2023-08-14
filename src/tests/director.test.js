const request = require("supertest");
const app = require("../app");

const URL_DIRECTOR = "/api/v1/directors";

const director = {
  firstname: "Taika",
  lastname: "Cohen",
  nationality: "New Zeland",
  image:
    "https://media.vandalsports.com/i/640x360/6-2023/20236192829_1.jpg",
  birthday: "1975-08-16",
};

let directorId;

test("POST -> 'URL_DIRECTOR', should return status code 201 and res.body.firstname === director.firstname", async () => {
  const res = await request(app).post(URL_DIRECTOR).send(director);
  directorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstname).toBe(director.firstname);
});

test("GET -> 'URL_DIRECTOR', should return status code 200 and res.body.toHaveLength === 1", async () => {
  const res = await request(app).get(URL_DIRECTOR);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("GET ONE -> 'URL_DIRECTOR/:id', should return status code 200 and res.body.firstname === director.firstname", async () => {
  const res = await request(app).get(`${URL_DIRECTOR}/${directorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstname).toBe(director.firstname);
});

test("PUT -> 'URL_DIRECTOR/:id', should return status code 200 and res.body.firstname === directorUpdated.firstname", async () => {
  const directorUpdated = {
    firstname: "Peter",
    lastname: "Jackson",
    nationality: "New Zeland",
    image:
      "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSu-g3gMxEFoSp1yNLc-EiyP0eWoNQ4wUC8vu-bE037lTykKFsS-hORroMmSaOex2UH",
    birthday: "1961-10-31",
  };

  const res = await request(app)
    .put(`${URL_DIRECTOR}/${directorId}`)
    .send(directorUpdated);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstname).toBe(directorUpdated.firstname);
});

test("DELETE -> 'URL_DIRECTOR/:id', should return status code 204", async () => {
  const res = await request(app).delete(`${URL_DIRECTOR}/${directorId}`);

  expect(res.status).toBe(204);
});