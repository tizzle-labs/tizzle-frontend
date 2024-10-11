'use client';

const Footer = () => {
  return (
    <div className="mx-40 mt-10 mb-5 bg-gray-950">
      <div className="flex items-center justify-between text-center">
        <div className="text-left">
          <p className="font-bold text-4xl">Tizzle</p>
          <p className="font-thin w-80">
            Interactions, ask questions, and explore further with your
            personalized AI agent for a more immersive experience.
          </p>
        </div>
        <div className="text-right">
          <p>Whitepaper</p>
        </div>
      </div>
      <div className="text-center mt-10 border-t-[1px] pt-2">
        <p className="font-extralight">&#169; 2024 Tizzle</p>
      </div>
    </div>
  );
};

export default Footer;
