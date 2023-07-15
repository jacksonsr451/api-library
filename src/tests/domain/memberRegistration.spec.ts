import MemberRegistration from "@/domain/memberRegistration/memberRegistration"
import Member from "@/domain/memberRegistration/members"
import { ObjectId } from "mongodb"

describe("MemberRegistration", () => {
    let memberRegistration: MemberRegistration

    beforeEach(() => {
        memberRegistration = new MemberRegistration([])
    })

    it("should register a member", () => {
        const member: Member = {
            name: "John Doe",
            address: "123 Main St",
            email: "john@example.com",
        }

        const result = memberRegistration.registerMember(member)

        expect(result.id).toBeDefined()
        expect(result.name).toBe(member.name)
        expect(result.address).toBe(member.address)
        expect(result.email).toBe(member.email)
    })

    it("should throw an error when registering a member with an existing email", () => {
        const memberId1 = new ObjectId().toHexString()
        const memberId2 = new ObjectId().toHexString()
        const member1: Member = {
            id: memberId1,
            name: "John Doe",
            address: "123 Main St",
            email: "john@example.com",
        }

        const member2: Member = {
            id: memberId2,
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
            name: "John Doe",
            address: "123 Main St",
            email: "john@example.com",
        }

        const data = memberRegistration.registerMember(member)

        const updatedMember: Member = {
            id: data.id,
            name: "John Smith",
            address: "456 Elm St",
            email: "john@example.com",
        }

        memberRegistration.updateMember(updatedMember.id ?? "", updatedMember)

        const updatedMembers = memberRegistration.getMembers()
        expect(updatedMembers.length).toBe(1)
        expect(updatedMembers[0]).toEqual(updatedMember)
    })

    it("should throw an error when updating a non-existing member", () => {
        const member: Member = {
            id: new ObjectId().toHexString(),
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
            name: "John Doe",
            address: "123 Main St",
            email: "john@example.com",
        }

        const member2: Member = {
            name: "Jane Smith",
            address: "456 Elm St",
            email: "jane@example.com",
        }

        const memberSaved1 = memberRegistration.registerMember(member1)
        memberRegistration.registerMember(member2)

        const updatedMember: Member = {
            id: memberSaved1.id,
            name: "John Smith",
            address: "789 Oak St",
            email: "jane@example.com",
        }

        expect(() =>
            memberRegistration.updateMember(
                memberSaved1.id ?? "",
                updatedMember,
            ),
        ).toThrowError("Email already registered by another member.")
    })

    it("should delete a member", () => {
        const member: Member = {
            name: "John Doe",
            address: "123 Main St",
            email: "john@example.com",
        }

        const memberSaved = memberRegistration.registerMember(member)

        memberRegistration.deleteMember(memberSaved.id ?? "")

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
            name: "John Doe",
            address: "123 Main St",
            email: "john@example.com",
        }

        const memberSaved = memberRegistration.registerMember(member)

        const retrievedMember = memberRegistration.getMemberById(
            memberSaved.id ?? "",
        )

        expect(retrievedMember).toBeDefined()
    })

    it("should return undefined when getting a non-existing member by ID", () => {
        const retrievedMember = memberRegistration.getMemberById("1")
        expect(retrievedMember).toBeUndefined()
    })
})
