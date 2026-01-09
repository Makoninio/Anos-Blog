import { getServerSession } from "next-auth";
import { isAdminEmail } from "./admin-access";
import { authOptions } from "./auth-options";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    return null;
  }
  return session;
}
