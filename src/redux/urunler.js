import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const ref = collection(db, "ÜrünBilgileri");

export const fetchUrunBilgileri = createAsyncThunk(
  "urunBilgileri/fetchUrunBilgileri",
  async () => {
    const snapshot = await onSnapshot(ref);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
);

export const urunBilgileriSlice = createSlice({
  name: "urunBilgileri",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUrunBilgileri.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUrunBilgileri.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUrunBilgileri.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

