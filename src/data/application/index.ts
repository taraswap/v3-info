import { useActiveNetworkVersion } from 'state/application/hooks'
import { healthClient } from './../../apollo/client'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { TaraxaNetworkInfo } from 'constants/networks'

export const SUBGRAPH_HEALTH = gql`
  query block {
    blocks(first: 1, orderBy: number, orderDirection: desc) {
      id
      number
    }
  }
`

interface HealthResponse {
  blocks: {
    id: string
    number: string
  }[]
}

/**
 * Fetch top addresses by volume
 */
export function useFetchedSubgraphStatus(): {
  available: boolean | null
  syncedBlock: number | undefined
  headBlock: number | undefined
} {
  const [activeNetwork] = useActiveNetworkVersion()

  const { loading, error, data } = useQuery<HealthResponse>(SUBGRAPH_HEALTH, {
    client: healthClient,
    fetchPolicy: 'network-only',
    variables: {
      name: activeNetwork === TaraxaNetworkInfo ? 'lara-staking/uniswap-v3' : 'uniswap/uniswap-v3',
    },
  })

  const parsed = data?.blocks[0]

  if (loading) {
    return {
      available: null,
      syncedBlock: undefined,
      headBlock: undefined,
    }
  }

  if ((!loading && !parsed) || error) {
    return {
      available: false,
      syncedBlock: undefined,
      headBlock: undefined,
    }
  }

  const syncedBlock = parsed?.number

  return {
    available: true,
    syncedBlock: syncedBlock ? parseFloat(syncedBlock) : undefined,
    headBlock: syncedBlock ? parseFloat(syncedBlock) : undefined,
  }
}
