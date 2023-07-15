import { v4 } from "uuid"
import MaterialAlreadyOnLoanError from "./errors/materialAlreadyOnLoanError"
import LoanNotFoundException from "./errors/loanNotFoundError"
import LoanAlreadyReturnedError from "./errors/loanAlreadyReturnedError"
import Loan from "./loan"

class LoanManagement {
    private loans: Loan[]

    constructor(loans: Loan[]) {
        this.loans = loans
    }

    getLoans(): Loan[] {
        return this.loans
    }

    loanMaterial(memberId: string, materialId: string, dueDate: Date): Loan {
        const existingLoan = this.findActiveLoanByMaterialId(materialId)
        if (existingLoan) {
            throw new MaterialAlreadyOnLoanError()
        }

        const loan: Loan = {
            id: this.generateLoanId(),
            memberId,
            materialId,
            dueDate,
            returned: false,
        }

        this.loans.push(loan)
        return loan
    }

    returnMaterial(loanId: string): Loan {
        const loan = this.findLoanById(loanId)
        if (!loan) {
            throw new LoanNotFoundException()
        }

        if (loan.returned) {
            throw new LoanAlreadyReturnedError()
        }

        loan.returned = true
        return loan
    }

    findActiveLoanByMaterialId(materialId: string): Loan | undefined {
        return this.loans.find(
            (loan) => loan.materialId === materialId && !loan.returned,
        )
    }

    findLoanById(loanId: string): Loan | undefined {
        return this.loans.find((loan) => loan.id === loanId)
    }

    private generateLoanId(): string {
        return v4()
    }
}

export default LoanManagement
