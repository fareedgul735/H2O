import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, db } from "../store/firebase.js";

export const submitBulkOrder = createAsyncThunk(
  "bulkOrder/submit",
  async (data) => {
    const docRef = await addDoc(collection(db, "bulkOrders"), data);
    return docRef.id;
  },
);

const bulkOrderSlice = createSlice({
  name: "bulkOrder",
  initialState: {
    loading: false,
    success: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitBulkOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitBulkOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitBulkOrder.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default bulkOrderSlice.reducer;
