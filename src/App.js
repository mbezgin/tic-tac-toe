import { useState, useEffect } from 'react';

import { Area } from './components/Area';

import './App.css';

const checkWinner = data => {
  const combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  let isWinner = false;

  for (let i = 0; i < combinations.length; i++) {
    const combination = combinations[i];
    const val1 = data[combination[0]];
    const val2 = data[combination[1]];
    const val3 = data[combination[2]];

    if ( val1 === val2 && val1 === val3 && val2 === val3 && !!val1 ) {
      isWinner = combination;
      break;
    }
  }

  return isWinner
}

const getType = flag => flag ? 'X' : '0';

function App() {
  const [data, setData] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winnerCombination, setWinnerCombination] = useState(null);
  const [isDraw, setIsDraw] = useState(null);

  const clickHandler = (i) => {
    if (data[i] || winner) return;
    setIsXNext(!isXNext);
    const newData = data.map((item, index) => index === i ? getType(isXNext) : item);
    setData(newData);
  }

  const resetGame = () => {
    setData(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinnerCombination(null);
    setIsDraw(null);
  }

  useEffect(() => {
    const isWinner = checkWinner(data);
    const isDrawData = data.findIndex(el => el === null) < 0;

    if (isWinner) {
      setWinner(getType(!isXNext));
      setWinnerCombination(isWinner);
    }

    if (!isWinner && isDrawData) {
      setIsDraw(isDrawData);
    }
  }, [data]);
  
  return (
    <div className="App">
      <Area
        data={data}
        winnerCombination={winnerCombination}
        onClick={clickHandler}
      />
      {winner && (
        <>
          <p>{`${winner} is winner`}</p>
          <button type="button" onClick={resetGame}>Reset</button>
        </>
      )}
      {isDraw && (
        <>
          <p>The players agreed to a draw</p>
          <button type="button" onClick={resetGame}>Reset</button>
        </>
      )}
    </div>
  );
}

export default App;
