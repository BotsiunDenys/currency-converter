/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { currencies } from "../currencies";

const Converter = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("UAH");
  const [fromCurValue, setFromCurValue] = useState(1);
  const [toCurValue, setToCurValue] = useState(0);
  const rate = useSelector((state) => state.rate.UAHRate);
  const loading = useSelector((state) => state.rate.loading);
  const error = useSelector((state) => state.rate.error);

  const onChangeFromCurValue = (value) => {
    const price = value / rate[fromCurrency];
    const result = price * rate[toCurrency];
    setFromCurValue(value);
    setToCurValue(Number(result.toFixed(2)));
  };

  const onChangeToCurValue = (value) => {
    const result = (rate[fromCurrency] / rate[toCurrency]) * value;
    setToCurValue(value);
    setFromCurValue(Number(result.toFixed(2)));
  };

  useEffect(() => {
    onChangeFromCurValue(fromCurValue);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToCurValue(toCurValue);
  }, [toCurrency]);

  if (isNaN(fromCurValue) || isNaN(toCurValue)) {
    onChangeFromCurValue(1);
  }

  if (loading) return <h1 className="loading">Loading...</h1>;
  if (error) return <h1 className="error">{error}</h1>;
  return (
    <>
      <h1 className="title">Currency converter</h1>
      <main className="converter">
        <section>
          <select
            className="selectCurrency"
            defaultValue={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map((cur, index) => (
              <option key={index}>{cur}</option>
            ))}
          </select>
          <input
            type="number"
            className="converterInput"
            value={fromCurValue}
            onChange={(e) => {
              onChangeFromCurValue(e.target.value);
            }}
          />
        </section>
        <section>
          <select
            className="selectCurrency"
            defaultValue={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((cur, index) => (
              <option key={index}>{cur}</option>
            ))}
          </select>
          <input
            type="number"
            className="converterInput"
            value={toCurValue}
            onChange={(e) => {
              onChangeToCurValue(e.target.value);
            }}
          />
        </section>
      </main>
    </>
  );
};

export default Converter;
