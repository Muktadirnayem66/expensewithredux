/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTransactions,
  createTransactions,
} from "../Features/transaction/transactionSlice";

const Form = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.transaction);
  const { editing } = useSelector((state) => state.transaction || {});

  //listen for edit mode

  useEffect(() => {
    const { id, name, type, amount } = editing || {};
    if (id) {
      setEditMode(true);
      setName(name);
      setAmount(amount);
      setType(type);
    } else {
      setEditMode(false);
      reset();
    }
  }, [editing]);

  const reset = () => {
    setName("");
    setAmount("");
    setType("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createTransactions({
        name,
        type,
        amount: Number(amount),
      })
    );
    reset();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      changeTransactions({
        id: editing?.id,
        data: {
          name,
          amount,
          type,
        },
      })
      );
      reset();
    setEditMode(false);
  };

  const CancelEdit = () => {
    reset();
    setEditMode(false);
  };

  return (
    <div className=" bg-[#f5f5f5] p-[20px] w-[400px]">
      <h3>Add new transaction</h3>
      <form onSubmit={editMode ? handleUpdate : handleSubmit}>
        <div className=" flex gap-12  text-xl mt-4 mb-4">
          <label htmlFor="transaction_name">Name</label>
          <input
            className=" w-60 px-[5px] text-sm py-[5px]"
            type="text"
            name="name"
            placeholder="enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex gap-16 text-xl">
          <label htmlFor="transaction_type">Type</label>
          <div className="radio_group">
            <input
              className=" px-[5px] text-sm py-[5px]"
              type="radio"
              value={type}
              onChange={(e) => setType("income")}
              name="type"
              checked={type === "income"}
              required
            />
            <label htmlFor="transaction_type">Income</label>
          </div>
          <div className="radio_group">
            <input
              className="px-[5px] text-sm py-[5px]"
              type="radio"
              value={type}
              onChange={(e) => setType("expense")}
              name="type"
              checked={type === "expense"}
              placeholder="Expense"
            />
            <label htmlFor="transaction_type">Expense</label>
          </div>
        </div>

        <div className="flex gap-8  text-xl mt-4 mb-4">
          <label htmlFor="transaction_amount">Amount</label>
          <input
            className=" w-60 px-[5px] text-sm py-[5px]"
            type="number"
            placeholder="enter amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button disabled={isLoading}
          type="submit"
          className=" w-full  border-none  hover:bg-blue-900 rounded-md outline-none cursor-pointer bg-blue-700 text-white transition ease-in-out "
        >
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>
        {!isLoading && isError && (
          <p className=" text-red-600 text-sm">There was an error occured</p>
        )}
      </form>

      {editMode && (
        <button
          onClick={CancelEdit}
          className=" w-full  border-none  hover:bg-red-900 rounded-md outline-none cursor-pointer bg-red-700 text-white transition ease-in-out mt-2  text-md"
        >
          Cancel Edit
        </button>
      )}
    </div>
  );
};

export default Form;
