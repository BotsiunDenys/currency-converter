import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const [toEUR, setToEUR] = useState(0);
  const [toUSD, setToUSD] = useState(0);
  const rate = useSelector((state) => state.rate.UAHRate);
  useEffect(() => {
    setToUSD(rate["UAH"]);
    setToEUR(rate["UAH"] / rate["EUR"])
  }, [rate]);
  return (
    <header className="header">
      <div>USD to UAH: {Number(toUSD.toFixed(2))}</div>
      <div>EUR to UAH: {Number(toEUR.toFixed(2))}</div>
    </header>
  );
};

export default Header;
