import React, { useMemo } from 'react'
import styled from 'styled-components'
import { isAddress } from 'utils'
import Logo from '../Logo'
import { useCombinedActiveList } from 'state/lists/hooks'
import useHttpLocations from 'hooks/useHttpLocations'
import { useActiveNetworkVersion } from 'state/application/hooks'
import TaraxaLogo from '../../assets/images/taraxa-logo.png'
import { ChainId } from '@taraswap/sdk-core'
import { TaraxaNetworkInfo } from 'constants/networks'

export function chainIdToNetworkName(networkId: ChainId) {
  switch (networkId) {
    case ChainId.TARAXA:
      return 'taraxa'
    default:
      return 'taraxa'
  }
}

const getTokenLogoURL = ({ address, chainId }: { address: string; chainId: ChainId }) => {
  return chainId === ChainId.TARAXA
    ? `https://drive.google.com/file/d/1dnhJ9rdzFT9PRYp0r7wXkg3nIJNpIl0M/view?usp=sharing`
    : `https://raw.githubusercontent.com/uniswap/assets/master/blockchains/${chainIdToNetworkName(
        chainId,
      )}/assets/${address}/logo.png`
}

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.text4};
`

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

export default function CurrencyLogo({
  address,
  size = '24px',
  style,
  ...rest
}: {
  address?: string
  size?: string
  style?: React.CSSProperties
}) {
  const taraxaList = useCombinedActiveList()?.[ChainId.TARAXA]

  const [activeNetwork] = useActiveNetworkVersion()

  const checkSummed = isAddress(address)

  const taraxaURI = useMemo(() => {
    if (checkSummed && taraxaList?.[checkSummed]) {
      return taraxaList?.[checkSummed].token.logoURI
    }
    return undefined
  }, [checkSummed, taraxaList])
  const uriLocationsTaraxa = useHttpLocations(taraxaURI)

  //temp until token logo issue merged
  const tempSources: { [address: string]: string } = useMemo(() => {
    return {
      ['0x4dd28568d05f09b02220b09c2cb307bfd837cb95']:
        'https://assets.coingecko.com/coins/images/18143/thumb/wCPb0b88_400x400.png?1630667954',
    }
  }, [])

  const srcs: string[] = useMemo(() => {
    const checkSummed = isAddress(address)

    if (checkSummed && address) {
      const override = tempSources[address]
      return [
        getTokenLogoURL({ address: checkSummed, chainId: activeNetwork.chainId }),
        ...uriLocationsTaraxa,
        override,
      ]
    }
    return []
  }, [address, tempSources, activeNetwork.chainId, uriLocationsTaraxa])

  if (activeNetwork === TaraxaNetworkInfo && address === '0x5d0fa4c5668e5809c83c95a7cef3a9dd7c68d4fe') {
    return <StyledEthereumLogo src={TaraxaLogo} size={size} style={style} {...rest} />
  }

  return <StyledLogo size={size} srcs={srcs} alt={'token logo'} style={style} {...rest} />
}
