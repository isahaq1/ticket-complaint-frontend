
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/login");
  return null; // This will never render because of the redirect
}
