import BaseModel from "./baseModel"

class MaterialModel extends BaseModel {
    title: string
    author: string
    type: string

    constructor(id: string, title: string, author: string, type: string) {
        super()
        this.id = id
        this.title = title
        this.author = author
        this.type = type
    }
}

export default MaterialModel
