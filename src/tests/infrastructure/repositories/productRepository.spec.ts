import Product from "@/domain/stockManagement/product"
import Database from "@/infrastructure/adapters/database"
import ProductModel from "@/infrastructure/models/productModel"
import ProductRepository from "@/infrastructure/repositories/productRepository"
import { Collection, Db, ObjectId } from "mongodb"

describe("Productepository", () => {
    let db: Db
    let collection: Collection<ProductModel>
    let productRepository: ProductRepository

    beforeAll(async () => {
        db = await Database.getDatabase()
        collection = db.collection<ProductModel>("products")
        productRepository = new ProductRepository(db)
    })

    afterAll(async () => {
        await collection.deleteMany({})
        await Database.close()
    })

    afterEach(async () => {
        await collection.deleteMany({})
    })

    describe("create", () => {
        it("should be create a new member", async () => {
            const product: Product = {
                id: new ObjectId().toHexString(),
                name: "Product 1",
                quantity: 32,
                price: 50.35,
            }

            const createdMember = await productRepository.create(product)

            expect(createdMember.id).toBeDefined()
            expect(createdMember.id).toBe(product.id)
            expect(createdMember.name).toBe(product.name)
            expect(createdMember.quantity).toBe(product.quantity)
            expect(createdMember.price).toEqual(product.price)
        })
    })

    describe("update", () => {
        it("should update a product by ID", async () => {
            const product: ProductModel = {
                id: new ObjectId().toHexString(),
                name: "Product 1",
                quantity: 32,
                price: 50.35,
            }

            const createdProduct = await collection.insertOne(product)

            const updatedProduct: ProductModel | null =
                await productRepository.update({
                    id: createdProduct.insertedId.toHexString(),
                    name: "Product 1 Updated",
                    quantity: 50,
                    price: 100.35,
                })
            expect(updatedProduct?.id).toEqual(
                createdProduct.insertedId.toHexString(),
            )
            expect(updatedProduct?.name).toEqual("Product 1 Updated")
            expect(updatedProduct?.quantity).toEqual(50)
            expect(updatedProduct?.price).toEqual(100.35)
        })

        it("should return null when trying to update a non-existent product", async () => {
            const updatedMember: ProductModel | null =
                await productRepository.update({
                    id: new ObjectId().toHexString(),
                    name: "Product 1",
                    quantity: 50,
                    price: 100.35,
                })

            expect(updatedMember).toBeNull()
        })
    })

    describe("show", () => {
        it("should show a product by ID", async () => {
            const products: Product[] = [
                {
                    id: new ObjectId().toHexString(),
                    name: "Product 1",
                    quantity: 50,
                    price: 100.35,
                },
                {
                    id: new ObjectId().toHexString(),
                    name: "Product 2",
                    quantity: 50,
                    price: 100.35,
                },
            ]

            await collection.insertMany(products)

            const showProduct: ProductModel[] = await productRepository.show()

            expect(showProduct.length).toEqual(2)
        })

        it("should return an empty array when there are no members", async () => {
            const fetchedMembers: ProductModel[] =
                await productRepository.show()

            expect(fetchedMembers).toEqual([])
        })
    })

    describe("get", () => {
        it("should get a product by ID", async () => {
            const product: Product = {
                id: new ObjectId().toHexString(),
                name: "Product 1",
                quantity: 50,
                price: 100.35,
            }

            const insertedProduct = await collection.insertOne(product)

            const result = await productRepository.get(
                insertedProduct.insertedId.toHexString(),
            )

            expect(result).toEqual(product)
        })
    })
})
