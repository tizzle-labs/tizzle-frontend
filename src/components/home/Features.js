import Image from 'next/image';

const Features = () => {
  return (
    <div className="py-16 max-w-5xl mx-auto">
      <h1 className="text-center text-4xl mb-8 font-extrabold text-white">
        Features
      </h1>
      <div className="grid md:grid-cols-9 md:grid-rows-4 gap-4">
        <div className="md:col-span-5 row-span-4 md:h-80 rounded-xl overflow-hidden p-4 flex flex-col justify-between relative">
          <Image
            src="/assets/feature/feature1.png"
            fill
            alt="aa"
            className="object-cover -z-10"
          />
          <h3 className="font-semibold text-xl mb-4">
            Diverse Crew Personalities
          </h3>
          <p className="font-light text-sm">
            Each of our AI crew is an expert in specific task. They offers a
            distinct personality, ensuring you&apos;ll find a perfect companion
            for your journey.
          </p>
        </div>
        <div className="md:col-span-4 row-span-2 p-4 flex flex-col justify-between rounded-xl overflow-hidden relative">
          <Image
            src="/assets/feature/feature2.png"
            fill
            alt="aa"
            className="object-cover -z-10"
          />
          <h3 className="font-semibold text-xl mb-4">
            Interactive Chat Interface
          </h3>
          <p className="font-light text-sm">
            Engage in real face to face conversations with all of our crew. Each
            interaction is a new adventure and experience
          </p>
        </div>
        <div className="md:col-span-4 row-span-2 p-4 flex flex-col justify-between rounded-xl relative">
          <Image
            src="/assets/feature/feature3.png"
            fill
            alt="aa"
            className="object-cover -z-10 overflow-hidden rounded-xl"
          />
          <Image
            src="/assets/feature/comingsoon.png"
            height={35}
            width={120}
            alt="aa"
            className="absolute -top-4 -right-4 select-none"
          />
          <h3 className="font-semibold text-xl mb-4">Social media presence</h3>
          <p className="font-light text-sm">
            Their persona not only limited to the app, but also you can interact
            through their social media
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
