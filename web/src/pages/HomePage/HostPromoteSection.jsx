const HostPromoteSection = () => {
  return (
    <div className="section-container">
      <h2 className="mb-4 text-center md:text-start lg:mb-10">
        Transform Your Space into a Profitable Stay
      </h2>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:gap-10">
        <div className="flex-1">
          <video
            className="h-[270px] w-full overflow-hidden object-cover md:mb-2 md:h-[360px]"
            autoPlay
            muted
            loop
          >
            <source src="/videos/beachHouse.mp4" type="video/mp4" />
            Your browser does not support the video tag. <br />
            Video by Videographer Shiyaz:
            https://www.pexels.com/video/aerial-view-of-a-maldivesbeach-resort-4069480/.
          </video>
          <h3 className="mb-4 text-lg font-semibold md:mb-6 md:text-2xl">
            Becoming a Host
          </h3>
          <p className="md:text-lg">
            Unlock your property's potential. Join our secure platform, enjoy
            flexible hosting, and user-friendly tools. Start your profitable
            hosting journey today!
          </p>
        </div>
        <div className="flex-1">
          <img
            className="h-[270px] w-full object-cover md:mb-2 md:h-[360px]"
            src="/images/richman.webp"
            alt='Photo by <a href="https://unsplash.com/pt-br/@emrealiriz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Emre Alırız</a> on <a href="https://unsplash.com/photos/2rhz3Nuq12c?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
              '
          />
          <h3 className="mb-4 text-lg font-semibold md:mb-6 md:text-2xl">
            Testomonials from Host
          </h3>
          <p className="md:text-lg">
            "As a host on this platform, I've experienced a fantastic blend of
            profitability and simplicity. It's a stylish, secure, and
            user-friendly service that truly elevates my hosting experience." -
            John D., Luxury Property Owner
          </p>
        </div>
      </div>
    </div>
  );
};

export default HostPromoteSection;
