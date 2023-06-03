import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const RangeCalendar = ({ startDate, endDate, ...props }) => {
  const tileClassName = ({ date }) => {
    if (startDate && endDate && date >= startDate && date <= endDate) {
      return "react-calendar__tile--range";
    }
  };

  return <Calendar {...props} tileClassName={tileClassName} />;
};

export default RangeCalendar;
