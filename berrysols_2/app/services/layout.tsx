import Navbar from "@/components/home/Navbar";
import SimpleFooter from "@/components/home/Footer";

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fffdf9] text-[#171410]">
      <Navbar />
      <div>{children}</div>
      <SimpleFooter />
    </div>
  );
}
