import { ObjectId, Collection, Db, InsertOneResult } from "mongodb"
import MaterialRepository from "@/infrastructure/repositories/materialRepository"
import Material from "@/domain/catalog/material"
import MaterialModel from "@/infrastructure/models/materialModel"
import Database from "@/infrastructure/adapters/database"

describe("MaterialRepository", () => {
    let db: Db
    let collection: Collection<MaterialModel>
    let materialRepository: MaterialRepository

    beforeAll(async () => {
        db = await Database.getDatabase()
        collection = db.collection<MaterialModel>("materials")
        materialRepository = new MaterialRepository(db)
    })

    afterAll(async () => {
        await collection.deleteMany({})
        await Database.close()
    })

    afterEach(async () => {
        await collection.deleteMany({})
    })

    describe("create", () => {
        it("should create a new material", async () => {
            const material: Material = {
                id: new ObjectId().toHexString(),
                title: "Material 1",
                author: "Author 1",
                type: "Type 1",
            }

            const createdMaterial: MaterialModel =
                await materialRepository.create(material)

            expect(createdMaterial.id).toBeDefined()
            expect(createdMaterial.id).toBe(material.id)
            expect(createdMaterial.title).toBe(material.title)
            expect(createdMaterial.author).toBe(material.author)
            expect(createdMaterial.type).toEqual(material.type)
        })
    })

    describe("show", () => {
        it("should return all materials", async () => {
            const materials: Material[] = [
                {
                    id: new ObjectId().toHexString(),
                    title: "Material 1",
                    author: "Author 1",
                    type: "Type 1",
                },
                {
                    id: new ObjectId().toHexString(),
                    title: "Material 2",
                    author: "Author 2",
                    type: "Type 2",
                },
            ]

            await collection.insertMany(materials)

            const fetchedMaterials: MaterialModel[] =
                await materialRepository.show()

            expect(fetchedMaterials).toHaveLength(materials.length)
            expect(fetchedMaterials).toEqual(
                expect.arrayContaining(
                    materials.map((material) =>
                        expect.objectContaining(material),
                    ),
                ),
            )
        })

        it("should return an empty array when there are no materials", async () => {
            const fetchedMaterials: MaterialModel[] =
                await materialRepository.show()

            expect(fetchedMaterials).toEqual([])
        })
    })

    describe("delete", () => {
        it("should delete a material by ID", async () => {
            const materialId: string = new ObjectId().toHexString()
            const material: Material = {
                id: materialId,
                title: "Material 1",
                author: "Author 1",
                type: "Type 1",
            }

            const createdMaterial: InsertOneResult<MaterialModel> =
                await collection.insertOne(material)

            const deleted: boolean = await materialRepository.delete(
                createdMaterial.insertedId.toHexString(),
            )

            expect(deleted).toBe(true)

            const fetchedMaterial: MaterialModel | null =
                await collection.findOne({
                    _id: new ObjectId(materialId),
                })

            expect(fetchedMaterial).toBeNull()
        })

        it("should return false when trying to delete a non-existent material", async () => {
            const deleted: boolean = await materialRepository.delete(
                new ObjectId().toHexString(),
            )

            expect(deleted).toBe(false)
        })
    })
})
