import SearchIcon from '@mui/icons-material/Search'
import { AppBar, Box, InputBase, styled, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'

import { setSearchQuery } from '../features/cryptoSlice'
import { RootState } from '../store/store'

const StyledAppBar = styled(AppBar)({
  position: 'static',
  backgroundColor: 'white',
  boxShadow: '0px 2px 4px  rgba(0,0,0,0.1)',
  padding: '16px 0',
})

const LogoText = styled(Typography)({
  fontFamily: '"Inter", "Poppins", "Roboto", sans-serif',
  fontSize: '36px',
  fontWeight: 'bold',
  textAlign: 'center',
  flexGrow: 1,
  color: 'black',
})

const Subtitle = styled(Typography)({
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

const Logo = styled(Box)({
  flexGrow: 1,
  textAlign: 'center',
})

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector((state: RootState) => state.crypto.searchQuery)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <StyledAppBar>
      <Toolbar
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          textAlign: 'center',
          gap: { xs: 2, md: 0 },
          justifyContent: { xs: 'center', md: 'space-between' },
        }}
      >
        {isHomePage && <SideBox />}

        <Logo>
          <LogoText variant="h1">Crypto Tracker</LogoText>
          <Subtitle variant="subtitle1">
            Tracking crypto so you don&apos;t have to!
          </Subtitle>
        </Logo>

        {isHomePage && (
          <SideBox>
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
      </Toolbar>
    </StyledAppBar>
  )
}

export default Header
