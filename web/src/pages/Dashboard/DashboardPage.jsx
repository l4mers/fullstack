import ViewDropdown from "./ViewDropdown";
import Searchbar from "./Searchbar";
import displayedDashboardViewSlice from "../../store/modules/displayedDashboardViewSlice";
import { useDispatch, useSelector } from "react-redux";
import UpcomingStays from "./UpcomingStays";
import ConfirmedGuests from "./ConfirmedGuests";

const Dashboard = () => {
  const dispatch = useDispatch();
  const selectedView = useSelector(
    (state) => state.displayedDashboardView.selectedView
  );

  console.log("selectedView: ", selectedView);
  return (
    <main>
      <nav className="mb-4 flex justify-center md:mb-12">
        <div className="cursor-pointer">
          <ViewDropdown />
        </div>
      </nav>
      <div className="mx-auto mb-4 sm:w-11/12 md:max-w-[1440px]">
        <Searchbar />
      </div>
      {selectedView === "Upcoming Stays" && <UpcomingStays />}
      {selectedView === "Confirmed Guests" && <ConfirmedGuests />}
    </main>
  );
};

export default Dashboard;
