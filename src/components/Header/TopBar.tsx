import React from 'react'
import styled from 'styled-components'
import { AutoRow, RowBetween, RowFixed } from 'components/Row'
import { ExternalLink, TYPE } from 'theme'
import { useEthPrices } from 'hooks/useEthPrices'
import { formatDollarAmount } from 'utils/numbers'
import Polling from './Polling'

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.black};
  padding: 10px 20px;
`

const Item = styled(TYPE.main)`
  font-size: 12px;
`

const StyledLink = styled(ExternalLink)`
  font-size: 12px;
  color: ${({ theme }) => theme.text1};
`

const TopBar = () => {
  const ethPrices = useEthPrices()
  return (
    <Wrapper>
      <RowBetween>
        <Polling />
        <AutoRow $gap="6px">
          <RowFixed>
            <Item>TARA Price:</Item>
            <Item fontWeight="700" ml="4px">
              {formatDollarAmount(ethPrices?.current)}
            </Item>
          </RowFixed>
        </AutoRow>
        <AutoRow $gap="6px" style={{ justifyContent: 'flex-end' }}>
          <StyledLink href={`${process.env.REACT_APP_BASE_DOCS_URL}`}>Docs</StyledLink>
          <StyledLink href={`${process.env.REACT_APP_BASE_URL}/#/swap`}>App</StyledLink>
        </AutoRow>
      </RowBetween>
    </Wrapper>
  )
}

export default TopBar
