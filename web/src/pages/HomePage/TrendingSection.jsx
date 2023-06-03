import TrendingCard from "./TrendingCard";

const TrendingSection = () => {
  return (
    <>
      <h2 className="section-container mb-4 text-center md:text-start lg:mb-10">
        Trending Properties
      </h2>
      <TrendingCard flexDirection={"md:flex-row"} />

      <TrendingCard flexDirection={"md:flex-row-reverse"} />
    </>
  );
};

export default TrendingSection;
