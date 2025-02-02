import SearchIcon from '@mui/icons-material/Search'
import {
  AppBar,
  Box,
  Button,
  InputBase,
  styled,
  Toolbar,
  Typography,
} from '@mui/material'
import React from 'react'

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'white',
  boxShadow: 'none',
  borderBottom: '1px solid #ddd',
  padding: '16px 0',
})

const LogoText = styled(Typography)({
  fontFamily: '"Old English Five", serif',
  fontSize: '36px',
  fontWeight: 'bold',
  textAlign: 'center',
  flexGrow: 1,
  color: 'black',
})

const DateText = styled(Typography)({
  fontSize: '14px',
  textAlign: 'center',
  color: '#555',
})

const SubscribeButton = styled(Button)({
  backgroundColor: '#3f51b5',
  color: 'white',
  fontWeight: 'bold',
  padding: '6px 12px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
})

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#f1f1f1',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
  marginLeft: 0,
  width: '100%',
  maxWidth: '250px',
  display: 'flex',
  alignItems: 'center',
  padding: '4px 10px',
}))

const SearchIconWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginRight: '8px',
  color: '#666',
})

const StyledInputBase = styled(InputBase)({
  color: 'black',
  width: '100%',
  fontSize: '14px',
  '& .MuiInputBase-input': {
    padding: '4px 8px',
    transition: 'width 0.3s ease-in-out',
  },
})

const Header: React.FC = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        <Box sx={{ textAlign: 'center' }}>
          <LogoText variant="h1">Crypto Tracker</LogoText>
          <DateText variant="subtitle1">
            Tracking crypto so you don&apos;t have to!
          </DateText>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <SubscribeButton variant="contained">SUBSCRIBE</SubscribeButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  )
}

export default Header
