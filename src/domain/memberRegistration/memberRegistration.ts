import EmailAlreadyRegisteredByAnotherMemberError from "./erros/emailAlreadyRegisteredByAnotherMember"
import EmailAlreadyRegisteredError from "./erros/emailAlreadyRegisteredError"
import MemberNotFoundError from "./erros/memberNotFound"
import Member from "./members"
import MemberInterface from "./membersInterface"

class MemberRegistration {
    private members: Member[]

    constructor(members: Member[]) {
        this.members = members
    }

    registerMember(member: Member): MemberInterface {
        if (this.isEmailAlreadyRegistered(member.email)) {
            throw new EmailAlreadyRegisteredError()
        }
        this.members.push(member)
        return member
    }

    updateMember(memberId: string, updatedMember: Member): MemberInterface {
        const index = this.findMemberIndexById(memberId)
        if (index === -1) {
            throw new MemberNotFoundError()
        }
        if (this.isEmailAlreadyRegistered(updatedMember.email, memberId)) {
            throw new EmailAlreadyRegisteredByAnotherMemberError()
        }
        this.members[index] = { ...this.members[index], ...updatedMember }
        return this.members[index]
    }

    deleteMember(memberId: string): MemberInterface {
        const index = this.findMemberIndexById(memberId)
        if (index === -1) {
            throw new MemberNotFoundError()
        }
        const member = this.members[index]
        this.members.splice(index, 1)
        return member
    }

    getMemberById(memberId: string): MemberInterface | undefined {
        return this.members.find((member) => member.id === memberId)
    }

    getMembers(): MemberInterface[] {
        return this.members
    }

    private isEmailAlreadyRegistered(
        email: string,
        memberId?: string,
    ): boolean {
        return this.members.some(
            (member) => member.email === email && member.id !== memberId,
        )
    }

    private findMemberIndexById(memberId: string): number {
        return this.members.findIndex((member) => member.id === memberId)
    }
}

export default MemberRegistration