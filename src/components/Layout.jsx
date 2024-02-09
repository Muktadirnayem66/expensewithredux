/* eslint-disable react/prop-types */

const Layout = ({ children }) => {
  return (
    <div className=" text-2xl">
      <div className=" bg-blue-600 text-white text-center text-3xl p-4">
        <h1>Expense Tracker</h1>
      </div>

      <div className="flex flex-col items-center justify-center w-[90%] max-w-[1024px] my-[20px] mx-auto">
        {children}
      </div>

      <div className=" bg-blue-600 mt-20 text-white text-center text-sm p-1">
        @2024 All rights reserved By Nayem
      </div>
    </div>
  );
};

export default Layout;
