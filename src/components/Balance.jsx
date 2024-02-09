import { useSelector } from "react-redux";
import numberWithCommas from "../utils/numberWithCommas";

const Balance = () => {
  const { transactions } = useSelector((state) => state.transaction);

  const calculateIncome = () => {
    let income = 0;

    transactions.forEach((transaction) => {
      const { type, amount } = transaction;
      if (type === "income") {
        income += amount;
      } else {
        income -= amount;
      }
    });
    return income;
  };
  return (
    <div className=" bg-[#837dc5]  w-[400px] font-medium text-white px-6 py-2 ">
      <p>Your Current Balance</p>
      <h3 className="flex">
        <span>৳</span>{" "}
        {transactions?.length > 0 ? (
          <span>{numberWithCommas(calculateIncome(transactions))}</span>
        ) : (
          0
        )}
      </h3>
    </div>
  );
};

export default Balance;
