import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { Avatar, Box, styled, TableCell, TableRow, Typography } from '@mui/material'
import React from 'react'
import { Line } from 'react-chartjs-2'
import { NavLink } from 'react-router'

import { Coin } from '../App'
import { formatPriceChange } from '../utils/helpers'
import FavoriteButton from './FavoriteButton'

interface Props {
  coin: Coin
  index: number
  isFavorite: boolean
  onToggleFavorite: () => void
}

const StyledTableRow = styled(TableRow)({
  cursor: 'pointer',
  '&:hover': { backgroundColor: '#f5f5f5' },
  height: '48px',
})

const NavigationLink = styled(NavLink)({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
  width: '100%',
  height: '100%',
  padding: '16px',
})

const BaseCell = styled(TableCell)({
  borderBottom: 'none',
  fontWeight: 'bold',
  padding: 0,
})

const StarCell = styled(BaseCell)({
  width: '40px',
  textAlign: 'center',
  padding: '16px',
})

const NumberCell = styled(BaseCell)({
  width: '40px',
  textAlign: 'center',
  color: '#666',
})

const NameCell = styled(BaseCell)({})

const PriceCell = styled(BaseCell)({ color: '#000', textAlign: 'right' })

const ChangeCell = styled(BaseCell)({
  textAlign: 'center',
})

const GraphCell = styled(BaseCell)({
  width: '100px',
  textAlign: 'center',
})

const ChangeBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'positive',
})<{ positive: boolean }>(({ positive }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  backgroundColor: positive ? '#eaf6ea' : '#fde8e8',
  padding: '4px 8px',
  borderRadius: '5px',
}))

const NameBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})

const StyledAvatar = styled(Avatar)({
  width: 28,
  height: 28,
})

const NameTypography = styled(Typography)({
  fontWeight: 'bold',
  color: '#000',
  fontSize: '14px',
})

const SymbolTypography = styled(Typography)({
  color: '#555',
  fontSize: '12px',
})

const CryptoRow: React.FC<Props> = ({ coin, index, isFavorite, onToggleFavorite }) => {
  const graphData = React.useMemo(
    () => ({
      labels: coin.sparkline_in_7d.price.map((_, i) => i),
      datasets: [
        {
          data: coin.sparkline_in_7d.price,
          borderColor: coin.price_change_percentage_24h > 0 ? '#77d368' : '#f45e5e',
          borderWidth: 1.8,
          pointRadius: 0,
        },
      ],
    }),
    [coin.sparkline_in_7d.price, coin.price_change_percentage_24h],
  )

  return (
    <StyledTableRow>
      <StarCell>
        <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
      </StarCell>

      <NumberCell>
        <NavigationLink to={`/coin/${coin.id}`}>{index + 1}</NavigationLink>
      </NumberCell>

      <NameCell>
        <NavigationLink to={`/coin/${coin.id}`}>
          <NameBox>
            <StyledAvatar src={coin.image} />
            <NameTypography>{coin.name}</NameTypography>
            <SymbolTypography>• {coin.symbol.toUpperCase()}</SymbolTypography>
          </NameBox>
        </NavigationLink>
      </NameCell>

      <PriceCell>
        <NavigationLink to={`/coin/${coin.id}`}>
          ${coin.current_price.toLocaleString()}
        </NavigationLink>
      </PriceCell>

      <ChangeCell>
        <NavigationLink to={`/coin/${coin.id}`}>
          <ChangeBox positive={coin?.price_change_percentage_24h > 0}>
            {coin.price_change_percentage_24h > 0 ? (
              <TrendingUpIcon sx={{ fontSize: 16, color: '#008000' }} />
            ) : (
              <TrendingDownIcon sx={{ fontSize: 16, color: '#d32f2f' }} />
            )}
            <Typography
              variant="body2"
              sx={{
                color: coin.price_change_percentage_24h > 0 ? '#008000' : '#d32f2f',
                fontSize: '14px',
              }}
            >
              {formatPriceChange(coin.price_change_percentage_24h)}
            </Typography>
          </ChangeBox>
        </NavigationLink>
      </ChangeCell>

      <GraphCell>
        <NavigationLink to={`/coin/${coin.id}`}>
          <Line
            data={graphData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              elements: { line: { tension: 0.2 } },
              scales: { x: { display: false }, y: { display: false } },
            }}
            height={30}
            width={100}
          />
        </NavigationLink>
      </GraphCell>
    </StyledTableRow>
  )
}

export default CryptoRow
