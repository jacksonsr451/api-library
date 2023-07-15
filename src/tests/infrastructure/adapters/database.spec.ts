import { MongoClient, Db } from "mongodb"
import Database from "@/infrastructure/adapters/database"

describe("Database", () => {
    let mockClient: MongoClient
    let mockDb: Db

    beforeAll(async () => {
        const mongoUri = "mongodb://127.0.0.1:27017"
        const dbName = "library_tests"

        mockClient = await MongoClient.connect(mongoUri)
        mockDb = mockClient.db(dbName)
        Database.getDatabase = jest.fn(async () => mockDb)
    })

    afterAll(async () => {
        await mockClient.close()
    })

    it("should connect to MongoDB", async () => {
        jest.spyOn(console, "log")
        await Database.connect()
        expect(Database.getDatabase()).toBeDefined()

        await Database.close()
        expect(console.log).toHaveBeenCalledWith(
            "Conexão com o MongoDB fechada.",
        )
    })

    it("should get the database", async () => {
        const result = await Database.getDatabase()
        expect(result).toBe(mockDb)
    })

    it("should close the connection", async () => {
        if (mockClient) {
            await mockClient.close()
            console.log("Conexão com o MongoDB fechada.")
        }
    })
})
