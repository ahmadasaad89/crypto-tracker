import './utils/chartSetup'

import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'

import CryptoTable from './components/CryptoTable'
import Header from './components/Header'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#000000',
    },
  },
})

export interface Coin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  sparkline_in_7d: { price: number[] }
}

function App() {
  const [coins, setCoins] = useState<Coin[]>([])

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 10,
              page: 1,
              sparkline: true,
            },
          },
        )
        setCoins(response.data)
      } catch (error) {
        console.error('Error fetching coins:', error)
      }
    }
    fetchCoins()
  }, [])

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Header />
      <Container sx={{ padding: '24px', maxWidth: '90vw !important' }}>
        <CryptoTable coins={coins} />
      </Container>
    </ThemeProvider>
  )
}

export default App
