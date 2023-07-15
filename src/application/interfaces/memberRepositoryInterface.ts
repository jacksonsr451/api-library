import Member from "@/domain/memberRegistration/members"
import MemberModel from "@/infrastructure/models/memberModel"

interface MemberRepositoryInterface {
    create(member: Member): Promise<MemberModel>
    update(member: Member): Promise<MemberModel | null>
    delete(id: string): Promise<boolean>
    get(id: string): Promise<MemberModel | null>
    getAll(): Promise<MemberModel[]>
}

export default MemberRepositoryInterface
