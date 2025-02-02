import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { IconButton, styled } from '@mui/material'
import React from 'react'

interface Props {
  isFavorite: boolean
  onToggle: () => void
}

const StyledIconButton = styled(IconButton)({
  width: '28px',
  height: '28px',
  padding: 0,
})

const FavoriteButton: React.FC<Props> = ({ isFavorite, onToggle }) => {
  return (
    <StyledIconButton onClick={onToggle}>
      {isFavorite ? (
        <StarIcon sx={{ color: '#FFD700', fontSize: '20px' }} />
      ) : (
        <StarBorderIcon sx={{ color: '#777', fontSize: '20px' }} />
      )}
    </StyledIconButton>
  )
}

export default FavoriteButton
