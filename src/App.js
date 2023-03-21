import React, { Fragment, useState } from 'react';
import PollingRenderer from './PollingRenderer';
import CurrencyConverter from './CurrencyConverter';

import './App.css';

function App() {

  const [isEurInput, setIsEurInput] = useState(true);
  const setIsEur = () => setIsEurInput(isEur => !isEur);

  return (
    <PollingRenderer>
    {
      eurToUsdRate => (
        <Fragment>
          <div className="App">
            <header className="App-header">
              { isEurInput ? (<p> EUR/USD: {eurToUsdRate.rate}</p>) : (<p> USD/Eur: {(1 / eurToUsdRate.rate)}</p>) }
            </header>
            <CurrencyConverter eurToUsdRate={eurToUsdRate} isEurInput={isEurInput} setIsEur={setIsEur} />
          </div>
        </Fragment>
      )
    }
    </PollingRenderer>
  );
}

export default App;
