import { useDispatch, useSelector } from "react-redux";
import Transaction from "./Transaction";
import { useEffect } from "react";
import { fetchTransactions } from "../../Features/transaction/transactionSlice";

const Transactions = () => {
  const dispatch = useDispatch()
  const { transactions, isLoading, isError} = useSelector(
    (state) => state.transaction
  );


useEffect(()=>{
  dispatch(fetchTransactions())
},[dispatch])

  let content = null;

  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError) content = <p>something went worng</p>;

  if (!isLoading && !isError && transactions?.length > 0) {
    content = transactions.map((item) => (
      <Transaction key={item.id} transaction={item} />
    ));
  }

  if (!isLoading && !isError && transactions?.length === 0) {
    content = <p>No Transaction Found!</p>;
  }
  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className=" text-black">
        <ul>{content}</ul>
      </div>
    </>
  );
};

export default Transactions;
