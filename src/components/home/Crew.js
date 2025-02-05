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
      <div className="mx-8 px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white h-96 rounded-xl"></div>
        <div className="bg-white h-96 rounded-xl"></div>
        <div className="bg-white h-96 rounded-xl"></div>
      </div>
    </div>
  );
};

export default Crew;
