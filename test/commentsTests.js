const expect = require('expect')
const request = require('supertest')
const { app } = require('../server')

const config = require("config");
const token = config.get("test_token");

describe("GET /api/ideas/:ideaId/comments", () => {

    it("Should return 400 as user is unauthorised", (done) => {
        const ideaToFetch = 2;
        request(app)
        .get(`/api/ideas/${ideaToFetch}/comments`)
        .expect(400)
        .end(done)
    })
})

describe("POST /api/ideas/:ideaId/comments", () => {

    it("Should return 400 as user is unauthorised and cannot update idea", (done) => {
        const ideaToUpdate = {
            comment : "I am modifying this comment",
            isAnonymous : 1,
            ideaId : 1,
            commentId : 1
        }

        request(app)
        .post(`/api/ideas/${ideaToUpdate.ideaId}/comments`)
        .send(ideaToUpdate)
        .expect(400)
        .expect(res => {
            expect(res.body)
        }).end(done)
    })
})


describe("POST /api/ideas/:ideaId/comments", () => {

    it("Test if unauthorised user can create a comment", (done) => {
        const commentToCreate = {
            comment : "My first comment on the platform",
            isAnonymous : 1,
            ideaId : 2
        }

        request(app)
        .post(`/api/ideas/${commentToCreate.ideaId}/comments`)
        .send(commentToCreate)
        .expect(400)
        .expect(res => {
            expect(res.body).toBeDefined
        }).end(done)
    })
})


describe("DELETE /api/ideas/:ideaId/comments/:commentId", () => {

    it("Test if unauthorised user can delete a comment", (done) => {
        const ideaToCreate = {
            commentId : 1,
            ideaId : 2
        }

        request(app)
        .delete(`/api/ideas/${ideaToCreate.ideaId}/comments/${ideaToCreate.commentId}`)
        .send(ideaToCreate)
        .expect(400)
        .expect(res => {
            expect(res.body).toBeDefined
        }).end(done)
    })
})
