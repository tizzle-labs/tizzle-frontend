'use client';

import useStore from '@tizzle-fe/stores/userStore';
import Navbar from '@tizzle-fe/components/common/navbar/Navbar';
import { HeroAkira, HeroBale, HeroCortez } from '@tizzle-fe/components/agent';
import Footer from '@tizzle-fe/components/common/footer/Footer';
import Crew from '@tizzle-fe/components/home/Crew';
import Hero from '@tizzle-fe/components/home/Hero';
import Features from '@tizzle-fe/components/home/Features';

export default function Home() {
  const selectedAgent = useStore(state => state.selectedAgent);

  const renderAgent = () => {
    switch (selectedAgent) {
      case 'cortez':
        return <HeroCortez />;
      case 'akira':
        return <HeroAkira />;
      default:
        return <HeroBale />;
    }
  };

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
