import MemberInterface from "./membersInterface"

class Member implements MemberInterface {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly address: string,
        public readonly email: string,
    ) {}
}

export default Member
