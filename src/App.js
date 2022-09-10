import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [currencyFrom, setCurrencyFrom] = React.useState('RUB');
  const [currencyTo, setCurrencyTo] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);

  // const [rates, setRates] = React.useState({});
  const ratesRef = React.useRef({});

  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = json.rates; // любое изменение state асинхронно, поэтому можно использовать useRef для это предотвращения этого
        onChangeToPrice(1);
      }) //
      .catch((err) => alert(err));
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[currencyFrom];
    const result = price * ratesRef.current[currencyTo];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };
  const onChangeToPrice = (value) => {
    const price = (ratesRef.current[currencyFrom] / ratesRef.current[currencyTo]) * value;
    setFromPrice(price.toFixed(3));
    setToPrice(value);
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [currencyFrom]);
  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [currencyTo]);
  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={currencyFrom}
        onChangeValue={onChangeFromPrice}
        onChangeCurrency={setCurrencyFrom}
      />
      <Block
        value={toPrice}
        currency={currencyTo}
        onChangeValue={onChangeToPrice}
        onChangeCurrency={setCurrencyTo}
      />
    </div>
  );
}

export default App;
