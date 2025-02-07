import './utils/chartSetup'

import { Container, CssBaseline } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CryptoTable from './components/CryptoTable'
import ErrorModal from './components/ErrorModal'
import { fetchCoins } from './features/cryptoSlice'
import { AppDispatch, RootState } from './store/store'

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
    <>
      <CssBaseline />
      <Container sx={{ padding: '24px', maxWidth: '90vw !important' }}>
        {loading && <p>Loading...</p>}
        <CryptoTable />
      </Container>

      <ErrorModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        errorMessage={error || 'An unknown error occurred.'}
      />
    </>
  )
}

export default App
