import Loan from "@/domain/loanManagement/loan"
import LoanModel from "@/infrastructure/models/loanModel"

interface LoanRepositoryInterface {
    create(loan: Loan): Promise<LoanModel>
    getById(loanId: string): Promise<LoanModel | null>
    getAll(): Promise<LoanModel[]>
}

export default LoanRepositoryInterface
