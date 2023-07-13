import MaterialInterface from "./materialInterface"

class Material implements MaterialInterface {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly author: string,
        public readonly type: string,
    ) {}
}

export default Material
