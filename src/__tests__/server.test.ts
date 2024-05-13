import request from "supertest";
import server, {connectDB} from "../server";
import db from '../config/db'

// describe("GET /api", () => {
//     it("should return a list of products", async () => {
//         const response = await request(server).get("/api");
//         expect(response.statusCode).toEqual(200);
//         //expect(response.headers["Content-Type"]).toEqual("application/json");
//         expect(response.body.message).toBe('Hola mundo');
        
//         expect(response.status).not.toEqual(404);

//     })
// })

jest.mock('../config/db')

describe('connectDB', () => {
    it('should connect to the database', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('Hubo un error al conectar a la BD'))
        
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(new Error('Hubo un error al conectar a la BD'))
    })
})