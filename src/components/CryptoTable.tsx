import {
  Paper,
  styled,
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

const StyledTable = styled(Table)({
  borderCollapse: 'separate',
  borderSpacing: '0 8px',
  borderBottom: 'none',
})

const HeaderCell = styled(TableCell)({
  borderBottom: 'none',
  fontWeight: 'bold',
  color: '#000',
})

const StarCell = styled(HeaderCell)({
  width: '40px',
})

const NumberCell = styled(HeaderCell)({
  width: '40px',
  textAlign: 'center',
})

const NameCell = styled(HeaderCell)({
  width: 'auto',
})

const PriceCell = styled(HeaderCell)({
  width: '15%',
  textAlign: 'right',
})

const ChangeCell = styled(HeaderCell)({
  width: '15%',
  textAlign: 'center',
})

const GraphCell = styled(HeaderCell)({
  width: '15%',
  textAlign: 'center',
})

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
      <StyledTable>
        <TableHead>
          <TableRow>
            <StarCell />
            <NumberCell>#</NumberCell>
            <NameCell>Name</NameCell>
            <PriceCell>Price</PriceCell>
            <ChangeCell>24h Change</ChangeCell>
            <GraphCell>Price Graph (7D)</GraphCell>
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
      </StyledTable>
    </TableContainer>
  )
}

export default CryptoTable
