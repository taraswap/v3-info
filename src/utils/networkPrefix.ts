import { TaraxaNetworkInfo, NetworkInfo } from 'constants/networks'

export function networkPrefix(activeNewtork: NetworkInfo) {
  const isTaraxa = activeNewtork === TaraxaNetworkInfo
  if (isTaraxa) {
    return '/'
  }
  const prefix = '/' + activeNewtork.route.toLocaleLowerCase() + '/'
  return prefix
}
