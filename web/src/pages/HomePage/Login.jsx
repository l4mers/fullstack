import MainFormComponent from "./MainFormComponent";
import CustomInput from "../../components/FormComponents/CustomInput";
import { PrimaryBtn } from "../../components/StyledButtons";
import reusableAxiosComponent from "../../api/reusableAxiosComponent";
import { useState, useEffect } from "react";
import { setItem, getItem } from "../../utils/storage";
import { setSelectedView } from "../../store/modules/displayedHomepageViewSlice";
import { useDispatch } from "react-redux";
import { setAuthentication } from "../../store/modules/authenticationSlice";

const Login = ({ email, password }) => {
  const [localEmail, setLocalEmail] = useState(email);
  const [localPassword, setLocalPassword] = useState(password);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  useEffect(() => {
    setLocalEmail(email);
    setLocalPassword(password);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: localEmail,
      password: localPassword,
    };

    try {
      const response = await reusableAxiosComponent(
        user,
        "authenticate",
        "POST"
      );
      console.log("response: ", response);
      setError(false);

      setItem("token", response.token);
      setItem("user", {
        id: response.user.id,
        birthDay: response.user.birthDay,
        name: response.user.name,
      });

      dispatch(setSelectedView("Booking"));
      dispatch(setAuthentication(true));
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };
  return (
    <MainFormComponent onSubmit={handleSubmit}>
      <div className="rounded-b md:bg-white md:px-6  md:py-9">
        <div className="flex flex-col gap-2 md:flex-row">
          <CustomInput
            flex1="md:flex-1"
            type="email"
            name="email"
            placeholder="Email"
            shadow="input-shadow"
            marginTop=""
            indent="indent-4"
            height="h-12"
            display="hidden"
            value={localEmail}
            onChange={(e) => setLocalEmail(e.target.value)}
          />
          <CustomInput
            flex1="md:flex-1"
            type="password"
            name="password"
            placeholder="Password"
            shadow="input-shadow"
            marginTop=""
            indent="indent-4"
            height="h-12"
            display="hidden"
            value={localPassword}
            onChange={(e) => setLocalPassword(e.target.value)}
          />
          <PrimaryBtn name="LOGIN" width="w-full" flex1="md:flex-1" />
        </div>
        {error && (
          <p className="mt-2 text-sm font-bold text-primaryRed">
            Check if your password or email is correct and try again
          </p>
        )}
      </div>
    </MainFormComponent>
  );
};

export default Login;
