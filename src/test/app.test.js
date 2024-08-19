import request from "supertest";
import { app } from "../app";
import { generateAccessToken } from "../services/loginServices";

// const TOKEN_SECRET = generateAccessToken(process.env.USER);
const TOKEN_SECRET =
  "eyJhbGciOiJIUzI1NiJ9.QW1lbGllLk9Db25uZWxsQGdtYWlsLmNvbQ.m6nxIfQ26KS3fCA4rF32mVnG8NQ2vfIjkqq9ZWYd640";

describe("RUTA /", () => {
  it("Comprueba que su estatus es 200", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });

  it("Comprueba que contiene el texto API HOTEL MIRANDA", async () => {
    const response = await request(app).get("/");
    expect(response.text).toContain("API HOTEL MIRANDA");
  });
});

describe("RUTA /ROOMS", () => {
  it("Comprueba que el status sea 200", async () => {
    const response = await request(app)
      .get("/rooms")
      .set("Authorization", "Bearer " + TOKEN_SECRET);
    expect(response.status).toBe(200);
  });

  it("Comprueba que devuelve un array ", async () => {
    const response = await request(app)
      .get("/rooms")
      .set("Authorization", "Bearer " + TOKEN_SECRET);
    expect(response.body).toEqual(expect.objectContaining({}));
  });

  it("Comprueba que cada objeto tiene las propiedades indicadas", async () => {
    const response = await request(app)
      .get("/rooms")
      .set("Authorization", "Bearer " + TOKEN_SECRET);
    response.body.rooms.forEach((rooms) => {
      expect(rooms).toMatchObject({
        Foto: expect.any(String),
        BedType: expect.any(String),
        Status: expect.any(String),
        Rate: expect.any(Number),
        Amenities: expect.any(Array),
      });
    });
  });

  it("Comprueba que el token es invalido", async () => {
    const response = await request(app)
      .get("/rooms")
      .set("Authorization", "Bearer " + " ");
    expect(response.status).toBe(401);
  });
});

describe("RUTA /ROOMS/ID", () => {
  it("Comprueba que el status sea 200", async () => {
    const response = await request(app)
      .get("/rooms/66a4ce17801e8ecbf9b4aa6d")
      .set("Authorization", "Bearer " + TOKEN_SECRET);
    expect(response.status).toBe(200);
  });

  it("Comprueba que el objeto room tiene las propiedades indicadas", async () => {
    const response = await request(app)
      .get("/rooms/66a4ce17801e8ecbf9b4aa6d")
      .set("Authorization", "Bearer " + TOKEN_SECRET);

    // Asegúrate de que la respuesta es un objeto que contiene un objeto llamado 'room'
    expect(response.body).toHaveProperty("room");

    // Comprueba que el objeto 'room' tiene las propiedades indicadas
    expect(response.body.room).toEqual(
      expect.objectContaining({
        Foto: expect.any(String),
        BedType: expect.any(String),
        Status: expect.any(String),
        Rate: expect.any(Number),
        Amenities: expect.any(Array),
      })
    );
  });
});
