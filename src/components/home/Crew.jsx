import Image from 'next/image';
import Link from 'next/link';

const Crew = () => {
  return (
    <div className="py-16 m-2 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-center text-4xl mb-4 font-extrabold text-white">
          Meet our expert crew
        </h1>
        <p className="font-extralight text-white text-center md:w-1/2 mx-auto">
          {`Tired of boring, predictable AI interactions? We've created a diverse cast of AI agents, each with their own quirks, strengths, and distinctive personalities.`}
        </p>
      </div>
      <div className="md:mx-8 px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="/agent/overview/isaac">
          <div className="bg-black rounded-xl overflow-hidden object-cover">
            <Image
              src="/assets/cards/isaac.png"
              alt="isaac-card"
              width={500}
              height={800}
              className="rounded-lg w-screen object-cover object-top -z-10"
            />
          </div>
        </Link>
        <Link href="/agent/overview/mike">
          <div className="bg-black rounded-xl overflow-hidden object-cover">
            <Image
              src="/assets/cards/mike.png"
              alt="mike-card"
              width={500}
              height={800}
              className="rounded-lg w-screen object-cover object-top -z-10"
            />
          </div>
        </Link>
        <Link href="/agent/overview/jordan">
          <div className="bg-black rounded-xl overflow-hidden object-cover">
            <Image
              src="/assets/cards/jordan.png"
              alt="jordan-card"
              width={500}
              height={800}
              className="rounded-lg w-full -z-10"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Crew;
