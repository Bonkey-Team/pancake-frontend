import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 93,
    stakingToken: tokens.bnky,
    earningToken: tokens.bnky,
    contractAddress: {
      97: '',
      56: '0x7c570465750e4659677e3fE08127435FCbcB9111',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 999,
    tokenPerBlock: '0.05',
  },
]

export default pools
