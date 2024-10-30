'use client';

const Footer = () => {
  return (
    <div className="mx-4 md:mx-40 mt-10 mb-5 bg-gray-950">
      <div className="flex flex-col md:flex-row items-center md:justify-between text-center md:text-left gap-6 md:gap-0">
        <div>
          <p className="font-bold text-3xl md:text-4xl">Tizzle</p>
          <p className="font-thin md:w-80 px-4 md:px-0">
            Interactions, ask questions, and explore further with your
            personalized AI agent for a more immersive experience.
          </p>
        </div>
        <div className="text-center md:text-right">
          <a href="https://tizzle-labs.gitbook.io/docs" target="_blank">
            Whitepaper
          </a>
        </div>
      </div>
      <div className="text-center mt-10 border-t-[1px] pt-2">
        <p className="font-extralight">&#169; 2024 Tizzle</p>
      </div>
    </div>
  );
};

export default Footer;
