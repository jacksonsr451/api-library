class MemberNotFoundError extends Error {
    constructor() {
        super("Member not found.")
        this.name = "MemberNotFoundError"
    }
}

export default MemberNotFoundError
