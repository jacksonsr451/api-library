import MaterialRepositoryInterface from "@/application/interfaces/materialRepositoryInterface"
import BaseRepository from "./baseRepository"
import MaterialModel from "../models/materialModel"
import Material from "@/domain/catalog/material"

class MaterialRepository
    extends BaseRepository<MaterialModel>
    implements MaterialRepositoryInterface
{
    constructor(protected model: MaterialModel) {
        super(model)
    }

    show(): Promise<MaterialModel[]> {
        return this.model.findAll()
    }

    create(material: Material): Promise<MaterialModel> {
        const data = new MaterialModel(
            material.id,
            material.title,
            material.author,
            material.type,
        )
        return data.save()
    }

    delete(materialId: string): Promise<MaterialModel> {
        return this.model.destroy({
            where: {
                id: materialId,
            },
        })
    }
}

export default MaterialRepository
