import Header from "@/components/Header";
import HeroExperience from "@/components/HeroExperience";
import InfiniteCanvas from "@/components/InfiniteCanvas";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroExperience />
        <InfiniteCanvas />
      </main>
      <footer className="footer">
        <div className="container">
          <p className="logo-small">Qissa</p>
          <p>Every canvas holds a story. &copy; 2026 Qissa Canvas.</p>
        </div>
      </footer>
    </>
  );
}
