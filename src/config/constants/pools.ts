import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 93,
    stakingToken: tokens.bnky,
    earningToken: tokens.bnky,
    contractAddress: {
      97: '',
      56: '0xd83705f55d57a5F6d7393118E2b77fa452f4ed98',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 999,
    tokenPerBlock: '0.05',
  },
]

export default pools
