import CustomInput from "../../components/FormComponents/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { handleValueChange } from "./Stage1";
import { useState, useEffect, useCallback } from "react";
import { updateStageData } from "../../store/modules/displayedVenueStageSlice";

export const handleMultipleValueChange = (dispatch, stageData, stage) => {
  return (updates) => {
    const updatedData = {
      ...stageData[`stage${stage}`],
    };

    updates.forEach(({ name, value }) => {
      updatedData[name] = value;
    });

    dispatch(
      updateStageData({
        stage: stage,
        data: { ...updatedData },
      })
    );
  };
};

const LocationDetails = ({ addressComponents }) => {
  const dispatch = useDispatch();
  const stageData = useSelector((state) => state.displayedVenueStage.stageData);
  console.log("stage3", stageData);

  const handleChange = handleValueChange(dispatch, stageData, 3);
  const handleMultipleUpdates = useCallback(
    handleMultipleValueChange(dispatch, stageData, 3),
    [dispatch, stageData]
  );

  const getComponentValue = (...types) => {
    for (const type of types) {
      const component = addressComponents.find((component) =>
        component.types.includes(type)
      );
      if (component) {
        return component.long_name;
      }
    }
    return "";
  };

  const street = getComponentValue("route", "street_address");
  const streetNumber = getComponentValue("street_number");
  const cityValue = getComponentValue(
    "locality",
    "postal_town",
    "sublocality_level_1"
  );
  const stateValue = getComponentValue(
    "administrative_area_level_2",
    "administrative_area_level_1"
  );
  const zipCodeValue = getComponentValue("postal_code");
  const countryValue = getComponentValue("country");

  const [streetInput, setStreetInput] = useState(`${street} ${streetNumber}`);
  const [cityInput, setCityInput] = useState(cityValue);
  const [stateInput, setStateInput] = useState(stateValue);
  const [zipCodeInput, setZipCodeInput] = useState(zipCodeValue);
  const [countryInput, setCountryInput] = useState(countryValue);

  useEffect(() => {
    setStreetInput(`${street} ${streetNumber}`);
    setCityInput(cityValue);
    setStateInput(stateValue);
    setZipCodeInput(zipCodeValue);
    setCountryInput(countryValue);

    handleMultipleUpdates([
      {
        name: "street",
        value: `${street} ${streetNumber}`,
      },
      {
        name: "city",
        value: cityValue,
      },
      {
        name: "state",
        value: stateValue,
      },
      {
        name: "zipCode",
        value: zipCodeValue,
      },
      {
        name: "country",
        value: countryValue,
      },
    ]);
  }, [
    addressComponents,
    street,
    streetNumber,
    cityValue,
    stateValue,
    zipCodeValue,
    countryValue,
  ]);

  return (
    <div className="mb-6  w-full">
      <div className="flex flex-col gap-4">
        <CustomInput
          onChange={(e) => {
            handleChange(e);
            setStreetInput(e.target.value);
          }}
          type="text"
          labelName="Street"
          name="street"
          value={streetInput}
          className="input-field"
        />
        <CustomInput
          onChange={(e) => {
            handleChange(e);
            setCityInput(e.target.value);
          }}
          type="text"
          labelName="City"
          name="city"
          value={cityInput}
          className="input-field"
        />
        <CustomInput
          onChange={(e) => {
            handleChange(e);
            setStateInput(e.target.value);
          }}
          type="text"
          labelName="State"
          name="state"
          value={stateInput}
          className="input-field"
        />
        <CustomInput
          onChange={(e) => {
            handleChange(e);
            setZipCodeInput(e.target.value);
          }}
          type="text"
          name="zipCode"
          labelName="Zip Code"
          value={zipCodeInput}
          className="input-field"
        />
        <CustomInput
          onChange={(e) => {
            handleChange(e);
            setCountryInput(e.target.value);
          }}
          type="text"
          name="country"
          labelName="Country"
          value={countryInput}
          className="input-field"
        />
      </div>
    </div>
  );
};

export default LocationDetails;
