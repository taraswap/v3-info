import { JsonRpcProvider, Contract, formatUnits } from 'ethers'

const erc20ABI = ['function balanceOf(address owner) view returns (uint256)']

export async function getCirculatingSupply() {
  const provider = new JsonRpcProvider(process.env.REACT_APP_NETWORK_URL ?? 'https://rpc.mainnet.taraxa.io')
  const treasuryAddress = '0x2bF93378d68D2a6137EE9e6fA04FEF5D07b615d3'
  const tokenAddress = '0x712037beab9a29216650b8d032b4d9a59af8ad6c'

  const tokenContract = new Contract(tokenAddress, erc20ABI, provider)

  const balance = await tokenContract.balanceOf(treasuryAddress)

  return 1e9 - parseFloat(formatUnits(balance, 18))
}
