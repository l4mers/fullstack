import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedView } from "../../store/modules/displayedDashboardViewSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ViewDropdown() {
  const dispatch = useDispatch();
  const views = useSelector((state) => state.displayedDashboardView.views);
  const selectedView = useSelector(
    (state) => state.displayedDashboardView.selectedView
  );

  const viewKeys = Object.keys(views);
  const selectedViewImageUrl = views[selectedView];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="mt-4 inline-flex h-12 w-full items-center justify-center  gap-x-1.5 rounded-md text-xl ring-inset ring-gray-300  md:gap-x-4 md:text-[32px] ">
          <img className="w-8 md:w-auto" src={selectedViewImageUrl} />
          <h1>{selectedView}</h1>
          <img src="/images/dashboard/dropdown.svg" alt="options" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {viewKeys.map((view, index) => {
              return (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={() => dispatch(setSelectedView(view))}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      {view}
                    </a>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default ViewDropdown;
