class LoanAlreadyReturnedError extends Error {
    constructor() {
        super("Loan already returned.")
        this.name = "LoanAlreadyReturnedError"
    }
}

export default LoanAlreadyReturnedError
