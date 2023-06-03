const Stage0 = () => {
  return (
    <div className="mt-0 flex h-full w-full flex-grow flex-col gap-0 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-20">
      <div className="sm:flex-1">
        <h1 className="mb-20 mt-20 text-3xl font-bold sm:mb-0 sm:mt-0 lg:text-5xl">
          Join the Holidaze family
          <br /> - start hosting.
        </h1>
      </div>
      <div className="max-w-lg sm:flex-1">
        <h3 className="mb-4 text-xl font-semibold text-gray-600">
          Six quick steps to becoming a Holidaze host.
        </h3>
        <ul className="flex flex-col gap-2">
          <div className="flex items-center justify-between border-b py-4">
            <div>
              <li>
                <span className="font-bold">Step 1</span>: Essential Information
              </li>
              <li>
                <span className="font-bold">Step 2</span>: Title and Description
              </li>
            </div>
            <div>
              <img src="/images/registerIcons/info.png" alt="" />
            </div>
          </div>
          <div className="flex items-center justify-between border-b py-4">
            <li className="flex flex-col">
              <span className="font-bold">Step 3:</span>
              <span>Location</span>
            </li>
            <img src="/images/registerIcons/map.png" alt="" />
          </div>
          <div className="flex items-center justify-between border-b py-4">
            <li className="flex flex-col">
              <span className="font-bold"> Step 4:</span>
              <span>Amenities</span>
            </li>
            <img src="/images/registerIcons/amenities.png" alt="" />
          </div>
          <div className="flex items-center justify-between border-b py-4">
            <li className="flex flex-col">
              <span className="font-bold">Step 5:</span>
              <span>Pricing</span>
            </li>
            <img src="/images/registerIcons/best-price.png" alt="" />
          </div>
          <div className="flex items-center justify-between py-4">
            <li className="flex flex-col">
              <span className="font-bold">Step 6:</span>
              <span>Images</span>
            </li>
            <img src="/images/registerIcons/gallery.png" alt="" />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Stage0;
