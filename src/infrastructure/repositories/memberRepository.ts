import MemberRepositoryInterface from "@/application/interfaces/memberRepositoryInterface"
import MemberModel from "../models/memberModel"
import { Collection, Db, ObjectId } from "mongodb"
import Member from "@/domain/memberRegistration/members"

class MemberRepository implements MemberRepositoryInterface {
    private collection: Collection<MemberModel>

    constructor(db: Db) {
        this.collection = db.collection<MemberModel>("members")
    }

    async create(member: Member): Promise<MemberModel> {
        const result = await this.collection.insertOne({
            ...member,
            _id: new ObjectId(member.id),
        })
        return { ...member, _id: result.insertedId } as MemberModel
    }

    async update(member: Member): Promise<MemberModel | null> {
        const filter = { _id: new ObjectId(member.id) }
        const update = { $set: { ...member } }
        await this.collection.findOneAndUpdate(filter, update)
        return await this.collection.findOne(filter)
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.collection.deleteOne({
            _id: new ObjectId(id),
        })
        return result.deletedCount === 1
    }

    async get(id: string): Promise<MemberModel | null> {
        return this.collection.findOne({ _id: new ObjectId(id) })
    }

    show(): Promise<MemberModel[]> {
        return this.collection.find().toArray()
    }
}

export default MemberRepository
