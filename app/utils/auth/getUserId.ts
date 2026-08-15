import { createClient } from "../supabase/server";
import { cookies } from "next/headers";

export default async function getUserId() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
}
