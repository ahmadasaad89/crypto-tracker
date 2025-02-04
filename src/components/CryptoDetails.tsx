import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  styled,
  Typography,
} from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

import { fetchChartData, setTimeRange } from '../features/chartSlice'
import { toggleFavorite } from '../features/cryptoSlice'
import { AppDispatch, RootState } from '../store/store'

const StyledButton = styled(Button)({
  textTransform: 'none',
  margin: '0 5px',
  backgroundColor: '#f5f5f5',
  '&.active': {
    backgroundColor: '#333',
    color: '#fff',
  },
})

const CryptoDetails = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()

  const { chartData, loading, error, timeRange } = useSelector(
    (state: RootState) => state.chart,
  )
  const { favorites } = useSelector((state: RootState) => state.crypto)

  const isFavorite = favorites.includes(id as string)

  useEffect(() => {
    if (id) {
      dispatch(fetchChartData({ coinId: id, timeRange }))
    }
  }, [id, timeRange, dispatch])

  return (
    <Box sx={{ maxWidth: '900px', margin: 'auto', padding: '24px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Bitcoin Price Chart ({id?.toUpperCase()})
        </Typography>
        <IconButton onClick={() => dispatch(toggleFavorite(id as string))}>
          {isFavorite ? (
            <StarIcon sx={{ color: '#FFD700' }} />
          ) : (
            <StarBorderIcon sx={{ color: '#777' }} />
          )}
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
        {['1', '7', '30', '365'].map((range) => (
          <StyledButton
            key={range}
            className={timeRange === range ? 'active' : ''}
            onClick={() => dispatch(setTimeRange(range))}
          >
            {range === '1' ? '24H' : range === '7' ? '7D' : range === '30' ? '30D' : '1Y'}
          </StyledButton>
        ))}
      </Box>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <LineChart width={800} height={400} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#f7931a"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      )}
    </Box>
  )
}

export default CryptoDetails
