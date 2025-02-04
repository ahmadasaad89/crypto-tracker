import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface ChartDataPoint {
  time: string
  price: number
}

interface ChartState {
  chartData: ChartDataPoint[]
  loading: boolean
  error: string | null
  timeRange: string
}

const initialState: ChartState = {
  chartData: [],
  loading: false,
  error: null,
  timeRange: '30d',
}

export const fetchChartData = createAsyncThunk(
  'chart/fetchChartData',
  async ({ coinId, timeRange }: { coinId: string; timeRange: string }) => {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency: 'usd',
          days: timeRange,
          interval: 'daily',
        },
      },
    )

    return response.data.prices.map((price: [number, number]) => ({
      time: new Date(price[0]).toLocaleDateString(),
      price: price[1],
    }))
  },
)

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setTimeRange: (state, action) => {
      state.timeRange = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.loading = false
        state.chartData = action.payload
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch chart data'
      })
  },
})

export const { setTimeRange } = chartSlice.actions
export default chartSlice.reducer
