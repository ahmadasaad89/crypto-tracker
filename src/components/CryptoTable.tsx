import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import React, { useState } from 'react'

import { Coin } from '../App'
import CryptoRow from './CryptoRow'

interface Props {
  coins: Coin[]
}

const CryptoTable: React.FC<Props> = ({ coins }) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const handleToggleFavorite = (coinId: string) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites)
      if (newFavorites.has(coinId)) {
        newFavorites.delete(coinId)
      } else {
        newFavorites.add(coinId)
      }
      return newFavorites
    })
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: '#fff', borderRadius: 3, boxShadow: 3 }}
    >
      <Table
        sx={{ borderCollapse: 'separate', borderSpacing: '0 8px', borderBottom: 'none' }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ width: '40px', textAlign: 'center', borderBottom: 'none' }}
            ></TableCell>
            <TableCell
              sx={{
                width: '40px',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#000',
                borderBottom: 'none',
              }}
            >
              #
            </TableCell>
            <TableCell
              sx={{
                width: 'auto',
                fontWeight: 'bold',
                color: '#000',
                borderBottom: 'none',
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                width: '15%',
                fontWeight: 'bold',
                color: '#000',
                textAlign: 'right',
                borderBottom: 'none',
              }}
            >
              Price
            </TableCell>
            <TableCell
              sx={{
                width: '15%',
                fontWeight: 'bold',
                color: '#000',
                textAlign: 'center',
                borderBottom: 'none',
              }}
            >
              24h Change
            </TableCell>
            <TableCell
              sx={{
                width: '15%',
                fontWeight: 'bold',
                color: '#000',
                textAlign: 'center',
                borderBottom: 'none',
              }}
            >
              Price Graph (7D)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin, index) => (
            <CryptoRow
              key={coin.id}
              coin={coin}
              index={index}
              isFavorite={favorites.has(coin.id)}
              onToggleFavorite={() => handleToggleFavorite(coin.id)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CryptoTable
