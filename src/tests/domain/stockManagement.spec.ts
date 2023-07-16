import ProductAlreadyExistsInStockError from "@/domain/stockManagement/errors/productAlreadyExistsInStockError"
import ProductNotFoundInStockError from "@/domain/stockManagement/errors/productNotFoundInStockError"
import Product from "@/domain/stockManagement/product"
import StockManagement from "@/domain/stockManagement/stockManagement"

describe("StockManagement", () => {
    let stockManagement: StockManagement
    let products: Product[]

    beforeEach(() => {
        products = [
            { id: "1", name: "Product 1", quantity: 10, price: 9.99 },
            { id: "2", name: "Product 2", quantity: 5, price: 19.99 },
        ]
        stockManagement = new StockManagement(products)
    })

    it("should add a product to the stock", () => {
        const product: Product = {
            name: "Product 3",
            quantity: 3,
            price: 14.99,
        }

        const addedProduct = stockManagement.addProduct(product)

        expect(addedProduct.id).toBeDefined()
        expect(addedProduct.name).toEqual(product.name)
        expect(addedProduct.quantity).toEqual(product.quantity)
        expect(addedProduct.price).toEqual(product.price)

        const updatedStock = stockManagement.getProducts()
        expect(updatedStock.length).toBe(products.length)
    })

    it("should throw an error when adding a product that already exists in the stock", () => {
        const product: Product = {
            id: "1",
            name: "Product 1",
            quantity: 10,
            price: 9.99,
        }

        expect(() => stockManagement.addProduct(product)).toThrowError(
            ProductAlreadyExistsInStockError,
        )
    })

    it("should remove a product from the stock", () => {
        const productId = "1"

        stockManagement.removeProduct(productId)

        const updatedStock = stockManagement.getProducts()
        expect(updatedStock.length).toBe(products.length)
        expect(updatedStock[0]).toEqual(products[0])
    })

    it("should throw an error when removing a non-existing product from the stock", () => {
        const productId = "3"

        expect(() => stockManagement.removeProduct(productId)).toThrowError(
            ProductNotFoundInStockError,
        )
    })

    it("should update the quantity of a product in the stock", () => {
        const productId = "1"
        const newQuantity = 20

        stockManagement.updateProductQuantity(productId, newQuantity)

        const updatedProduct = stockManagement.getProductById(productId)
        expect(updatedProduct?.quantity).toBe(newQuantity)
    })

    it("should throw an error when updating the quantity of a non-existing product in the stock", () => {
        const productId = "3"
        const newQuantity = 20

        expect(() =>
            stockManagement.updateProductQuantity(productId, newQuantity),
        ).toThrowError(ProductNotFoundInStockError)
    })

    it("should update the price of a product in the stock", () => {
        const productId = "1"
        const newPrice = 14.99

        stockManagement.updateProductPrice(productId, newPrice)

        const updatedProduct = stockManagement.getProductById(productId)
        expect(updatedProduct?.price).toBe(newPrice)
    })

    it("should throw an error when updating the price of a non-existing product in the stock", () => {
        const productId = "3"
        const newPrice = 14.99

        expect(() =>
            stockManagement.updateProductPrice(productId, newPrice),
        ).toThrowError(ProductNotFoundInStockError)
    })

    it("should get a product by ID", () => {
        const productId = "1"

        const foundProduct = stockManagement.getProductById(productId)

        expect(foundProduct).toEqual(products[0])
    })

    it("should return undefined when getting a non-existing product by ID", () => {
        const productId = "3"

        const foundProduct = stockManagement.getProductById(productId)

        expect(foundProduct).toBeUndefined()
    })

    it("should get all products from the stock", () => {
        const allProducts = stockManagement.getProducts()

        expect(allProducts).toEqual(products)
    })
})
