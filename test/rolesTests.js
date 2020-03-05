const expect = require('expect')
const request = require('supertest')
const { app } = require('../server')

const config = require("config");
const token = config.get("test_token");

describe("GET /api/roles", () => {
    it("Should return all roles", (done) => {
        request(app)
        .get("/api/roles")
        .expect(200)
        .expect(res => {
            expect(res.body)
        }).end(done)
    })
})

describe("POST /api/roles", () => {
    it("Should create a new role", (done) => {
  
        request(app)
        .post("/api/roles")
        .set({"x-auth-token" : token})
        .send({
            role: `Test${Math.floor(Math.random() * 1000 + 1)} Manager`,
            description: "Lab assistant in testing",
            isSelectable: 1
        })
        .expect(201)
        .expect(res => {
            expect(res.body)
        }).end(done)
    })

    it("Should create a new role", (done) => {
  
        request(app)
        .post("/api/roles")
        .send({
            role: `Test${Math.floor(Math.random() * 1000 + 1)} Manager`,
            description: "Lab assistant in testing",
            isSelectable: 1
        })
        .expect(400)
        .expect(res => {
            expect(res.body)
        }).end(done)
    })
})

describe("POST /api/roles/:id", () => {
    it("Test whether a roles details can be updated", (done) => {

        request(app)
        .post(`/api/roles/${16}`)
        .set({"x-auth-token" : token})
        .send({
            newRole: "ModifiedOldRole",
            newDescription: "Changed the description of an old role, this is a test.",
            isSelectable: 1
        })
        .expect(200)
        .expect(res => {
            expect(res.body).toBe({"success": "Role successfully updated" })
        }).end(done)
    })

    it("Test if an unauth user can update an idea", (done) => {
        request(app)
        .post(`/api/roles/${16}`)
        .send({
            newRole: "ModifiedOldRole",
            newDescription: "Changed the description of an old role, this is a test.",
            isSelectable: 1
        })
        .expect(400)
        .end(done)
    })
})

describe("DELETE /api/roles/:id", () => {
    it("Test whether or not an idea can be deleted", (done) => {

        request(app)
        .delete(`/api/roles/${20}`)
        .set({"x-auth-token" : token})
        .expect(200)
        .end(done)
    })

    it("Test if an unauth user can delete an idea", (done) => {
        request(app)
        .delete(`/api/roles/${22}`)
        .expect(400)
        .end(done)
    })
})