import LoanRepositoryInterface from "@/application/interfaces/loanRepositoryInterface"
import Loan from "@/domain/loanManagement/loan"
import LoanModel from "../models/loanModel"
import { Collection, Db, InsertOneResult, ObjectId } from "mongodb"

class LoanRepository implements LoanRepositoryInterface {
    private collection: Collection<LoanModel>

    constructor(db: Db) {
        this.collection = db.collection<LoanModel>("loans")
    }

    async create(loan: Loan): Promise<LoanModel> {
        const result: InsertOneResult<LoanModel> =
            await this.collection.insertOne({
                ...loan,
                _id: new ObjectId(loan.id),
            })
        return { ...loan, _id: result.insertedId } as LoanModel
    }

    getById(loanId: string): Promise<LoanModel | null> {
        return this.collection.findOne({ _id: new ObjectId(loanId) })
    }

    getAll(): Promise<LoanModel[]> {
        return this.collection.find().toArray()
    }
}

export default LoanRepository
