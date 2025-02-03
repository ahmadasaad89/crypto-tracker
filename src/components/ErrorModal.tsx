import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'

interface ErrorModalProps {
  open: boolean
  onClose: () => void
  errorMessage: string
}
const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
  textAlign: 'center',
  outline: 'none',
}

const ErrorModal: React.FC<ErrorModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalBoxStyle}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Too Many Requests
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          The CoinGecko API has a rate limit of 10-50 requests per minute. Please try
          again later...
        </Typography>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  )
}

export default ErrorModal
