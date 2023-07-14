import BaseModel from "@/infrastructure/models/baseModel"

abstract class BaseRepository<T extends BaseModel> {
    constructor(protected model: T) {}

    abstract show(): Promise<T[]>
}

export default BaseRepository
