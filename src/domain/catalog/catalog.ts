import { ObjectId } from "mongodb"
import MaterialNotFound from "./errors/materialNotFound"
import Material from "./material"

class Catalog {
    private materials: Material[]

    constructor(materials: Material[]) {
        this.materials = materials
    }

    getMaterials(): Material[] {
        return this.materials
    }

    addMaterial(material: Material): Material {
        const newMaterial: Material = {
            id: this.getId(),
            title: material.title,
            author: material.author,
            type: material.type,
        }

        this.materials.push(newMaterial)
        return newMaterial
    }

    removeMaterial(materialId: string): Material {
        const index = this.findMaterialIndexById(materialId)
        if (index === -1) {
            throw new MaterialNotFound()
        }
        const material = this.materials[index]
        this.materials.splice(index, 1)
        return material
    }

    findMaterialById(materialId: string): Material | undefined {
        return this.materials.find((material) => material.id === materialId)
    }

    findMaterialsByType(type: string): Material[] {
        return this.materials.filter((material) => material.type === type)
    }

    findMaterialsByTitle(title: string): Material[] {
        const searchTitle = title.toLowerCase()
        return this.materials.filter((material) =>
            material.title.toLowerCase().includes(searchTitle),
        )
    }

    findMaterialsByAuthor(author: string): Material[] {
        const searchAuthor = author.toLowerCase()
        return this.materials.filter((material) =>
            material.author.toLowerCase().includes(searchAuthor),
        )
    }

    sortMaterialsByTitle(): Material[] {
        return this.materials
            .slice()
            .sort((a, b) => a.title.localeCompare(b.title))
    }

    sortMaterialsByAuthor(): Material[] {
        return this.materials
            .slice()
            .sort((a, b) => a.author.localeCompare(b.author))
    }

    private getId(): string {
        return new ObjectId().toHexString()
    }

    private findMaterialIndexById(materialId: string): number {
        return this.materials.findIndex(
            (material) => material.id === materialId,
        )
    }
}

export default Catalog
