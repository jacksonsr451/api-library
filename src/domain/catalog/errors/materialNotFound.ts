class MaterialNotFound extends Error {
    constructor() {
        super("Material not found.")
        this.name = "MaterialNotFound"
    }
}

export default MaterialNotFound
