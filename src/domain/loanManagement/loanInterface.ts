interface LoanInterface {
    readonly id: string
    readonly memberId: string
    readonly materialId: string
    readonly dueDate: Date
    returned: boolean
}

export default LoanInterface
