import axios from "axios";
import { useEffect, useState } from "react";

import CryptoList from "./CryptoList";

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  // Add other fields as needed
}

function App() {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
            },
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };
    fetchCoins();
  }, []);

  return <CryptoList coins={coins} />;
}

export default App;
