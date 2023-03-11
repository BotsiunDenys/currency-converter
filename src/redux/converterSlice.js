import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const currencyRateState = {
  UAHRate: [],
  loading: false,
  error: "",
};

export const getUAHRate = createAsyncThunk("UAHRate/getUAHRate", async () => {
  const rates = await axios.get(
    "https://api.exchangerate-api.com/v4/latest/USD",
  );
  return rates.data.rates;
});

const UAHRateSlice = createSlice({
  name: "UAHRate",
  initialState: currencyRateState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUAHRate.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.UAHRate = [];
    });
    builder.addCase(getUAHRate.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.UAHRate = action.payload;
    });
    builder.addCase(getUAHRate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.UAHRate = [];
    });
  },
});

export default UAHRateSlice.reducer;
