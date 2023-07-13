import ProductAlreadyExistsInStockError from "./errors/productAlreadyExistsInStockError"
import ProductNotFoundInStockError from "./errors/productNotFoundInStockError"
import ProductInterface from "./productInterface"

class StockManagement {
    private stock: ProductInterface[]

    constructor(stock: ProductInterface[]) {
        this.stock = stock
    }

    addProduct(product: ProductInterface): ProductInterface {
        if (this.isProductAlreadyExists(product.id)) {
            throw new ProductAlreadyExistsInStockError()
        }
        this.stock.push(product)
        return product
    }

    removeProduct(productId: string): ProductInterface {
        const index = this.findProductIndexById(productId)
        if (index === -1) {
            throw new ProductNotFoundInStockError()
        }
        const product = this.stock[index]
        this.stock.splice(index, 1)
        return product
    }

    updateProductQuantity(
        productId: string,
        quantity: number,
    ): ProductInterface {
        const product = this.findProductById(productId)
        if (!product) {
            throw new ProductNotFoundInStockError()
        }
        product.quantity = quantity
        return product
    }

    updateProductPrice(productId: string, price: number): ProductInterface {
        const product = this.findProductById(productId)
        if (!product) {
            throw new ProductNotFoundInStockError()
        }
        product.price = price
        return product
    }

    getProductById(productId: string): ProductInterface | undefined {
        return this.stock.find((product) => product.id === productId)
    }

    getProducts(): ProductInterface[] {
        return this.stock
    }

    private isProductAlreadyExists(productId: string): boolean {
        return this.stock.some((product) => product.id === productId)
    }

    private findProductIndexById(productId: string): number {
        return this.stock.findIndex((product) => product.id === productId)
    }

    private findProductById(productId: string): ProductInterface | undefined {
        return this.stock.find((product) => product.id === productId)
    }
}

export default StockManagement
