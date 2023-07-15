// import { v4 } from "uuid"
import { Db, Collection, ObjectId } from "mongodb"
import Database from "@/infrastructure/adapters/database"
import LoanModel from "@/infrastructure/models/loanModel"
import LoanRepository from "@/infrastructure/repositories/loanRepository"
import Loan from "@/domain/loanManagement/loan"

describe("LoanRepository", () => {
    let db: Db
    let collection: Collection<LoanModel>
    let loanRepository: LoanRepository

    beforeAll(async () => {
        db = await Database.getDatabase()
        loanRepository = new LoanRepository(db)
        collection = db.collection<LoanModel>("loans")
    })

    afterAll(async () => {
        await Database.close()
    })

    afterEach(async () => {
        await collection.deleteMany({})
    })

    describe("create", () => {
        it("should create a new loan", async () => {
            const loan: Loan = {
                id: new ObjectId().toHexString(),
                memberId: "member-id-1",
                materialId: "material-id-1",
                dueDate: new Date(),
                returned: false,
            }

            const createdLoan: LoanModel = await loanRepository.create(loan)

            expect(createdLoan.id).toBeDefined()
            expect(createdLoan.id).toBe(loan.id)
            expect(createdLoan.memberId).toBe(loan.memberId)
            expect(createdLoan.materialId).toBe(loan.materialId)
            expect(createdLoan.dueDate).toEqual(loan.dueDate)
            expect(createdLoan.returned).toBe(loan.returned)
        })
    })

    describe("getById", () => {
        it("should return a loan by ID", async () => {
            const loan: Loan = {
                id: new ObjectId().toHexString(),
                memberId: "member-id-1",
                materialId: "material-id-1",
                dueDate: new Date(),
                returned: false,
            }

            const createdLoan: LoanModel = await loanRepository.create(loan)

            expect(createdLoan?.id).toEqual(loan.id)
            expect(createdLoan?.memberId).toEqual(loan.memberId)
            expect(createdLoan?.materialId).toEqual(loan.materialId)
            expect(createdLoan?.dueDate).toEqual(loan.dueDate)
            expect(createdLoan?.returned).toEqual(loan.returned)
        })

        it("should return null for non-existent loan ID", async () => {
            const nonExistentLoanId: string = new ObjectId().toHexString()

            const fetchedLoan: LoanModel | null = await loanRepository.getById(
                nonExistentLoanId,
            )

            expect(fetchedLoan).toBeNull()
        })
    })

    describe("getAll", () => {
        it("should return all loans", async () => {
            const loans: Loan[] = [
                {
                    id: "loan-id-1",
                    memberId: "member-id-1",
                    materialId: "material-id-1",
                    dueDate: new Date(),
                    returned: false,
                },
                {
                    id: "loan-id-2",
                    memberId: "member-id-2",
                    materialId: "material-id-2",
                    dueDate: new Date(),
                    returned: true,
                },
                {
                    id: "loan-id-3",
                    memberId: "member-id-3",
                    materialId: "material-id-3",
                    dueDate: new Date(),
                    returned: false,
                },
            ]

            await collection.insertMany(loans)

            const fetchedLoans: LoanModel[] = await loanRepository.getAll()

            expect(fetchedLoans).toHaveLength(loans.length)
            expect(fetchedLoans).toEqual(
                expect.arrayContaining(
                    loans.map((loan) => expect.objectContaining(loan)),
                ),
            )
        })

        it("should return an empty array if no loans exist", async () => {
            const fetchedLoans: LoanModel[] = await loanRepository.getAll()

            expect(fetchedLoans).toHaveLength(0)
            expect(fetchedLoans).toEqual([])
        })
    })
})
