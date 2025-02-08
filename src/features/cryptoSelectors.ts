import { RootState } from '../store/store'

export const selectCrypto = (state: RootState) => state.crypto
export const selectCoins = (state: RootState) => state.crypto.coins
export const selectSearchQuery = (state: RootState) => state.crypto.searchQuery
export const selectFavorites = (state: RootState) => state.crypto.favorites
export const selectCryptoLoading = (state: RootState) => state.crypto.loading
export const selectCryptoError = (state: RootState) => state.crypto.error
