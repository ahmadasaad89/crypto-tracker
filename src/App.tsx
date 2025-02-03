import './utils/chartSetup'

import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CryptoTable from './components/CryptoTable'
import Header from './components/Header'
import { fetchCoins } from './features/cryptoSlice'
import { AppDispatch, RootState } from './store/store'

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
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.crypto)

  useEffect(() => {
    dispatch(fetchCoins())
  }, [dispatch])

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Header />
      <Container sx={{ padding: '24px', maxWidth: '90vw !important' }}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <CryptoTable />
      </Container>
    </ThemeProvider>
  )
}

export default App
