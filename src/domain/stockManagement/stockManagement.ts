import ProductAlreadyExistsInStockError from "./errors/productAlreadyExistsInStockError"
import ProductNotFoundInStockError from "./errors/productNotFoundInStockError"
import Product from "./product"

class StockManagement {
    private stock: Product[]

    constructor(stock: Product[]) {
        this.stock = stock
    }

    addProduct(product: Product): Product {
        if (this.isProductAlreadyExists(product.id)) {
            throw new ProductAlreadyExistsInStockError()
        }
        this.stock.push(product)
        return product
    }

    removeProduct(productId: string): Product {
        const index = this.findProductIndexById(productId)
        if (index === -1) {
            throw new ProductNotFoundInStockError()
        }
        const product = this.stock[index]
        this.stock.splice(index, 1)
        return product
    }

    updateProductQuantity(productId: string, quantity: number): Product {
        const product = this.findProductById(productId)
        if (!product) {
            throw new ProductNotFoundInStockError()
        }
        product.quantity = quantity
        return product
    }

    updateProductPrice(productId: string, price: number): Product {
        const product = this.findProductById(productId)
        if (!product) {
            throw new ProductNotFoundInStockError()
        }
        product.price = price
        return product
    }

    getProductById(productId: string): Product | undefined {
        return this.stock.find((product) => product.id === productId)
    }

    getProducts(): Product[] {
        return this.stock
    }

    private isProductAlreadyExists(productId: string): boolean {
        return this.stock.some((product) => product.id === productId)
    }

    private findProductIndexById(productId: string): number {
        return this.stock.findIndex((product) => product.id === productId)
    }

    private findProductById(productId: string): Product | undefined {
        return this.stock.find((product) => product.id === productId)
    }
}

export default StockManagement
