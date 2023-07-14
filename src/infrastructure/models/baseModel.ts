import { Model } from "mongoose"

abstract class BaseModel extends Model {
    id?: string
}

export default BaseModel
