import SearchIcon from '@mui/icons-material/Search'
import { AppBar, Box, InputBase, styled, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'

import { setSearchQuery } from '../features/cryptoSlice'
import { RootState } from '../store/store'
const StyledAppBar = styled(AppBar)({
  backgroundColor: 'white',
  boxShadow: '0px 2px 4px  rgba(0,0,0,0.1)',
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

const Search = styled('div')(() => ({
  position: 'relative',
  borderRadius: 4,
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

const SideBox = styled(Box)({
  width: '250px',
})

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector((state: RootState) => state.crypto.searchQuery)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        {isHomePage && (
          <SideBox
            sx={{
              width: '250px',
              display: isHomePage ? 'block' : 'none',
            }}
          >
            {location.pathname === '/' && (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                />
              </Search>
            )}
          </SideBox>
        )}

        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
          <LogoText variant="h1">Crypto Tracker</LogoText>
          <DateText variant="subtitle1">
            Tracking crypto so you don&apos;t have to!
          </DateText>
        </Box>

        {isHomePage && (
          <SideBox
            sx={{
              width: '250px',
              display: isHomePage ? 'block' : 'none',
            }}
          />
        )}
      </Toolbar>
    </StyledAppBar>
  )
}

export default Header
