import NavbarHome from "./_components/Navbar";
import Section1 from "./_components/Section1";
import Section2 from "./_components/Section2";
import Section3 from "./_components/Section3";
import Section4 from "./_components/Section4";

export default function Home() {
  return (
    <main className="w-full h-full">
      <NavbarHome />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </main>
  );
}
