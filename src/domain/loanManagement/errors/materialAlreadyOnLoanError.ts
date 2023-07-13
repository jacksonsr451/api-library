class MaterialAlreadyOnLoanError extends Error {
    constructor() {
        super("Material already on loan.")
        this.name = "MaterialAlreadyOnLoanError"
    }
}

export default MaterialAlreadyOnLoanError
