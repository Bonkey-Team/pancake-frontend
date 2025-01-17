import Cookies from 'js-cookie'
import { getProfileContract, getPancakeRabbitContract } from 'utils/contractHelpers'
import { Nft } from 'config/constants/types'
import { Profile } from 'state/types'
import { getTeam } from 'state/teams/helpers'
import nfts from 'config/constants/nfts'
import { transformProfileResponse } from './helpers'

const profileContract = getProfileContract()
const rabbitContract = getPancakeRabbitContract()
const profileApi = process.env.REACT_APP_API_PROFILE

export interface GetProfileResponse {
  hasRegistered: boolean
  profile?: Profile
}

const getUsername = async (address: string): Promise<string> => {
  try {
    const response = await fetch(`${profileApi}/api/users/${address}`)

    if (!response.ok) {
      return ''
    }

    const { username = '' } = await response.json()

    return username
  } catch (error) {
    return ''
  }
}

const getProfile = async (address: string): Promise<GetProfileResponse> => {
  try {
    const hasRegistered = (await profileContract.methods.hasRegistered(address).call()) as boolean

    if (!hasRegistered) {
      return { hasRegistered, profile: null }
    }

    const profileResponse = await profileContract.methods.getUserProfile(address).call()
    const { userId, teamId, tokenId, nftAddress, isActive } = transformProfileResponse(profileResponse)
    let { points} = transformProfileResponse(profileResponse)
    const team = await getTeam(teamId)
    const username = await getUsername(address)

    // If the profile is not active the tokenId returns 0, which is still a valid token id
    // so only fetch the nft data if active
    let nft: Nft
    if (isActive) {
      const bunnyId = await rabbitContract.methods.getWukongId(tokenId).call()
      nft = nfts.find((nftItem) => nftItem.bunnyId === Number(bunnyId))

      // Save the preview image in a cookie so it can be used on the exchange
      Cookies.set(
        `profile_${address}`,
        {
          username,
          avatar: `https://pancakeswap.finance/images/nfts/${nft.images.sm}`,
        },
        { domain: 'pancakeswap.finance', secure: true, expires: 30 },
      )
    }
    
    points /= 1000000000000000000

    const profile = {
      userId,
      points,
      teamId,
      tokenId,
      username,
      nftAddress,
      isActive,
      nft,
      team,
    } as Profile

    return { hasRegistered, profile }
  } catch (error) {
    return null
  }
}

export default getProfile
