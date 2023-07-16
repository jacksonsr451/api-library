import Member from "@/domain/memberRegistration/members"
import Database from "@/infrastructure/adapters/database"
import MemberModel from "@/infrastructure/models/memberModel"
import MemberRepository from "@/infrastructure/repositories/memberRepository"
import { Collection, Db, ObjectId } from "mongodb"

describe("MaterialRepository", () => {
    let db: Db
    let collection: Collection<MemberModel>
    let memberRepository: MemberRepository

    beforeAll(async () => {
        db = await Database.getDatabase()
        collection = db.collection<MemberModel>("members")
        memberRepository = new MemberRepository(db)
    })

    afterAll(async () => {
        await collection.deleteMany({})
        await Database.close()
    })

    afterEach(async () => {
        await collection.deleteMany({})
    })

    describe("create", () => {
        it("should be create a new member", async () => {
            const member: Member = {
                id: new ObjectId().toHexString(),
                name: "Member 1",
                address: "Address 1",
                email: "email@email.com",
            }

            const createdMember = await memberRepository.create(member)

            expect(createdMember.id).toBeDefined()
            expect(createdMember.id).toBe(member.id)
            expect(createdMember.name).toBe(member.name)
            expect(createdMember.address).toBe(member.address)
            expect(createdMember.email).toEqual(member.email)
        })
    })

    describe("update", () => {
        it("should update a member by ID", async () => {
            const member: MemberModel = {
                id: new ObjectId().toHexString(),
                name: "John Doe",
                address: "Address 1",
                email: "john.doe@example.com",
            }

            const createdMember = await collection.insertOne(member)

            const updatedMember: MemberModel | null =
                await memberRepository.update({
                    id: createdMember.insertedId.toHexString(),
                    name: "John Doe Updated",
                    address: "address-updated",
                    email: "john.doe.updated@example.com",
                })

            expect(updatedMember?.id).toEqual(
                createdMember.insertedId.toHexString(),
            )
            expect(updatedMember?.name).toEqual("John Doe Updated")
            expect(updatedMember?.address).toEqual("address-updated")
            expect(updatedMember?.email).toEqual("john.doe.updated@example.com")
        })

        it("should return null when trying to update a non-existent member", async () => {
            const updatedMember: MemberModel | null =
                await memberRepository.update({
                    id: new ObjectId().toHexString(),
                    name: "John Doe Updated",
                    address: "35",
                    email: "john.doe.updated@example.com",
                })

            expect(updatedMember).toBeNull()
        })
    })

    describe("show", () => {
        it("should show a member by ID", async () => {
            const members: Member[] = [
                {
                    id: new ObjectId().toHexString(),
                    name: "John Doe",
                    address: "Address 1",
                    email: "email1@email.com",
                },
                {
                    id: new ObjectId().toHexString(),
                    name: "John Doe 2",
                    address: "Address 2",
                    email: "email2@email.com",
                },
            ]

            await collection.insertMany(members)

            const showMember: MemberModel[] = await memberRepository.show()

            expect(showMember.length).toEqual(2)
        })

        it("should return an empty array when there are no members", async () => {
            const fetchedMembers: MemberModel[] = await memberRepository.show()

            expect(fetchedMembers).toEqual([])
        })
    })

    describe("get", () => {
        it("should get a member by ID", async () => {
            const member: Member = {
                id: new ObjectId().toHexString(),
                name: "John Doe",
                address: "Address 1",
                email: "email1@email.com",
            }

            const insertedUser = await collection.insertOne(member)

            const result = await memberRepository.get(
                insertedUser.insertedId.toHexString(),
            )

            expect(result).toEqual(member)
        })
    })

    describe("delete", () => {
        it("should delete a member by ID", async () => {
            const member: Member = {
                id: new ObjectId().toHexString(),
                name: "John Doe",
                address: "Address 1",
                email: "email@email.com",
            }

            const insertedUser = await collection.insertOne(member)

            const result = await memberRepository.delete(
                insertedUser.insertedId.toHexString(),
            )

            expect(result).toBe(true)
        })
    })
})
