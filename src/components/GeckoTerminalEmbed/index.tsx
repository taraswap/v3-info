import React, { useState } from 'react'
import styled from 'styled-components'

interface GeckoTerminalEmbedProps {
  network: string
  poolAddress: string
  info?: number
  swaps?: number
  grayscale?: number
  lightChart?: number
  chartType?: string
  resolution?: string
}

const IframeWrapper = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #191b1f;
  border: 1px solid #ffffff52;
  border-radius: 16px;
  overflow: hidden;

  @media screen and (max-width: 900px) {
    height: 65vh;
  }
`

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`

const ErrorMessage = styled.div`
  position: absolute;
  text-align: center;
  color: #cf5e5e;
  font-size: 22px;
  font-weight: bold;

  @media screen and (max-width: 900px) {
    font-size: 18px;
  }
`

const GeckoTerminalEmbed: React.FC<GeckoTerminalEmbedProps> = ({
  network,
  poolAddress,
  info = 0,
  swaps = 0,
  grayscale = 0,
  lightChart = 0,
  chartType = 'price',
  resolution = '15m',
}) => {
  const [error, setError] = useState(false)

  const src = `https://www.geckoterminal.com/${network}/pools/${poolAddress}?embed=1&info=${info}&swaps=${swaps}&grayscale=${grayscale}&light_chart=${lightChart}&chart_type=${chartType}&resolution=${resolution}`

  return (
    <IframeWrapper>
      {!error ? (
        <StyledIframe
          id="geckoterminal-embed"
          title="GeckoTerminal Embed"
          src={src}
          allow="clipboard-write"
          allowFullScreen
          onError={() => setError(true)}
        />
      ) : (
        <ErrorMessage>Failed to load GeckoTerminal. Please try again later.</ErrorMessage>
      )}
    </IframeWrapper>
  )
}
export default GeckoTerminalEmbed
