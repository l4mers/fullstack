import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CustomInput from "./FormComponents/CustomInput";

function CreateCollectionModal({ open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  function saveCollection() {
    let collections = JSON.parse(localStorage.getItem("collections")) || [];

    if (collections.some((collection) => collection.name === value)) {
      setMessage("A collection with this name already exists!");
    } else {
      collections.push({ name: value, venues: [] });
      localStorage.setItem("collections", JSON.stringify(collections));
      setOpen(false);
      setValue("");
      setMessage("");
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <p className="text-center font-semibold text-red-600">
                    {message}
                  </p>
                  <div className="text-center ">
                    <div className="mt-2">
                      <p className="text-sm text-textBlack">
                        Create a Dream Stay collection for your next vacation.
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <CustomInput
                      placeholder="e.g. 'Going to Sweden'"
                      required=""
                      colonSymbol=""
                      onChange={(e) => {
                        setValue(e.target.value);
                        setMessage("");
                      }}
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    disabled={value === ""}
                    className={`inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold 
                    text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  
                    sm:col-start-2 ${
                      value === "" || message !== ""
                        ? "cursor-not-allowed bg-gray-300"
                        : "bg-secondaryOrange hover:bg-[#EF6623] focus-visible:outline-[#EF6623]"
                    }}`}
                    onClick={saveCollection}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default CreateCollectionModal;
