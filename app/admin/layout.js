import Providers from "@/components/admin/Providers";

export const metadata = {
  robots: { index: false, follow: false }
};

export default function AdminRootLayout({ children }) {
  return <Providers>{children}</Providers>;
}
