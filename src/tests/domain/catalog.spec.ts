import Catalog from "@/domain/catalog/catalog"
import MaterialNotFound from "@/domain/catalog/errors/materialNotFound"
import MaterialInterface from "@/domain/catalog/materialInterface"

describe("Catalog", () => {
    let catalog: Catalog
    let materials: MaterialInterface[]

    beforeEach(() => {
        materials = [
            { id: "1", title: "Book 1", author: "Author 1", type: "Book" },
            { id: "2", title: "Book 2", author: "Author 2", type: "Book" },
            {
                id: "3",
                title: "Magazine 1",
                author: "Author 3",
                type: "Magazine",
            },
        ]
        catalog = new Catalog(materials)
    })

    it("should get all materials from the catalog", () => {
        const allMaterials = catalog.getMaterials()
        expect(allMaterials).toEqual(materials)
    })

    it("should add a material to the catalog", () => {
        const material: MaterialInterface = {
            id: "4",
            title: "Book 3",
            author: "Author 4",
            type: "Book",
        }

        const addedMaterial = catalog.addMaterial(material)

        expect(addedMaterial).toEqual(material)

        const updatedMaterials = catalog.getMaterials()
        expect(updatedMaterials.length).toBe(materials.length)
        expect(updatedMaterials[updatedMaterials.length - 1]).toEqual(material)
    })

    it("should remove a material from the catalog", () => {
        const materialId = "1"

        catalog.removeMaterial(materialId)

        const updatedMaterials = catalog.getMaterials()
        expect(updatedMaterials.length).toBe(2)
        expect(updatedMaterials[0]).toEqual(materials[0])
        expect(updatedMaterials[1]).toEqual(materials[1])
    })

    it("should throw an error when removing a non-existing material", () => {
        const materialId = "4"

        expect(() => catalog.removeMaterial(materialId)).toThrowError(
            MaterialNotFound,
        )
    })

    it("should find a material by ID", () => {
        const materialId = "2"

        const foundMaterial = catalog.findMaterialById(materialId)

        expect(foundMaterial).toEqual(materials[1])
    })

    it("should return undefined when finding a non-existing material by ID", () => {
        const materialId = "4"

        const foundMaterial = catalog.findMaterialById(materialId)

        expect(foundMaterial).toBeUndefined()
    })

    it("should find materials by type", () => {
        const type = "Book"

        const foundMaterials = catalog.findMaterialsByType(type)

        expect(foundMaterials.length).toBe(2)
        expect(foundMaterials[0]).toEqual(materials[0])
        expect(foundMaterials[1]).toEqual(materials[1])
    })

    it("should find materials by title", () => {
        const title = "Book"

        const foundMaterials = catalog.findMaterialsByTitle(title)

        expect(foundMaterials.length).toBe(2)
        expect(foundMaterials[0]).toEqual(materials[0])
        expect(foundMaterials[1]).toEqual(materials[1])
    })

    it("should find materials by author", () => {
        const author = "Author 3"

        const foundMaterials = catalog.findMaterialsByAuthor(author)

        expect(foundMaterials.length).toBe(1)
        expect(foundMaterials[0]).toEqual(materials[2])
    })

    it("should sort materials by title", () => {
        const sortedMaterials = catalog.sortMaterialsByTitle()

        expect(sortedMaterials.length).toBe(3)
        expect(sortedMaterials[0]).toEqual(materials[0])
        expect(sortedMaterials[1]).toEqual(materials[1])
        expect(sortedMaterials[2]).toEqual(materials[2])
    })

    it("should sort materials by author", () => {
        const sortedMaterials = catalog.sortMaterialsByAuthor()

        expect(sortedMaterials.length).toBe(3)
        expect(sortedMaterials[0]).toEqual(materials[0])
        expect(sortedMaterials[1]).toEqual(materials[1])
        expect(sortedMaterials[2]).toEqual(materials[2])
    })
})
