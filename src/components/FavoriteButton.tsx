import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { IconButton } from '@mui/material'
import React from 'react'

interface Props {
  isFavorite: boolean
  onToggle: () => void
}

const FavoriteButton: React.FC<Props> = ({ isFavorite, onToggle }) => {
  return (
    <IconButton sx={{ width: '28px', height: '28px', padding: 0 }} onClick={onToggle}>
      {isFavorite ? (
        <StarIcon sx={{ color: '#FFD700', fontSize: '20px' }} />
      ) : (
        <StarBorderIcon sx={{ color: '#777', fontSize: '20px' }} />
      )}
    </IconButton>
  )
}

export default FavoriteButton
