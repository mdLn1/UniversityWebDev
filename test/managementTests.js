const expect = require('expect')
const request = require('supertest')
const { app } = require('../server')

const config = require("config");
const token = config.get("test_token");


describe("POST /api/management/update-user/:userId", () => {

    it("Test whether or not users can be managed by admin", (done) => {
        request(app)
        .post(`/api/management/update-user/${2}`)
        .set({"x-auth-token": token})
        .send({
           name: "GabrielTest",
           email: "gc8298r@gre.ac.uk",
           roleId: 3,
           departmentId: 2,
           userId: 2 
        })
        .expect(200)
    })

    it("Test whether or not an unauthenticated user can make changes to users", (done) => {
        request(app)
        .post(`/api/management/update-user/${2}`)
        .send({
           name: "GabrielTest",
           email: "gc8298r@gre.ac.uk",
           roleId: 3,
           departmentId: 2,
           userId: 2 
        })
        .expect(400)
        .expect(res => {
            console.log(res.body);
        })
    })
})

