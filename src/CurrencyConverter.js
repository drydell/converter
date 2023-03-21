import React, { Fragment, useCallback, useEffect, useState } from 'react';

const CurrencyConverter = ({ eurToUsdRate, isEurInput, setIsEur }) => {
 
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [override, setOverride] = useState(0);
  const [useOverride, setUseOverride] = useState(false);
  const [history, setHistory] = useState([]);

  const getRate = useCallback(
    () => useOverride && override > eurToUsdRate.min && override < eurToUsdRate.max ? override : eurToUsdRate.rate,
    [useOverride, override, eurToUsdRate]
  );

  const updateHistory = useCallback(() => {
    setHistory(hist => structuredClone([
      {
        rate: eurToUsdRate.rate,
        override: useOverride ? override: 0,
        curr: isEurInput ? 'EUR' : 'USD',
        amt: amount,
        ccurr: isEurInput ? 'USD' : 'EUR',
        camt: convertedAmount,
      },
      ...hist
    ]).slice(0, 5));
  }, [eurToUsdRate, amount, isEurInput, override, useOverride, convertedAmount]);

  const handleAmountChange = ({ nativeEvent: { target: { value } } }) => {
    const val = Number(value);
    setAmount(val);
    setConvertedAmount(isEurInput ? val * getRate() : val / getRate());
    updateHistory();
  };

  const handleOverrideChange = ({ nativeEvent: { target: { value } } }) => {
    const val = Number(value);
    setOverride(val);
  };

  const handleCurrencySwitch = () => {
    setIsEur();
    setAmount(convertedAmount);
    setConvertedAmount(isEurInput ? convertedAmount / getRate() : convertedAmount * getRate());
    updateHistory();
  };

  const handleOverrideSwitch = () => {
    setUseOverride(!useOverride);
  };

  useEffect(() => {
    const rate = useOverride && override > eurToUsdRate.min && override < eurToUsdRate.max ? override : eurToUsdRate.rate;
    setConvertedAmount(isEurInput ? amount * rate : amount / rate);
    updateHistory();
  }, [eurToUsdRate, amount, isEurInput, override, useOverride, getRate, updateHistory]);

  return (
    <Fragment>
    <div className="App-form">
      <div>
        <label>
          {isEurInput ? "EUR" : "USD"}:
          <input className="App-input" type="number" value={amount} onChange={handleAmountChange} />
        </label>
      </div>
      <div>
        <label>
          {isEurInput ? "USD" : "EUR"}:
          <input className="App-input" type="number" value={convertedAmount} disabled />
        </label>
      </div>
      <div>
        <input className="App-checkbox" type="checkbox" checked={useOverride} onChange={handleOverrideSwitch} />
        <label style={{ paddingLeft: 5 }}>
          Override:
          <input className="App-input" type="number" value={override} onChange={handleOverrideChange}/>
        </label>
      </div>
    </div>
    <div className="App-form">
      <div className="App-link" onClick={handleCurrencySwitch}>
        {isEurInput ? "Switch to USD" : "Switch to EUR"}
      </div>
    </div>
    <div className="App-history-table-container">
      <div className="App-history-table-row App-history-table-header">
        <div className="App-history-table-cell">Rate</div>
        <div className="App-history-table-cell">Override</div>
        <div className="App-history-table-cell">Currency</div>
        <div className="App-history-table-cell">Amount</div>
        <div className="App-history-table-cell">Converted Currency</div>
        <div className="App-history-table-cell">Converted Amount</div>
      </div>
      {
        history.map((hist, key) => {
          return (
            <div className="App-history-table-row" key={`row${key}`}>
              <div className="App-history-table-cell" key={`rate${key}`}>{hist.rate}</div>
              <div className="App-history-table-cell" key={`override${key}`}>{hist.override}</div>
              <div className="App-history-table-cell" key={`curr${key}`}>{hist.curr}</div>
              <div className="App-history-table-cell" key={`amt${key}`}>{hist.amt}</div>
              <div className="App-history-table-cell" key={`ccurr${key}`}>{hist.ccurr}</div>
              <div className="App-history-table-cell" key={`camt${key}`}>{hist.camt}</div>
            </div>
          );
        })
      }
    </div>
    </Fragment>
  );
}

export default CurrencyConverter;