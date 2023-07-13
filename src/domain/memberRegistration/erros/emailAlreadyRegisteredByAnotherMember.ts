class EmailAlreadyRegisteredByAnotherMemberError extends Error {
    constructor() {
        super("Email already registered by another member.")
        this.name = "EmailAlreadyRegisteredByAnotherMemberError"
    }
}

export default EmailAlreadyRegisteredByAnotherMemberError
