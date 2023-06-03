import CustomInput from "../../components/FormComponents/CustomInput";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <div className="relative">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-textBlack" />
      <CustomInput
        required=""
        colonSymbol=""
        placeholder="Search"
        height="h-[38px]"
        paddingLeft="pl-8"
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button className="dashboardBtnGradient flex items-center justify-center  border-2 border-primaryRed px-4 py-2 text-sm font-semibold text-textBlack ring-secondaryOrange transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2">
          Sort by
          <img className="ml-2" src="/images/dashboard/dropdown.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
