const expect = require('expect')
const request = require('supertest')
const { app } = require('../server')

const config = require("config");
const token = config.get("test_token");

describe("GET /api/ideas", () => {

    it("Should return 200 on success", (done) => {
        request(app)
        .get(`/api/ideas`)
        .expect(200)
        .end(done)
    })

    it("Should return a JSON object full of ideas", (done) => {
        request(app)
        .get(`/api/ideas`)
        .expect(200)
        .expect(res => {
            expect(res.body.ideas).toBeDefined()
        })
        .end(done)
    })
})

describe("GET /api/ideas/:id", () => {

    it("Should return 200", (done) => {
        const idToFetch = 6
        request(app)
        .get(`/api/ideas/${idToFetch}`)
        .expect(200)
        .end(done)
    })

    it("Should return a defined JSON object as a result", (done) => {
        const idToFetch = 6
        request(app)
        .get(`/api/ideas/${idToFetch}`)
        .expect(res => {
            expect(res.body[0]).toBeDefined()
        }).end(done)
    })
})

describe("GET /api/ideas/:id/increase-views", () => {

    it("Should return 204 once the view of an idea has been increased", (done) => {
        const ideaToIncrease = 2

        request(app)
        .get(`/api/ideas/${ideaToIncrease}/increase-views`)
        .expect(204)
        .end(done)
    })
})

describe("POST /api/ideas", () => {
    it("Should create a new idea and return 201", (done) => {
        testIdea = {
            description: "My test idea that is being added by me",
            categoryId: 1,
            isAnonymous: 1,
            title: "Testing"
        }

        request(app)
        .post("/api/ideas")
        .set({"x-auth-token" : token})
        .send(testIdea)
        .expect(201)
        .expect( res => {
            expect(res.body)
        })
        .end(done)
    })

    it("Testing whether or not a description with less than 15 character is accepted", (done) => {
        testIdea = {
            description: "My test idea",
            categoryId: 1,
            isAnonymous: 1,
            title: "Testing"
        }

        request(app)
        .post("/api/ideas")
        .set({"x-auth-token" : token})
        .send(testIdea)
        .expect(400)
        .expect( res => {
            expect(res.body.errors[0]).toBe("Description must contain at least 15 characters")
        })
        .end(done)
    })

    it("Testing whether or not a title with less than 5 character is accepted", (done) => {
        testIdea = {
            description: "My test idea is appropriate",
            categoryId: 1,
            isAnonymous: 1,
            title: "Test"
        }

        request(app)
        .post("/api/ideas")
        .set({"x-auth-token" : token})
        .send(testIdea)
        .expect(400)
        .expect( res => {
            expect(res.body.errors[0]).toBe("Title must be at least 5 characters long")
        })
        .end(done)
    })

    it("Testing whether or non int passed as a category id is accepted", (done) => {
        testIdea = {
            description: "My test idea is appropriate",
            categoryId: "test",
            isAnonymous: 1,
            title: "Tester"
        }

        request(app)
        .post("/api/ideas")
        .set({"x-auth-token" : token})
        .send(testIdea)
        .expect(400)
        .expect( res => {
            expect(res.body.errors[0]).toBe("Category Id must be an integer")
        })
        .end(done)
    })

    it("Test if an unauthenticated user can add an idea ", (done) => {
        testIdea = {
            description: "My test idea is appropriate",
            categoryId: 1,
            isAnonymous: 1,
            title: "Test"
        }

        request(app)
        .post("/api/ideas")
        .send(testIdea)
        .expect(400)
        .expect( res => {
            expect(res.body.errors[0]).toBe("Title must be at least 5 characters long")
        })
        .end(done)
    })
})

