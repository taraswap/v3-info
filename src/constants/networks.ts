import TaraxaLogo from '../assets/images/taraxa-logo.png'
import { ChainId } from '@taraswap/sdk-core'

export enum SupportedNetwork {
  TARAXA,
}

export type NetworkInfo = {
  chainId: ChainId
  id: SupportedNetwork
  route: string
  name: string
  imageURL: string
  bgColor: string
  primaryColor: string
  secondaryColor: string
}

export const TaraxaNetworkInfo: NetworkInfo = {
  chainId: ChainId.TARAXA,
  id: SupportedNetwork.TARAXA,
  route: 'taraxa',
  name: 'Taraxa',
  bgColor: '#15AC5B',
  primaryColor: '#15AC5B',
  secondaryColor: '#FF41F4',
  imageURL: TaraxaLogo,
}

export const SUPPORTED_NETWORK_VERSIONS: NetworkInfo[] = [TaraxaNetworkInfo]
