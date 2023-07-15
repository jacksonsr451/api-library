import { MongoClient, Db } from "mongodb"

class Database {
    private static url: string =
        process.env.MONGODB_URL ?? "mongodb://127.0.0.1:27017"
    private static dbName: string =
        process.env.MONGODB_DB_NAME ?? "library_tests"
    private static client: MongoClient
    private static db: Db

    public static async connect(): Promise<void> {
        try {
            this.client = await MongoClient.connect(this.url)
            this.db = this.client.db(this.dbName)
            console.log("Conectado ao MongoDB!")
        } catch (error) {
            console.error("Erro ao conectar ao MongoDB:", error)
        }
    }

    public static async getDatabase(): Promise<Db> {
        await this.connect()
        return this.db
    }

    public static async close(): Promise<void> {
        await this.client.close()
        console.log("Conexão com o MongoDB fechada.")
    }
}

export default Database
