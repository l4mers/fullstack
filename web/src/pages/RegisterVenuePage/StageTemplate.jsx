const StageTemplate = ({ stageNumber, stageTitle }) => {
  return (
    <div className="mb-6 flex items-center justify-center gap-2">
      <div className="h-10 w-10 rounded-full border-2 border-primaryRed text-center font-josefinsSans text-lg font-medium leading-10 text-primaryRed">
        {stageNumber}
      </div>
      <h2>{stageTitle}</h2>
    </div>
  );
};

export default StageTemplate;
