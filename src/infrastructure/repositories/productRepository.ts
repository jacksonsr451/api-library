import ProductRepositoryInterface from "@/application/interfaces/productRepositoryInterface"
import Product from "@/domain/stockManagement/product"
import { Collection, Db, ObjectId } from "mongodb"
import ProductModel from "../models/productModel"

class ProductRepository implements ProductRepositoryInterface {
    private collection: Collection<ProductModel>

    constructor(db: Db) {
        this.collection = db.collection<ProductModel>("members")
    }

    async create(product: Product): Promise<ProductModel> {
        const result = await this.collection.insertOne(product)
        return { ...product, _id: result.insertedId } as ProductModel
    }

    async update(product: Product): Promise<ProductModel | null> {
        const filter = { _id: new ObjectId(product.id) }
        const update = { $set: product }
        const result = await this.collection.findOneAndUpdate(filter, update)
        return result.value
    }

    async get(id: string): Promise<ProductModel | null> {
        return this.collection.findOne({ _id: new ObjectId(id) })
    }

    getAll(): Promise<ProductModel[]> {
        return this.collection.find().toArray()
    }
}

export default ProductRepository
