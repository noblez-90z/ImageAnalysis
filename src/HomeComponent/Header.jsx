import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="bg-black shadow-blue-400 text-[#f8fbfd] mb-2 h-[70px] w-full flex justify-between items-center px-6 shadow-md">
      <div className="my-2">
        <h1 className="font-bold text-2xl capitalize">scopio</h1>
      </div>
      <div className="flex space-x-5">
        <button className="font-bold capitalize border py-1 px-3">
          book now
        </button>
        <p
          onClick={handleOpen}
          className="w-[30px] h-[30px] border text-center"
        >
          x{" "}
        </p>
      </div>
    </div>
  );
};

export default Header;
