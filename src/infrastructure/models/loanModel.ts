interface LoanModel {
    id?: string
    memberId: string
    materialId: string
    dueDate: Date
    returned: boolean
}

export default LoanModel
