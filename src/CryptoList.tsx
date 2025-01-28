import { NavLink } from 'react-router';

import { Coin } from './App';
interface props {
  coins: Coin[];
}
const CryptoList = ({ coins }: props) => {
  return (
    <nav className="App">
      {coins.map((coin) => (
        <NavLink key={coin.id} to={`/coin/${coin.id}`} end>
          {coin.name} ({coin.symbol.toUpperCase()}): ${coin.current_price}
          <br />
        </NavLink>
      ))}
    </nav>
  );
};

export default CryptoList;
