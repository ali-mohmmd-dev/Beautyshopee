import { cmsMetadata } from "@/lib/cms";
import { ContactContent } from "@/features/storefront/components/contact-content";
export async function generateMetadata() {
  return cmsMetadata("contact", { title: "Contact" });
}
export default function Page() {
  return <ContactContent />;
}
