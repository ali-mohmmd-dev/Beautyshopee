import { cmsMetadata } from "@/lib/cms";
import { AboutContent } from "@/features/storefront/components/about-content";
export async function generateMetadata() {
  return cmsMetadata("about", { title: "About" });
}
export default function Page() {
  return <AboutContent />;
}
