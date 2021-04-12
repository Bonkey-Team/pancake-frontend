import BigNumber from 'bignumber.js'
import { getBnkyAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's BNKY balance is at least the amount passed in
 */
const useHasBnkyBalance = (minimumBalance: BigNumber) => {
  const bnkyBalance = useTokenBalance(getBnkyAddress())
  return bnkyBalance.gte(minimumBalance)
}

export default useHasBnkyBalance
