import { configureStore } from "@reduxjs/toolkit";
import UAHRateSlice from "./converterSlice";

const store = configureStore({
  reducer: { rate: UAHRateSlice },
});
export default store;
