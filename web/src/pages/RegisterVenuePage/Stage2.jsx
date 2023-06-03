import StageTemplate from "./StageTemplate";
import CustomInput from "../../components/FormComponents/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { handleValueChange } from "./Stage1";

const Stage2 = () => {
  const dispatch = useDispatch();
  const stageData = useSelector(
    (state) => state.displayedVenueStage.stageData
  ) || { stage2: { title: "", description: "" } };
  console.log("stage2 data", stageData);

  const handleChange = handleValueChange(dispatch, stageData, 2);

  return (
    <div>
      <StageTemplate stageNumber={2} stageTitle={"Title and Description"} />
      <div className="flex flex-col gap-4">
        <CustomInput
          onChange={handleChange}
          labelName="Title"
          name="title"
          type="text"
          value={stageData.stage2.title ? stageData.stage2.title : ""}
        />
        <label
          htmlFor="description"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Description *:
        </label>
        <textarea
          onChange={handleChange}
          name="description"
          className="block w-full rounded-md border-0 py-1.5 indent-1.5 text-gray-900 shadow-sm 
          ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
          focus:ring-inset focus:ring-secondaryOrange sm:text-sm sm:leading-6"
          rows="2"
          value={
            stageData.stage2.description ? stageData.stage2.description : ""
          }
        />
      </div>
    </div>
  );
};

export default Stage2;
