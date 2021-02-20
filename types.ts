import { DefaultCtx, SessionContext } from "blitz"
import { SimpleRolesIsAuthorized } from "@blitzjs/server"
import { user, Role } from "db"

// Note: You should switch to Postgres and then use a DB enum for role type
// export type Role = "ADMIN" | "ORGANIZATION_OWNER" | "PROJECT_OWNER" | "PROJECT_MANAGER" | "COLLABORATOR" | "GUEST_VIEW"

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: user["id"]
      role: user["roles"]
    }
  }
}
