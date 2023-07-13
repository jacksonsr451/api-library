import MaterialNotFound from "./errors/materialNotFound"
import MaterialInterface from "./materialInterface"

class Catalog {
    private materials: MaterialInterface[]

    constructor(materials: MaterialInterface[]) {
        this.materials = materials
    }

    getMaterials(): MaterialInterface[] {
        return this.materials
    }

    addMaterial(material: MaterialInterface): MaterialInterface {
        this.materials.push(material)
        return material
    }

    removeMaterial(materialId: string): MaterialInterface {
        const index = this.findMaterialIndexById(materialId)
        if (index === -1) {
            throw new MaterialNotFound()
        }
        const material = this.materials[index]
        this.materials.splice(index, 1)
        return material
    }

    findMaterialById(materialId: string): MaterialInterface | undefined {
        return this.materials.find((material) => material.id === materialId)
    }

    findMaterialsByType(type: string): MaterialInterface[] {
        return this.materials.filter((material) => material.type === type)
    }

    findMaterialsByTitle(title: string): MaterialInterface[] {
        const searchTitle = title.toLowerCase()
        return this.materials.filter((material) =>
            material.title.toLowerCase().includes(searchTitle),
        )
    }

    findMaterialsByAuthor(author: string): MaterialInterface[] {
        const searchAuthor = author.toLowerCase()
        return this.materials.filter((material) =>
            material.author.toLowerCase().includes(searchAuthor),
        )
    }

    sortMaterialsByTitle(): MaterialInterface[] {
        return this.materials
            .slice()
            .sort((a, b) => a.title.localeCompare(b.title))
    }

    sortMaterialsByAuthor(): MaterialInterface[] {
        return this.materials
            .slice()
            .sort((a, b) => a.author.localeCompare(b.author))
    }

    private findMaterialIndexById(materialId: string): number {
        return this.materials.findIndex(
            (material) => material.id === materialId,
        )
    }
}

export default Catalog
