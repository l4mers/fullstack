import { Outlet } from "react-router-dom";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import UpdateProfilePage from "./UpdateProfilePage";

const ProfileHeader = ({ user, isLoggedInUser }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="section-container">
        {open && <UpdateProfilePage open={open} setOpen={setOpen} />}
        <h1 className="mt-6 font-carena text-2xl leading-[24px] md:mt-10 md:text-[32px] md:leading-[32px]">
          {isLoggedInUser && user.name}
        </h1>
        <div className="gradient-divider mb-2 h-[1px] w-full"></div>
      </div>
      <div className="relative aspect-video h-full max-h-[490px] min-h-[207px] w-full overflow-hidden">
        <div className="section-container relative h-full pb-[48px] pt-4 md:pb-[57px]">
          <div className="aspect-square h-full max-h-[295px]">
            <img
              className="h-[112px] w-[112px] rounded object-cover profileSmallScreen:h-full profileSmallScreen:w-full profileSmallScreen:rounded-none "
              src="/images/profileTest2.png"
              alt=""
            />
          </div>
          <button
            onClick={
              isLoggedInUser
                ? () => {
                    setOpen(!open);
                  }
                : null
            }
            className="absolute bottom-0 right-0 mb-[48px] mr-6 h-[33px] rounded-lg bg-secondaryOrange px-4 text-sm font-semibold text-white transition hover:bg-[#EF6623] md:mb-[57px] md:mr-0 md:h-[42px]  md:text-base"
          >
            {!isLoggedInUser && (
              <div className="flex items-center">
                <ChatBubbleBottomCenterTextIcon className="mr-2 inline-block h-6 w-6" />
                <p>Send Message</p>
              </div>
            )}
            {isLoggedInUser && (
              <div className="flex items-center">
                <Cog6ToothIcon className="mr-2 inline-block h-6 w-6" />
                <p>Edit Profile</p>
              </div>
            )}
          </button>
          <div className="gradientbg absolute right-0 top-0 mr-6 mt-4 px-2 py-2 text-center smallScreen:px-4 md:mr-0 md:px-20 md:py-4">
            <p className="text-sm font-semibold md:text-xl">
              <span className="md:hidden">Avg.</span>
              <span className="hidden md:inline-block">Average</span> venue
              rating
            </p>
            <div className="flex items-center gap-2">
              <img
                className="w-6 md:w-auto"
                src="/images/profileStar2.svg"
                alt=""
              />
              <p className="font-josefinsSans text-lg font-medium md:text-[40px]">
                4.22
              </p>
              <p className="text-sm font-medium leading-[14px] md:text-xl md:leading-[20px]">
                (27 reviews)
              </p>
            </div>
          </div>
        </div>
        <img
          className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full object-cover"
          src="/images/headerbg.png"
          alt=""
        />
      </div>
    </>
  );
};

export default ProfileHeader;
