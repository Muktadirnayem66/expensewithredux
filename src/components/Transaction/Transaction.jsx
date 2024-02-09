import editImage from "../../assets/edit.svg";
import deleteImage from "../../assets/delete.svg";
import { useDispatch } from "react-redux";
import { editActive, removeTransactions } from "../../Features/transaction/transactionSlice";
import numberWithCommas from "../../utils/numberWithCommas";

const Transaction = ({ transaction }) => {
  const { name, type, amount, id } = transaction || {};
  const dispatch = useDispatch();

  const handleEditClick = (e) => {
    e.preventDefault();
   
    dispatch(editActive(transaction));
  };

  const handleDelete= ()=>{
    dispatch(removeTransactions(id))
  }

  return (
    <li
      className={`flex w-[400px] p-2 rounded mt-2 justify-between ${
        type === "income" ? "bg-blue-800" : "bg-red-600"
      } text-white`}
    >
      <p>{name}</p>
      <div className="flex gap-4">
        <p>৳ {numberWithCommas(amount)}</p>
        <button className="link" onClick={handleEditClick}>
          <img alt="Edit" className="w-[14px] h-[14px]" src={editImage} />
        </button>
        <button className="link" onClick={handleDelete}>
          <img alt="Delete" className=" w-[14px] h-[14px]" src={deleteImage} />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
