import Material from "@/domain/catalog/material"
import MaterialModel from "@/infrastructure/models/materialModel"

interface MaterialRepositoryInterface {
    create(material: Material): Promise<MaterialModel>
    delete(materialId: string): Promise<MaterialModel>
}

export default MaterialRepositoryInterface
