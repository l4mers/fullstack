import StageTemplate from "./StageTemplate";
import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Suggestions from "../../components/Suggestions";
import LocationDetails from "./LocationDetails";
import { useSelector, useDispatch } from "react-redux";
import { handleMultipleValueChange } from "./LocationDetails";

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API;
const libraries = ["places"];

function Stage3() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const initialCenter = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [center, setCenter] = useState(initialCenter);
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [addressComponents, setAddressComponents] = useState(null);
  const stageData = useSelector((state) => state.displayedVenueStage.stageData);
  const dispatch = useDispatch();
  const handleMultipleUpdates = handleMultipleValueChange(
    dispatch,
    stageData,
    3
  );

  console.log("addressComponents", addressComponents);
  console.log("stage3", stageData.stage3);

  return (
    <div>
      <StageTemplate stageNumber={3} stageTitle={"Location"} />
      {addressComponents && (
        <LocationDetails addressComponents={addressComponents} />
      )}
      <div className="relative h-[400px] w-full">
        <GoogleMap
          zoom={zoom}
          center={center}
          options={{ disableDefaultUI: true }}
          mapContainerClassName="flex flex-col gap-4 w-full h-full rounded-3xl"
        >
          {selected && <Marker position={selected} />}
        </GoogleMap>
        <PlacesAutoComplete
          setZoom={setZoom}
          setCenter={setCenter}
          setSelected={setSelected}
          setAddressComponents={setAddressComponents}
          stageData={stageData}
          handleMultipleUpdates={handleMultipleUpdates}
        />
      </div>
    </div>
  );
}

const PlacesAutoComplete = ({
  setSelected,
  setCenter,
  setZoom,
  setAddressComponents,
  stageData,
  handleMultipleUpdates,
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const [initialSearchPerformed, setInitialSearchPerformed] = useState(false);

  console.log(data);

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    setCenter({ lat, lng });
    console.log("results: ", results);

    const locationType = results[0].types[0];

    switch (locationType) {
      case "street_address":
        setZoom(17);
        break;
      case "route":
        setZoom(15);
        break;
      case "locality":
        setZoom(12);
        break;
      case "sublocality_level_1":
        setZoom(11);
        break;
      case "administrative_area_level_2":
        setZoom(10);
        break;
      case "administrative_area_level_1":
        setZoom(8);
        break;
      case "country":
        setZoom(5);
        break;
      default:
        setZoom(1);
    }

    setAddressComponents(results[0].address_components);

    handleMultipleUpdates([
      {
        name: "lat",
        value: lat,
      },
      {
        name: "lng",
        value: lng,
      },
      {
        name: "addressComponents",
        value: results[0].address_components,
      },
      {
        name: "place_id",
        value: results[0].place_id,
      },
    ]);
  };

  useEffect(() => {
    if (!initialSearchPerformed && stageData.stage3.place_id) {
      const fetchPlaceDetails = async (place_id) => {
        const request = {
          placeId: place_id,
          fields: ["geometry", "address_components", "formatted_address"],
        };
        const service = new window.google.maps.places.PlacesService(
          document.createElement("div")
        );
        service.getDetails(request, (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            handleSelect(place.formatted_address);
          }
        });
      };

      fetchPlaceDetails(stageData.stage3.place_id);
      setInitialSearchPerformed(true);
    }
  }, [
    stageData.stage3.place_id,
    handleSelect,
    initialSearchPerformed,
    handleMultipleUpdates,
  ]);

  return (
    <div className="absolute left-1/2 top-0 w-full max-w-lg -translate-x-1/2">
      <Suggestions
        places={data}
        ready={ready}
        value={value}
        setValue={setValue}
        status={status}
        handleSelect={handleSelect}
      />
    </div>
  );
};

export default Stage3;
