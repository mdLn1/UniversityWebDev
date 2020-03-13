const expect = require('expect')
const request = require('supertest')
const { app } = require('../server')

describe("GET /api/stats/HighestRatedIdeas", () => {

    it("Test whether or not Highest rated ideas returns success", (done) => {
        request(app)
        .get("/api/stats/HighestRatedIdeas")
        .expect(200)
        .end(done)
    })
})

describe("GET /api/stats/MostRecentActiveUser", () => {

    it("Test whether or not Most recent active user returns success", (done) => {
        request(app)
        .get("/api/stats/MostRecentActiveUser")
        .expect(200)
        .end(done)
    })
})

describe("GET /api/stats/IdeasPerUser", () => {

    it("Test whether or not Ideas per user route returns success", (done) => {
        request(app)
        .get("/api/stats/IdeasPerUser")
        .expect(200)
        .end(done)
    })
})

describe("GET /api/stats/MostViewedIdeas", () => {

    it("Test whether or not Most viewed ideas route returns success", (done) => {
        request(app)
        .get("/api/stats/MostViewedIdeas")
        .expect(200)
        .end(done)
    })
})

describe("GET /api/stats/MostRecentIdeas", () => {

    it("Test whether or not Most recent ideas route returns success", (done) => {
        request(app)
        .get("/api/stats/MostRecentIdeas")
        .expect(200)
        .end(done)
    })
})

describe("GET /api/stats/UserWithMostComments", () => {

    it("Test whether or not users with most comments route returns success", (done) => {
        request(app)
        .get("/api/stats/UserWithMostComments")
        .expect(200)
        .end(done)
    })
})





