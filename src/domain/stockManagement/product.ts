import ProductInterface from "./productInterface"

class Product implements ProductInterface {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public quantity: number,
        public price: number,
    ) {}
}

export default Product
