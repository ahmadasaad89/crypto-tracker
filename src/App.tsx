import { useNavigate } from 'react-router';

function App() {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/coin/${id}`);
  };

  return (
    <ul className="App">
      <li>
        <button onClick={() => handleClick('1')}>Coin 1</button>
      </li>
      <li>
        <button onClick={() => handleClick('2')}>Coin 2</button>
      </li>
    </ul>
  );
}

export default App;
