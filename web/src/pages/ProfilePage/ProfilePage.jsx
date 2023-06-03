import ProfileHeader from "./ProfileHeader";
import ProfileMain from "./ProfileMain";
import { getItem } from "../../utils/storage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const user = getItem("user");
  const { userId } = useParams();
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);

  useEffect(() => {
    if (user.id == userId) {
      setIsLoggedInUser(true);
    } else {
      setIsLoggedInUser(false);
    }
  }, [user.id, userId]);

  return (
    <>
      <ProfileHeader
        isLoggedInUser={isLoggedInUser}
        userId={userId}
        user={user}
      />
      <ProfileMain />
    </>
  );
};

export default ProfilePage;
