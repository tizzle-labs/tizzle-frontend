import Footer from '@tizzle-fe/components/common/footer/Footer';
import Navbar from '@tizzle-fe/components/common/navbar/Navbar';
import AgentOverview from '@tizzle-fe/components/overview/AgentOverview';

async function AgentOverviewPage({ params }) {
  const agent = (await params).agent;

  return (
    <>
      <Navbar />
      <AgentOverview />
      <Footer />
    </>
  );
}

export default AgentOverviewPage;
