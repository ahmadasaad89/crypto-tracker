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
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

import {
  selectChartData,
  selectChartError,
  selectChartLoading,
  selectTimeRange,
} from '../features/chartSelectors'
import { fetchChartData, setTimeRange } from '../features/chartSlice'
import { selectFavorites } from '../features/cryptoSelectors'
import { toggleFavorite } from '../features/cryptoSlice'
import { AppDispatch } from '../store/store'
import ErrorModal from './ErrorModal'

const StyledButton = styled(Button)({
  textTransform: 'none',
  margin: '0 5px',
  backgroundColor: '#f5f5f5',
  '&.active': {
    backgroundColor: '#333',
    color: '#fff',
  },
})

const Container = styled(Box)({
  maxWidth: '900px',
  margin: 'auto',
  padding: '24px',
})

const Header = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '24px',
})

const RangeButtonGroup = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
  marginBottom: '24px',
})

const ChartContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
})

const BackButton = styled(Button)({
  backgroundColor: '#f7931a',
  color: 'white',
  fontWeight: 'bold',
  padding: '10px 20px',
  textTransform: 'none',
  fontSize: '16px',
  borderRadius: '24px',
  boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
  marginTop: '24px',
  '&:hover': { backgroundColor: '#e67e22' },
})

const CryptoDetails = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const chartData = useSelector(selectChartData)
  const loading = useSelector(selectChartLoading)
  const error = useSelector(selectChartError)
  const timeRange = useSelector(selectTimeRange)
  const favorites = useSelector(selectFavorites)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const isFavorite = favorites.includes(id as string)

  useEffect(() => {
    if (id) {
      dispatch(fetchChartData({ coinId: id, timeRange }))
    }
  }, [id, timeRange, dispatch])

  useEffect(() => {
    if (error) {
      setIsModalOpen(true)
    }
  }, [error])

  return (
    <Container>
      <Header>
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
      </Header>

      <RangeButtonGroup>
        {['1', '7', '30', '365'].map((range) => (
          <StyledButton
            key={range}
            className={timeRange === range ? 'active' : ''}
            onClick={() => dispatch(setTimeRange(range))}
          >
            {range === '1' ? '24H' : range === '7' ? '7D' : range === '30' ? '30D' : '1Y'}
          </StyledButton>
        ))}
      </RangeButtonGroup>

      <ChartContainer>
        {loading ? (
          <CircularProgress />
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

        <BackButton onClick={() => navigate('/')}>Back to Crypto List</BackButton>
      </ChartContainer>

      {error && (
        <ErrorModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          errorMessage={error || 'An unknown error occurred.'}
        />
      )}
    </Container>
  )
}

export default CryptoDetails
