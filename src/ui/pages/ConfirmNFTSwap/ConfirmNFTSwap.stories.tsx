import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import ConfirmNFTSwapPage from '.'
import { parsedNFTDetails } from '../Dashboard/NFTTab'

export default {
  title: 'Confirmations/NFTSwap',
  component: ConfirmNFTSwapPage
} as ComponentMeta<typeof ConfirmNFTSwapPage>

const nftDetails: parsedNFTDetails = {
  collectionName: 'BoredApeYachtClub',
  collectionSymbol: 'BAYC',
  imageSrc:
    'https://ipfs.io/ipfs/QmWX3Kx2NX3AK8WxTQwktVYLMFHX3pHm77ThynhgmU8dP8',
  tokenId: '7962'
}

export const Playground: ComponentStory<typeof ConfirmNFTSwapPage> = () => (
  <BrowserRouter>
    <ConfirmNFTSwapPage data={nftDetails} />
  </BrowserRouter>
)
