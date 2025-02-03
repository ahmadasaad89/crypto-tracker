import './utils/chartSetup'

import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CryptoTable from './components/CryptoTable'
import ErrorModal from './components/ErrorModal'
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
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchCoins())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      setIsModalOpen(true)
    }
  }, [error])

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Header />
      <Container sx={{ padding: '24px', maxWidth: '90vw !important' }}>
        {loading && <p>Loading...</p>}
        <CryptoTable />
      </Container>

      <ErrorModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        errorMessage={error || 'An unknown error occurred.'}
      />
    </ThemeProvider>
  )
}

export default App
