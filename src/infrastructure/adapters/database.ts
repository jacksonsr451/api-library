import { MongoClient, Db } from "mongodb"

class Database {
    private static url: string = process.env.MONGODB_URL ?? ""
    private static dbName: string = process.env.MONGODB_DB_NAME ?? ""
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

    public static getDatabase(): Db {
        return this.db
    }

    public static async close(): Promise<void> {
        await this.client.close()
        console.log("Conexão com o MongoDB fechada.")
    }
}

export default Database