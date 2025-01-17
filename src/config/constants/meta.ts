import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'BonkeySwap',
  description:
    'The AMM for Bonkey no BSC! Earn BNKY through yield farming or win it in the Lottery, then stake it in Banana Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PancakeSwap), NFTs, and more, on a platform you can trust.',
  image: 'https://pancakeswap.finance/hero.png',
}

export const customMeta: { [key: string]: PageMeta } = {
  '/competition': {
    title: 'PancakeSwap Easter Battle',
    description: 'Register now for the PancakeSwap Easter battle!',
    image: 'https://pancakeswap.finance/images/easter-battle.png',
  },
}
