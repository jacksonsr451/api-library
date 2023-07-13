import Member from "@/domain/memberRegistration/entities/members"
import MemberRegistration from "@/domain/memberRegistration/services/memberRegistration"

describe("MemberRegistration", () => {
    let memberRegistration: MemberRegistration

    beforeEach(() => {
        memberRegistration = new MemberRegistration([])
    })

    it("should register a member", () => {
        const member: Member = {
            id: "1",
            name: "John Doe",
            address: "123 Main St",
            email: "john@example.com",
        }

        memberRegistration.registerMember(member)

        const members = memberRegistration.getMembers()
        expect(members.length).toBe(1)
        expect(members[0]).toEqual(member)
    })

    it("should throw an error when registering a member with an existing email", () => {
        const member1: Member = {
            id: "1",
            name: "John Doe",
            address: "123 Main St",
            email: "john@example.com",
        }

        const member2: Member = {
            id: "2",
            name: "Jane Smith",
            address: "456 Elm St",
            email: "john@example.com",
        }

        memberRegistration.registerMember(member1)

        expect(() => memberRegistration.registerMember(member2)).toThrowError(
            "Email already registered.",
        )
    })

    it("should update a member", () => {
        const member: Member = {
            id: "1",
            name: "John Doe",
            address: "123 Main St",
            email: "john@example.com",
        }

        memberRegistration.registerMember(member)

        const updatedMember: Member = {
            id: "1",
            name: "John Smith",
            address: "456 Elm St",
            email: "john@example.com",
        }

        memberRegistration.updateMember("1", updatedMember)

        const updatedMembers = memberRegistration.getMembers()
        expect(updatedMembers.length).toBe(1)
        expect(updatedMembers[0]).toEqual(updatedMember)
    })

    it("should throw an error when updating a non-existing member", () => {
        const member: Member = {
            id: "1",
            name: "John Doe",
            address: "123 Main St",
            email: "john@example.com",
        }

        expect(() => memberRegistration.updateMember("1", member)).toThrowError(
            "Member not found.",
        )
    })

    it("should throw an error when updating a member with an email already registered by another member", () => {
        const member1: Member = {
            id: "1",
            name: "John Doe",
            address: "123 Main St",
            email: "john@example.com",
        }

        const member2: Member = {
            id: "2",
            name: "Jane Smith",
            address: "456 Elm St",
            email: "jane@example.com",
        }

        memberRegistration.registerMember(member1)
        memberRegistration.registerMember(member2)

        const updatedMember: Member = {
            id: "1",
            name: "John Smith",
            address: "789 Oak St",
            email: "jane@example.com",
        }

        expect(() =>
            memberRegistration.updateMember("1", updatedMember),
        ).toThrowError("Email already registered by another member.")
    })

    it("should delete a member", () => {
        const member: Member = {
            id: "1",
            name: "John Doe",
            address: "123 Main St",
            email: "john@example.com",
        }

        memberRegistration.registerMember(member)

        memberRegistration.deleteMember("1")

        const members = memberRegistration.getMembers()
        expect(members.length).toBe(0)
    })

    it("should throw an error when deleting a non-existing member", () => {
        expect(() => memberRegistration.deleteMember("1")).toThrowError(
            "Member not found.",
        )
    })

    it("should get a member by ID", () => {
        const member: Member = {
            id: "1",
            name: "John Doe",
            address: "123 Main St",
            email: "john@example.com",
        }

        memberRegistration.registerMember(member)

        const retrievedMember = memberRegistration.getMemberById("1")
        expect(retrievedMember).toEqual(member)
    })

    it("should return undefined when getting a non-existing member by ID", () => {
        const retrievedMember = memberRegistration.getMemberById("1")
        expect(retrievedMember).toBeUndefined()
    })
})
