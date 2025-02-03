import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface Coin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  sparkline_in_7d: { price: number[] }
}

interface CryptoState {
  coins: Coin[]
  searchQuery: string
  favorites: string[]
  loading: boolean
  error: string | null
}

const initialState: CryptoState = {
  coins: [],
  searchQuery: '',
  favorites: [],
  loading: false,
  error: null,
}

export const fetchCoins = createAsyncThunk('crypto/fetchCoins', async () => {
  const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 10,
      page: 1,
      sparkline: true,
    },
  })
  return response.data
})

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    toggleFavorite: (state, action) => {
      const coinId = action.payload
      state.favorites = state.favorites.includes(coinId)
        ? state.favorites.filter((id) => id !== coinId)
        : [...state.favorites, coinId]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false
        state.coins = action.payload
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch coins'
      })
  },
})

export const { setSearchQuery, toggleFavorite } = cryptoSlice.actions
export default cryptoSlice.reducer
