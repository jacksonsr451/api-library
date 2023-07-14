import Material from "@/domain/catalog/material"
import MaterialModel from "@/infrastructure/models/materialModel"

interface MaterialRepositoryInterface {
    show(): Promise<MaterialModel[]>
    create(material: Material): Promise<MaterialModel>
    delete(materialId: string): Promise<boolean>
}

export default MaterialRepositoryInterface
