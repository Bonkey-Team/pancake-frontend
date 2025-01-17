import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Button, Flex, Text, InjectedModalProps } from 'plkit'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { getPancakeProfileAddress } from 'utils/addressHelpers'
import { useBnky } from 'hooks/useContract'
import useI18n from 'hooks/useI18n'
import useGetProfileCosts from 'hooks/useGetProfileCosts'
import useHasBnkyBalance from 'hooks/useHasBnkyBalance'
import { useProfile } from 'state/hooks'
import { UseEditProfileResponse } from './reducer'
import ProfileAvatar from '../ProfileAvatar'

interface StartPageProps extends InjectedModalProps {
  goToChange: UseEditProfileResponse['goToChange']
  goToRemove: UseEditProfileResponse['goToRemove']
  goToApprove: UseEditProfileResponse['goToApprove']
}

const DangerOutline = styled(Button).attrs({ variant: 'secondary' })`
  border-color: ${({ theme }) => theme.colors.failure};
  color: ${({ theme }) => theme.colors.failure};
  margin-bottom: 24px;

  &:hover:not(:disabled):not(.button--disabled):not(:active) {
    border-color: ${({ theme }) => theme.colors.failure};
    opacity: 0.8;
  }
`

const AvatarWrapper = styled.div`
  height: 64px;
  width: 64px;

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 128px;
    width: 128px;
  }
`

const StartPage: React.FC<StartPageProps> = ({ goToApprove, goToChange, goToRemove, onDismiss }) => {
  const [needsApproval, setNeedsApproval] = useState(null)
  const { profile } = useProfile()
  const { numberCakeToUpdate, numberCakeToReactivate } = useGetProfileCosts()
  const minimumBnkyRequired = profile.isActive ? numberCakeToUpdate : numberCakeToReactivate
  const hasMinimumBnkyRequired = useHasBnkyBalance(minimumBnkyRequired)
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const bnkyContract = useBnky()
  const cost = profile.isActive ? numberCakeToUpdate : numberCakeToReactivate

  /**
   * Check if the wallet has the required BNKY allowance to change their profile pic or reactivate
   * If they don't, we send them to the approval screen first
   */
  useEffect(() => {
    const checkApprovalStatus = async () => {
      const response = await bnkyContract.methods.allowance(account, getPancakeProfileAddress()).call()
      const currentAllowance = new BigNumber(response)
      setNeedsApproval(currentAllowance.lt(cost))
    }

    if (account) {
      checkApprovalStatus()
    }
  }, [account, cost, setNeedsApproval, bnkyContract])

  if (!profile) {
    return null
  }

  return (
    <Flex alignItems="center" justifyContent="center" flexDirection="column">
      <AvatarWrapper>
        <ProfileAvatar profile={profile} />
      </AvatarWrapper>
      <Flex alignItems="center" style={{ height: '48px' }} justifyContent="center">
        <Text as="p" color="failure">
          {!hasMinimumBnkyRequired &&
            TranslateString(999, `${getFullDisplayBalance(minimumBnkyRequired)} BNKY required to change profile pic`)}
        </Text>
      </Flex>
      {profile.isActive ? (
        <>
          <Button
            width="100%"
            mb="8px"
            onClick={needsApproval === true ? goToApprove : goToChange}
            disabled={!hasMinimumBnkyRequired || needsApproval === null}
          >
            {TranslateString(999, 'Change Profile Pic')}
          </Button>
          <DangerOutline width="100%" onClick={goToRemove}>
            {TranslateString(999, 'Remove Profile Pic')}
          </DangerOutline>
        </>
      ) : (
        <Button
          width="100%"
          mb="8px"
          onClick={needsApproval === true ? goToApprove : goToChange}
          disabled={!hasMinimumBnkyRequired || needsApproval === null}
        >
          {TranslateString(999, 'Reactivate Profile')}
        </Button>
      )}
      <Button variant="text" width="100%" onClick={onDismiss}>
        {TranslateString(999, 'Close Window')}
      </Button>
    </Flex>
  )
}

export default StartPage
