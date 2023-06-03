import StageTemplate from "./StageTemplate";
import CustomInput from "../../components/FormComponents/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { updateStageData } from "../../store/modules/displayedVenueStageSlice";

export const handleValueChange = (dispatch, stageData, stage) => {
  return (e) => {
    const { name, value, type } = e.target;
    let parsedValue = value;

    if (type === "number") {
      parsedValue = Number(value);
    }

    const updatedData = {
      ...stageData[`stage${stage}`],
      [name]: parsedValue,
    };

    dispatch(updateStageData({ stage: stage, data: { ...updatedData } }));
  };
};

const Stage1 = () => {
  const dispatch = useDispatch();
  const stageData = useSelector(
    (state) => state.displayedVenueStage.stageData
  ) || { stage1: { m2: "", beds: "", bathrooms: "", guests: "" } };

  const handleChange = handleValueChange(dispatch, stageData, 1);

  return (
    <div>
      <StageTemplate stageNumber={1} stageTitle={"Essential Information"} />
      <div className="flex flex-col gap-4">
        <CustomInput
          onChange={handleChange}
          labelName="Square Meter (m2)"
          name="m2"
          type="number"
          value={stageData.stage1.m2}
        />
        <CustomInput
          onChange={handleChange}
          labelName="Beds"
          name="beds"
          type="number"
          value={stageData.stage1.beds}
        />
        <CustomInput
          onChange={handleChange}
          labelName="Bathrooms"
          name="bathrooms"
          type="number"
          value={stageData.stage1.bathrooms}
        />
        <CustomInput
          onChange={handleChange}
          labelName="Max guests"
          name="guests"
          type="number"
          value={stageData.stage1.guests}
        />
      </div>
    </div>
  );
};

export default Stage1;
