import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { Avatar, Box, TableCell, TableRow, Typography } from '@mui/material'
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

const CryptoRow: React.FC<Props> = ({ coin, index, isFavorite, onToggleFavorite }) => {
  return (
    <TableRow
      sx={{
        cursor: 'pointer',
        '&:hover': { backgroundColor: '#f5f5f5' },
        height: '48px',
      }}
    >
      <TableCell sx={{ width: '40px', textAlign: 'center', borderBottom: 'none' }}>
        <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
      </TableCell>

      <TableCell
        sx={{
          width: '40px',
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#666',
          borderBottom: 'none',
        }}
      >
        <NavLink
          to={`/coin/${coin.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {index + 1}
        </NavLink>
      </TableCell>

      <TableCell sx={{ borderBottom: 'none' }}>
        <NavLink
          to={`/coin/${coin.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar src={coin.image} sx={{ width: 28, height: 28 }} />
            <Typography sx={{ fontWeight: 'bold', color: '#000', fontSize: '14px' }}>
              {coin.name}
            </Typography>
            <Typography sx={{ color: '#555', fontSize: '12px' }}>
              • {coin.symbol.toUpperCase()}
            </Typography>
          </Box>
        </NavLink>
      </TableCell>

      <TableCell
        sx={{
          fontWeight: 'bold',
          color: '#000',
          textAlign: 'right',
          borderBottom: 'none',
        }}
      >
        <NavLink
          to={`/coin/${coin.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          ${coin.current_price.toLocaleString()}
        </NavLink>
      </TableCell>

      <TableCell
        sx={{ textAlign: 'center', padding: 1, fontWeight: 'bold', borderBottom: 'none' }}
      >
        <NavLink
          to={`/coin/${coin.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              backgroundColor:
                coin.price_change_percentage_24h > 0 ? '#eaf6ea' : '#fde8e8',
              padding: '4px 8px',
              borderRadius: '5px',
            }}
          >
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
          </Box>
        </NavLink>
      </TableCell>

      <TableCell sx={{ width: '100px', textAlign: 'center', borderBottom: 'none' }}>
        <NavLink
          to={`/coin/${coin.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Line
            data={{
              labels: coin.sparkline_in_7d.price.map((_, i) => i),
              datasets: [
                {
                  data: coin.sparkline_in_7d.price,
                  borderColor:
                    coin.price_change_percentage_24h > 0 ? '#77d368' : '#f45e5e',
                  borderWidth: 1.8,
                  pointRadius: 0,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              elements: { line: { tension: 0.2 } },
              scales: { x: { display: false }, y: { display: false } },
            }}
            height={30}
            width={100}
          />
        </NavLink>
      </TableCell>
    </TableRow>
  )
}

export default CryptoRow
