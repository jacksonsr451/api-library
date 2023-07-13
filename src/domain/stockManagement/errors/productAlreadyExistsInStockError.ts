class ProductAlreadyExistsInStockError extends Error {
    constructor() {
        super("Product already exists in stock.")
        this.name = "ProductAlreadyExistsInStockError"
    }
}

export default ProductAlreadyExistsInStockError
