class ProductNotFoundInStockError extends Error {
    constructor() {
        super("Product not found in stock.")
        this.name = "ProductNotFoundInStockError"
    }
}
export default ProductNotFoundInStockError
