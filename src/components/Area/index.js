import './styles.css'; 

export const Area = ({ data, onClick, winnerCombination }) => {
  const getActive = i => winnerCombination?.some(element => element === i ) ? 'active' : '';

  return (
    <div className="area">
      {data.map((item, i) => (
        <button
          key={i}
          className={`item ${getActive(i)}`}
          onClick={() => onClick(i)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
