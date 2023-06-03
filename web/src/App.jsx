import Router from "./routes/Router";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Loader from "./components/shared/Loader";
import Notification from "./components/shared/Notification";
import { useSelector } from "react-redux";

function App() {
  const { isLoading } = useSelector((state) => state.loader);

  return (
    <>
      <Header />
      {isLoading && <Loader />}
      <Notification />
      <Router />
      <Footer />
    </>
  );
}

export default App;
