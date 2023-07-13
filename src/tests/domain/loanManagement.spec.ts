import LoanAlreadyReturnedError from "@/domain/loanManagement/erros/loanAlreadyReturnedError"
import LoanNotFoundException from "@/domain/loanManagement/erros/loanNotFoundError"
import MaterialAlreadyOnLoanError from "@/domain/loanManagement/erros/materialAlreadyOnLoanError"
import LoanInterface from "@/domain/loanManagement/loanInterface"
import LoanManagement from "@/domain/loanManagement/loanManagement"

describe("LoanManagement", () => {
    let loanManagement: LoanManagement
    let loans: LoanInterface[]

    beforeEach(() => {
        loans = [
            {
                id: "1",
                memberId: "member1",
                materialId: "material1",
                dueDate: new Date(),
                returned: false,
            },
        ]
        loanManagement = new LoanManagement(loans)
    })

    it("should loan a material", () => {
        const memberId = "member2"
        const materialId = "material2"
        const dueDate = new Date()

        const loan = loanManagement.loanMaterial(memberId, materialId, dueDate)

        expect(loan).toEqual({
            id: expect.any(String),
            memberId,
            materialId,
            dueDate,
            returned: false,
        })

        const updatedLoans = loanManagement.getLoans()
        expect(updatedLoans.length).toBe(2)
        expect(updatedLoans[1]).toEqual(loan)
    })

    it("should throw an error when loaning a material already on loan", () => {
        const memberId = "member1"
        const materialId = "material1"
        const dueDate = new Date()

        expect(() =>
            loanManagement.loanMaterial(memberId, materialId, dueDate),
        ).toThrowError(MaterialAlreadyOnLoanError)
    })

    it("should return a material", () => {
        const loanId = "1"

        const returnedLoan = loanManagement.returnMaterial(loanId)

        expect(returnedLoan).toEqual({
            id: loanId,
            memberId: "member1",
            materialId: "material1",
            dueDate: expect.any(Date),
            returned: true,
        })

        const updatedLoans = loanManagement.getLoans()
        expect(updatedLoans.length).toBe(1)
        expect(updatedLoans[0]).toEqual(returnedLoan)
    })

    it("should throw an error when returning a non-existing loan", () => {
        const loanId = "2"

        expect(() => loanManagement.returnMaterial(loanId)).toThrowError(
            LoanNotFoundException,
        )
    })

    it("should throw an error when returning an already returned loan", () => {
        const loanId = "1"

        loanManagement.returnMaterial(loanId)

        expect(() => loanManagement.returnMaterial(loanId)).toThrowError(
            LoanAlreadyReturnedError,
        )
    })

    it("should find an active loan by material ID", () => {
        const materialId = "material1"

        const activeLoan = loanManagement.findActiveLoanByMaterialId(materialId)

        expect(activeLoan).toEqual({
            id: "1",
            memberId: "member1",
            materialId: "material1",
            dueDate: expect.any(Date),
            returned: false,
        })
    })

    it("should not find an active loan for a material ID when all loans are returned", () => {
        const materialId = "material2"

        const activeLoan = loanManagement.findActiveLoanByMaterialId(materialId)

        expect(activeLoan).toBeUndefined()
    })

    it("should find a loan by ID", () => {
        const loanId = "1"

        const loan = loanManagement.findLoanById(loanId)

        expect(loan).toEqual({
            id: loanId,
            memberId: "member1",
            materialId: "material1",
            dueDate: expect.any(Date),
            returned: false,
        })
    })

    it("should not find a loan for a non-existing ID", () => {
        const loanId = "2"

        const loan = loanManagement.findLoanById(loanId)

        expect(loan).toBeUndefined()
    })
})
