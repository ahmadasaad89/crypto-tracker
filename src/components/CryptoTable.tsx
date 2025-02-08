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
import { useDispatch, useSelector } from 'react-redux'

import {
  selectCoins,
  selectFavorites,
  selectSearchQuery,
} from '../features/cryptoSelectors'
import { Coin, toggleFavorite } from '../features/cryptoSlice'
import CryptoRow from './CryptoRow'

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

const CryptoTable = () => {
  const dispatch = useDispatch()

  const coins = useSelector(selectCoins)
  const searchQuery = useSelector(selectSearchQuery)
  const favorites = useSelector(selectFavorites)

  const filteredCoins: Coin[] = coins.filter(
    (coin: Coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
          {filteredCoins.map((coin, index) => (
            <CryptoRow
              key={coin.id}
              coin={coin}
              index={index}
              isFavorite={favorites.includes(coin.id)}
              onToggleFavorite={() => dispatch(toggleFavorite(coin.id))}
            />
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  )
}

export default CryptoTable
