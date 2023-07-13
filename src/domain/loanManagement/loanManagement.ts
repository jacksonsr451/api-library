import { v4 } from "uuid"
import LoanInterface from "./loanInterface"
import MaterialAlreadyOnLoanError from "./erros/materialAlreadyOnLoanError"
import LoanNotFoundException from "./erros/loanNotFoundError"
import LoanAlreadyReturnedError from "./erros/loanAlreadyReturnedError"

class LoanManagement {
    private loans: LoanInterface[]

    constructor(loans: LoanInterface[]) {
        this.loans = loans
    }

    getLoans(): LoanInterface[] {
        return this.loans
    }

    loanMaterial(
        memberId: string,
        materialId: string,
        dueDate: Date,
    ): LoanInterface {
        const existingLoan = this.findActiveLoanByMaterialId(materialId)
        if (existingLoan) {
            throw new MaterialAlreadyOnLoanError()
        }

        const loan: LoanInterface = {
            id: this.generateLoanId(),
            memberId,
            materialId,
            dueDate,
            returned: false,
        }

        this.loans.push(loan)
        return loan
    }

    returnMaterial(loanId: string): LoanInterface {
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

    findActiveLoanByMaterialId(materialId: string): LoanInterface | undefined {
        return this.loans.find(
            (loan) => loan.materialId === materialId && !loan.returned,
        )
    }

    findLoanById(loanId: string): LoanInterface | undefined {
        return this.loans.find((loan) => loan.id === loanId)
    }

    private generateLoanId(): string {
        return v4()
    }
}

export default LoanManagement
