import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransactions,
  deleteTransactions,
  editTransactions,
  getTransactions,
} from "./transactionApi";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
};

//async thunk

export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async () => {
    const transaction = await getTransactions();
    return transaction;
  }
);

export const createTransactions = createAsyncThunk(
  "transaction/createTransactions",
  async (data) => {
    const transaction = await addTransactions(data);
    return transaction;
  }
);

export const changeTransactions = createAsyncThunk(
  "transaction/changeTransactions",
  async ({ id, data }) => {
    const transaction = await editTransactions(id, data);
    return transaction;
  }
);

export const removeTransactions = createAsyncThunk(
  "transaction/removeTransactions",
  async (id) => {
    const transaction = await deleteTransactions(id);
    return transaction;
  }
);

//create slice

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInActive: (state) => {
      state.editing = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions = action.payload;
      })

      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error?.message;
        state.transactions = [];
      })

      .addCase(createTransactions.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })

      .addCase(createTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransactions.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error?.message;
      })

      .addCase(changeTransactions.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })

      .addCase(changeTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        const updatedIndex = state.transactions.findIndex(
          (item) => item.id === action.payload.id
        );
        state.transactions[updatedIndex] = action.payload;
      })

      .addCase(changeTransactions.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error?.message;
      })

      .addCase(removeTransactions.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })

      .addCase(removeTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions = state.transactions.filter(
          (item) => item.id !== action.meta.arg
        );
      })
      .addCase(removeTransactions.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error?.message;
      });
  },
});

export default transactionSlice.reducer;
export const { editActive, editInActive } = transactionSlice.actions;
