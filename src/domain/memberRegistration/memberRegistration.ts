import EmailAlreadyRegisteredByAnotherMemberError from "./errors/emailAlreadyRegisteredByAnotherMember"
import EmailAlreadyRegisteredError from "./errors/emailAlreadyRegisteredError"
import MemberNotFoundError from "./errors/memberNotFound"
import Member from "./members"

class MemberRegistration {
    private members: Member[]

    constructor(members: Member[]) {
        this.members = members
    }

    registerMember(member: Member): Member {
        if (this.isEmailAlreadyRegistered(member.email)) {
            throw new EmailAlreadyRegisteredError()
        }
        this.members.push(member)
        return member
    }

    updateMember(memberId: string, updatedMember: Member): Member {
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

    deleteMember(memberId: string): Member {
        const index = this.findMemberIndexById(memberId)
        if (index === -1) {
            throw new MemberNotFoundError()
        }
        const member = this.members[index]
        this.members.splice(index, 1)
        return member
    }

    getMemberById(memberId: string): Member | undefined {
        return this.members.find((member) => member.id === memberId)
    }

    getMembers(): Member[] {
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
