const request = require("supertest");
const app = require("../app");

const URL_ACTOR = "/api/v1/actors";

const actor = {
  firstname: "Christopher",
  lastname: "Hemsworth",
  nationality: "Australia",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Chris_Hemsworth_by_Gage_Skidmore.jpg/",
  birthday: "1983-08-11",
};

let actorId;

test("POST -> 'URL_ACTOR', should return status code 201 and res.body.firstname === actor.firstname", async () => {
  const res = await request(app).post(URL_ACTOR).send(actor);
  actorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstname).toBe(actor.firstname);
});

test("GET -> 'URL_ACTOR', should return status code 200 and res.body.toHaveLength === 1", async () => {
  const res = await request(app).get(URL_ACTOR);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("GET ONE -> 'URL_ACTOR/:id', should return status code 200 and res.body.firstname === actor.firstname", async () => {
  const res = await request(app).get(`${URL_ACTOR}/${actorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstname).toBe(actor.firstname);
});

test("PUT -> 'URL_ACTOR/:id', should return status code 200 and res.body.firstname === actorUpdated.firstname", async () => {
  const actorUpdated = {
    firstname: "Elijah",
    lastname: "Wood",
    nationality: "EE.UU",
    image:
      "https://flxt.tmsimg.com/assets/19046_v9_bb.jpg",
    birthday: "1981-01-28",
  };
  const res = await request(app)
    .put(`${URL_ACTOR}/${actorId}`)
    .send(actorUpdated);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstname).toBe(actorUpdated.firstname);
});

test("DELETE -> 'URL_ACTOR/:id', should return status code 204", async () => {
  const res = await request(app).delete(`${URL_ACTOR}/${actorId}`);

  expect(res.status).toBe(204);
});