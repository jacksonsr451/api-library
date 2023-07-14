import { MongoClient, Db } from "mongodb"

class Database {
    private static url: string = "mongodb://localhost:27017"
    private static dbName: string = "seu_banco_de_dados"
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
