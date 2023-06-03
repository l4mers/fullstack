import { ClimbingBoxLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-500 opacity-80">
      <div className="flex flex-col">
        <ClimbingBoxLoader
          color={"#EB737A"}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="h-full"
        />
      </div>
    </div>
  );
};

export default Loader;
