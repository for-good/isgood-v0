import { DefaultCtx, SessionContext, DefaultPublicData } from "blitz"
import { user } from "db"

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }

  export interface PublicData extends DefaultPublicData {
    userId: user["id"]
    fullName: user["fullName"]
    role: user["roles"]
  }
}
