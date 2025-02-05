import Navbar from '@tizzle-fe/components/common/navbar/Navbar';
import Footer from '@tizzle-fe/components/common/footer/Footer';
import Crew from '@tizzle-fe/components/home/Crew';
import Hero from '@tizzle-fe/components/home/Hero';
import Features from '@tizzle-fe/components/home/Features';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <Hero />
        <Crew />
        <Features />
      </div>
      <Footer />
    </>
  );
}
