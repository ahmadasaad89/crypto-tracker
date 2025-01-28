import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
interface ChartData {
  time: string;
  price: number;
}

interface ApiResponse {
  prices: [number, number][];
}

function CryptoDetails() {
  const { id } = useParams();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response: { data: ApiResponse } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
          {
            params: {
              vs_currency: 'usd',
              days: 30,
              interval: 'daily',
            },
          },
        );

        const formattedData: ChartData[] = response.data.prices.map((price) => ({
          time: new Date(price[0]).toLocaleDateString(),
          price: price[1],
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, [id]);
  return (
    <>
      <LineChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </>
  );
}

export default CryptoDetails;
