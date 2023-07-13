class LoanNotFoundException extends Error {
    constructor() {
        super("Loan not found.")
        this.name = "LoanNotFoundException"
    }
}

export default LoanNotFoundException
