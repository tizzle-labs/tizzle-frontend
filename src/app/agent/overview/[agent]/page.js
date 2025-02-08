'use client';

import Footer from '@tizzle-fe/components/common/footer/Footer';
import Navbar from '@tizzle-fe/components/common/navbar/Navbar';
import Agent3DOverview from '@tizzle-fe/components/overview/Agent3DOverview';
import { AVAILABLE_AGENT_V2 } from '@tizzle-fe/constants/agent';
import {
  ALL_AGENT_DATA,
  SPECIALIZATION_ICON,
} from '@tizzle-fe/constants/agentOverview';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

function AgentOverviewPage({ params }) {
  const { agent } = useParams();
  const router = useRouter();

  if (!AVAILABLE_AGENT_V2.includes(agent)) {
    return;
  }

  const AGENT_DATA = ALL_AGENT_DATA[agent];

  const onClickChat = () => {
    router.push(`/agent/chat/${agent}`);
  };

  return (
    <>
      <Navbar />

      <div>
        <div className="relative md:-mt-24">
          <Image
            src={AGENT_DATA.herobg}
            alt="bg-home"
            width={1200}
            height={800}
            className="rounded-lg w-screen max-h-[80vh] object-cover object-top"
          />
          <h1 className="mx-4 font-bold text-3xl md:text-6xl absolute text-center whitespace-pre-line bottom-4 inset-x-0">
            {AGENT_DATA.hero}
          </h1>
        </div>
        <div className="container mx-auto">
          <div className="mx-4 text-center md:mx-auto mt-4 mb-8">
            <p className="font-extralight md:whitespace-pre-line">
              {AGENT_DATA.subhero}
            </p>
            <button
              onClick={onClickChat}
              className="bg-blue-400 px-4 py-2 mt-6"
            >
              {AGENT_DATA.ctaText}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto mb-12 py-12">
        <div className="max-w-4xl mx-4 md:mx-auto md:grid grid-cols-3 gap-8">
          <div className="col-span-1 mb-6 min-h-[50vh]">
            <Agent3DOverview agent={agent} />
          </div>
          <div className="col-span-2 my-auto">
            <p className="font-extralight mb-4">{`Ideal for: ${AGENT_DATA.ideal}`}</p>
            <p className="italic font-extralight mb-8">
              {AGENT_DATA.speciality}
            </p>
            <div className="flex gap-3 mb-8">
              {AGENT_DATA.skills.map(skill => (
                <div
                  key={skill}
                  className="rounded-full px-4 py-1.5 bg-[#181229]"
                >
                  <p className="text-sm font-bold">{skill}</p>
                </div>
              ))}
            </div>
            {/* <div className="grid grid-cols-6 gap-6 md:gap-8">
              <div className="bg-white h-full w-full aspect-square" />
              <div className="bg-white h-full w-full aspect-square" />
              <div className="bg-white h-full w-full aspect-square" />
              <div className="bg-white h-full w-full aspect-square" />
            </div> */}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="container mx-auto py-12 relative my-12 rounded-xl overflow-hidden">
          <Image
            src="/assets/background/specializationbg.png"
            alt="bg-specialization"
            fill="cover"
            className="rounded-lg w-screen max-h-[80vh] object-cover object-top -z-10"
          />
          <h2 className="text-center font-bold text-xl mb-6 capitalize">{`${agent}'s Specialization`}</h2>
          <div className="max-w-4xl mx-4 md:mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {AGENT_DATA.specialization.map((spec, idx) => (
              <div key={idx} className="text-center p-2 rounded-lg">
                <div className="flex justify-center mb-3">
                  {SPECIALIZATION_ICON[idx].icon}
                </div>
                <h3 className="font-bold">{spec.title}</h3>
                <p className="font-extralight text-sm">{spec.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-4 md:m-auto pt-8 grid grid-cols-1 md:grid-cols-2">
          <div>
            <p className="font-semibold">{`Stay Calm, Confident, and Connected`}</p>
            <p className="font-extralight text-sm">{AGENT_DATA.ctaDesc}</p>
          </div>
          <div className="mt-8 md:mt-0 md:flex justify-end items-center">
            <button
              onClick={onClickChat}
              className="bg-blue-400 font-semibold px-8 py-2 h-fit"
            >
              {AGENT_DATA.ctaText}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AgentOverviewPage;
