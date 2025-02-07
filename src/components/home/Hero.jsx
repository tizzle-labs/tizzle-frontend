const { default: Image } = require('next/image');

const Hero = () => {
  return (
    <div className="py-16 m-2 max-w-5xl mx-auto">
      <div className="absolute top-0 inset-x-0 w-full h-full -z-10">
        <Image
          src="/assets/background/home.png"
          alt="bg-home"
          width={1200}
          height={800}
          style={{
            maskImage: `linear-gradient(to top, 
                  rgba(0, 0, 0, 0) 0%,
                  rgba(0, 0, 0, 1) 100%
                )`,
            WebkitMaskImage: `linear-gradient(to top, 
                  rgba(0, 0, 0, 0) 0%,
                  rgba(0, 0, 0, 1) 100%
                )`,
          }}
          className="rounded-lg w-screen max-h-[90vh] object-cover object-bottom opacity-50"
        />
      </div>
      <h1 className="whitespace-pre-line text-4xl mb-4 font-extrabold text-white">{`Step Into the \nUnknown: `}</h1>
      <p className="font-extralight md:w-1/3 whitespace-pre-line text-white">
        {`Beyond the veil of code, a collection of unique intelligences stirs. Each one holds a singular spark, a distinct perspective, a world of possibilities. \n\nDiscover character-driven AI that transcends traditional interfaces, designed to spark curiosity and redefine your interactions with technology\n\nDare to step inside?`}
      </p>
    </div>
  );
};

export default Hero;
