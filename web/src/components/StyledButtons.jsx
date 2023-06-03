const PrimaryBtn = ({ width, name, flex1, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${width} ${flex1} h-12 rounded-lg bg-secondaryOrange text-base font-semibold text-white transition hover:bg-[#EF6623]`}
    >
      {name}
    </button>
  );
};

const SecondaryBtn = ({ width, name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${width} h-12  rounded-lg border-2 border-[#88D8B0] font-bold text-textBlack  transition-all duration-300 hover:bg-[#88D8B0] `}
    >
      {name}
    </button>
  );
};

export { PrimaryBtn, SecondaryBtn };
