const expect = require('expect')
const request = require('supertest')
const { app } = require('../server')

describe("GET /api/departments", () => {
    it("Should a success on request", (done) => {
        request(app)
        .get("/api/departments")
        .expect(200)
        .end(done)
    })

    it("Should return all departments", (done) => {
        request(app)
        .get("/api/departments")
        .expect(res => {
            expect(res.body.departments)
        })
        .end(done)
    })
})

describe("DELETE /api/departments/:id", () => {

    it("Should return 400 on failed delete as unauthorized", (done) => {
        const idToDelete = 6
        request(app)
        .delete(`/api/departments/${idToDelete}`)
        .expect(400)
        .expect(res => {
            expect(res.body.errors)
        }).end(done)
    })
})

describe("POST /api/departments/:id", () => {

    it("Should return 400 on creation attempt as unauthorized", (done) => {
        const newDepartment = {
            department : "Finance",
            description : "All of your finance queries can be handled by us",
            isSelectable: 1
        }

        request(app)
        .post(`/api/departments/`)
        .send(newDepartment)
        .expect(400)
        .expect(res => {
            expect(res.body.errors)
        }).end(done)
    })
})

describe("POST /api/departments/:id", () => {

    it("Should return 400 on modification attempt as unauthorized", (done) => {
        const idToModify = 3

        const updatedDepartment = {
            id : idToModify,
            newDepartment : "My new department",
            newDescription : "This is our new department that will help us grow.",
            isSelectable : 1
        }

        request(app)
        .post(`/api/departments/${idToModify}`)
        .send(updatedDepartment)
        .expect(400)
        .expect(res => {
            expect(res.body.errors)
        }).end(done)
    })
})