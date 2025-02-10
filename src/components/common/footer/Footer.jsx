'use client';

const Footer = () => {
  return (
    <footer className="mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:justify-between text-center md:text-left gap-6 md:gap-0">
          <div>
            <p className="font-bold text-3xl md:text-4xl">Tizzle</p>
            <p className="font-thin md:w-80 text-sm px-4 md:px-0">
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
          <p className="font-extralight text-sm">
            &#169; {new Date().getFullYear()} Tizzle Labs
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
