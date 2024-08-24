import app from './server'
import request from 'supertest'

describe("API Tests", () => {
    it("GET - /dictionary", async () => {
        const {body} = await request(app).get("/dictionary")
        expect(body.length).toEqual(3)
    })
}) 