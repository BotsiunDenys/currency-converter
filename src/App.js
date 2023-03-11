import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./components/Header";
import Converter from "./components/Converter";
import { getUAHRate } from "./redux/converterSlice";
import "./App.css";

function App() {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUAHRate());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Converter />
    </>
  );
}

export default App;
