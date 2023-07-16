import Product from "@/domain/stockManagement/product"
import ProductModel from "@/infrastructure/models/productModel"

interface ProductRepositoryInterface {
    create(product: Product): Promise<ProductModel>
    update(product: Product): Promise<ProductModel | null>
    get(id: string): Promise<ProductModel | null>
    show(): Promise<ProductModel[]>
}

export default ProductRepositoryInterface
