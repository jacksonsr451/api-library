import MaterialRepositoryInterface from "@/application/interfaces/materialRepositoryInterface"
import MaterialModel from "../models/materialModel"
import Material from "@/domain/catalog/material"
import { InsertOneResult, Collection, Db, ObjectId } from "mongodb"

class MaterialRepository implements MaterialRepositoryInterface {
    private collection: Collection<MaterialModel>

    constructor(db: Db) {
        this.collection = db.collection<MaterialModel>("materials")
    }

    async show(): Promise<MaterialModel[]> {
        return await this.collection.find().toArray()
    }

    async create(material: Material): Promise<MaterialModel> {
        const result: InsertOneResult<MaterialModel> =
            await this.collection.insertOne({
                ...material,
                _id: new ObjectId(material.id),
            })
        return {
            ...material,
            _id: result.insertedId,
        } as MaterialModel
    }

    async delete(materialId: string): Promise<boolean> {
        const result = await this.collection.deleteOne({
            _id: new ObjectId(materialId),
        })
        return result.deletedCount === 1
    }
}

export default MaterialRepository
