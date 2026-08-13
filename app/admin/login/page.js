import { getSettings } from "@/lib/data";
import AdminLoginForm from "./AdminLoginForm";

export default async function AdminLoginPage() {
  const settings = await getSettings();

  return <AdminLoginForm logoUrl={settings.logoUrl} gymName={settings.gymName} />;
}
