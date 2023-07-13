import LoanInterface from "./loanInterface"

class Loan implements LoanInterface {
    constructor(
        public readonly id: string,
        public readonly memberId: string,
        public readonly materialId: string,
        public readonly dueDate: Date,
        public returned: boolean,
    ) {}
}

export default Loan
