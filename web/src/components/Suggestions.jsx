import { useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Suggestions = ({
  places,
  setValue,
  value,
  ready,
  handleSelect,
  shadow,
  marginTop = "mt-6",
  marginX = "mx-6",
  rounded = "rounded-2xl",
}) => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <Combobox
      as="div"
      value={selectedPlace}
      onChange={(val) => {
        setSelectedPlace(val);
        handleSelect(val);
      }}
    >
      <div className={`relative  ${marginTop} ${marginX}`}>
        <Combobox.Input
          className={`h-12 w-full border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-secondaryOrange sm:text-sm sm:leading-6 ${shadow} ${rounded}`}
          value={value}
          disabled={!ready}
          onChange={(e) => setValue(e.target.value)}
          displayValue={(person) => person?.name}
          placeholder="Enter a location"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {places.map((place) => (
            <Combobox.Option
              key={place.place_id}
              value={place.description}
              className={({ active }) =>
                classNames(
                  "relative cursor-default select-none py-2 pl-3 pr-9",
                  active ? "bg-secondaryOrange text-white" : "text-gray-900"
                )
              }
            >
              {({ active, selected }) => (
                <>
                  <span
                    className={classNames(
                      "block truncate",
                      selected && "font-semibold"
                    )}
                  >
                    {place.description}
                  </span>

                  {selected && (
                    <span
                      className={classNames(
                        "absolute inset-y-0 right-0 flex items-center pr-4",
                        active ? "text-white" : "text-secondaryOrange"
                      )}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};

export default Suggestions;
