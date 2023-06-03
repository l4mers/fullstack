import { useState } from "react";

const ProfileMain = () => {
  const [currentView, setCurrentView] = useState("Overview");

  const handleTabClick = (view) => {
    setCurrentView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case "Overview":
        return <div>Overview Content</div>;
      case "Memories":
        return <div>Memories Content</div>;
      case "Venues":
        return <div>Venues Content</div>;
      default:
        return <div>Overview Content</div>;
    }
  };

  const getTabClassName = (view) => {
    const baseClasses =
      "w-1/3 select-none md:w-[174px] text-center text-sm md:text-xl leading-[33px] md:leading-[42px] h-[33px] md:h-[42px] font-medium cursor-pointer rounded-t-lg";
    const activeClasses = "bg-background";
    const notActiveClasses =
      "bg-inactiveBackground inactiveShadowBtn hover:text-gray-600 hover:bg-gray-200";

    return `${baseClasses} ${
      currentView === view ? activeClasses : notActiveClasses
    }`;
  };

  return (
    <div className="relative md:mx-auto md:w-11/12 md:max-w-[1440px] md:px-0">
      <div className="absolute flex w-full -translate-y-[31px] justify-between md:-translate-y-[41px] md:justify-start">
        <div
          className={getTabClassName("Overview")}
          onClick={() => handleTabClick("Overview")}
        >
          Overview
        </div>
        <div
          className={getTabClassName("Memories")}
          onClick={() => handleTabClick("Memories")}
        >
          Memories
        </div>
        <div
          className={getTabClassName("Venues")}
          onClick={() => handleTabClick("Venues")}
        >
          Venues
        </div>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default ProfileMain;
