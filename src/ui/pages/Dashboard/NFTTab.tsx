import { Disclosure, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { ArrowRightSLine } from '../../components/common/icons'

interface nftData {
  token_address: string
  token_id: string
  amount: string
  token_hash: string
  block_number_minted: string
  updated_at: string | null
  contract_type: string
  name: string
  symbol: string
  token_uri: string
  metadata: string
  last_token_uri_sync: string
  last_metadata_sync: string
  minter_address: string
}

interface parsedNFTData {
  collectionName: string
  collectionSymbol: string
  imageSrc: string
  tokenId: string
}

// The plan here is to collect the NFT data and group into collections if needed. We'll show the NFTs as dropdown items
const data: nftData[] = [
  {
    token_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    token_id: '7962',
    amount: '1',
    token_hash: 'fffadc852b4f47c75f65838ba2870ab1',
    block_number_minted: '12347184',
    updated_at: null,
    contract_type: 'ERC721',
    name: 'BoredApeYachtClub',
    symbol: 'BAYC',
    token_uri:
      'https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/7962',
    metadata:
      '{"image":"ipfs://QmWX3Kx2NX3AK8WxTQwktVYLMFHX3pHm77ThynhgmU8dP8","attributes":[{"trait_type":"Mouth","value":"Bored Cigarette"},{"trait_type":"Background","value":"Army Green"},{"trait_type":"Eyes","value":"Eyepatch"},{"trait_type":"Clothes","value":"Tuxedo Tee"},{"trait_type":"Fur","value":"Brown"}]}',
    last_token_uri_sync: '2022-10-04T14:48:30.624Z',
    last_metadata_sync: '2022-10-04T16:31:28.170Z',
    minter_address: '0x6e7ae8dee2f39eb521cca1762e0dadfccd2e88b2'
  },
  {
    token_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    token_id: '123',
    amount: '1',
    token_hash: 'fff9f1cd1c3e3c3d16fcadad545b1a8f',
    block_number_minted: '12312790',
    updated_at: null,
    contract_type: 'ERC721',
    name: 'BoredApeYachtClub',
    symbol: 'BAYC',
    token_uri:
      'https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/123',
    metadata:
      '{"image":"ipfs://QmVP1tqb9jf6XCkZZXkqGfTAtS8KwXHKHvkePh62zyL65n","attributes":[{"trait_type":"Clothes","value":"Black Holes T"},{"trait_type":"Fur","value":"White"},{"trait_type":"Eyes","value":"Coins"},{"trait_type":"Background","value":"New Punk Blue"},{"trait_type":"Mouth","value":"Bored Cigar"},{"trait_type":"Hat","value":"Spinner Hat"}]}',
    last_token_uri_sync: '2022-10-04T14:48:48.045Z',
    last_metadata_sync: '2022-10-04T14:48:50.174Z',
    minter_address: '0x643ce52422b668f0e226dd21b4bb8d3a1fabca51'
  },
  {
    token_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    token_id: '8492',
    amount: '1',
    token_hash: 'fff1ee52e869e6d806fc6f18a7483e21',
    block_number_minted: '12347203',
    updated_at: null,
    contract_type: 'ERC721',
    name: 'BoredApeYachtClub',
    symbol: 'BAYC',
    token_uri:
      'https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/8492',
    metadata:
      '{"image":"ipfs://QmcCBVydFzmuuQfTm4oXPNyvumnku3QHffHmYEQw4oGriD","attributes":[{"trait_type":"Eyes","value":"Angry"},{"trait_type":"Background","value":"Orange"},{"trait_type":"Hat","value":"Commie Hat"},{"trait_type":"Clothes","value":"Black T"},{"trait_type":"Mouth","value":"Jovial"},{"trait_type":"Fur","value":"Pink"}]}',
    last_token_uri_sync: '2022-10-04T14:49:59.314Z',
    last_metadata_sync: '2022-10-04T14:50:00.676Z',
    minter_address: '0x29b3340f6c8e292a65ab5067632fe7e65fcb7b12'
  },
  {
    token_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    token_id: '2771',
    amount: '1',
    token_hash: 'ffedf09407efead26382273f2d43a795',
    block_number_minted: '12346825',
    updated_at: null,
    contract_type: 'ERC721',
    name: 'BoredApeYachtClub',
    symbol: 'BAYC',
    token_uri:
      'https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/2771',
    metadata:
      '{"image":"ipfs://QmbFBUR8y9Xhwv7nQdiy1Xafyxu3i8BaFThts2UyxM73Ge","attributes":[{"trait_type":"Eyes","value":"Holographic"},{"trait_type":"Background","value":"Gray"},{"trait_type":"Clothes","value":"Stunt Jacket"},{"trait_type":"Mouth","value":"Bored Cigarette"},{"trait_type":"Fur","value":"Robot"},{"trait_type":"Hat","value":"Prussian Helmet"}]}',
    last_token_uri_sync: '2022-10-04T14:49:23.738Z',
    last_metadata_sync: '2022-10-04T14:49:27.266Z',
    minter_address: '0x1766255e71a11f9f9d13abe3f2840e3f6942aa29'
  },
  {
    token_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    token_id: '2771',
    amount: '1',
    token_hash: 'ffedf09407efead26382273f2d43a795',
    block_number_minted: '12346825',
    updated_at: null,
    contract_type: 'ERC721',
    name: 'Messario',
    symbol: 'MSR',
    token_uri:
      'https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/2771',
    metadata:
      '{"image":"ipfs://QmbFBUR8y9Xhwv7nQdiy1Xafyxu3i8BaFThts2UyxM73Ge","attributes":[{"trait_type":"Eyes","value":"Holographic"},{"trait_type":"Background","value":"Gray"},{"trait_type":"Clothes","value":"Stunt Jacket"},{"trait_type":"Mouth","value":"Bored Cigarette"},{"trait_type":"Fur","value":"Robot"},{"trait_type":"Hat","value":"Prussian Helmet"}]}',
    last_token_uri_sync: '2022-10-04T14:49:23.738Z',
    last_metadata_sync: '2022-10-04T14:49:27.266Z',
    minter_address: '0x1766255e71a11f9f9d13abe3f2840e3f6942aa29'
  },
  {
    token_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    token_id: '5684',
    amount: '1',
    token_hash: 'ffedf09407efead26382273f2d43a795',
    block_number_minted: '12346825',
    updated_at: null,
    contract_type: 'ERC721',
    name: 'Messario',
    symbol: 'MSR',
    token_uri:
      'https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/2771',
    metadata:
      '{"image":"ipfs://QmbFBUR8y9Xhwv7nQdiy1Xafyxu3i8BaFThts2UyxM73Ge","attributes":[{"trait_type":"Eyes","value":"Holographic"},{"trait_type":"Background","value":"Gray"},{"trait_type":"Clothes","value":"Stunt Jacket"},{"trait_type":"Mouth","value":"Bored Cigarette"},{"trait_type":"Fur","value":"Robot"},{"trait_type":"Hat","value":"Prussian Helmet"}]}',
    last_token_uri_sync: '2022-10-04T14:49:23.738Z',
    last_metadata_sync: '2022-10-04T14:49:27.266Z',
    minter_address: '0x1766255e71a11f9f9d13abe3f2840e3f6942aa29'
  },
  {
    token_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    token_id: '2771',
    amount: '1',
    token_hash: 'ffedf09407efead26382273f2d43a795',
    block_number_minted: '12346825',
    updated_at: null,
    contract_type: 'ERC721',
    name: 'Desert',
    symbol: 'DEST',
    token_uri:
      'https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/2771',
    metadata:
      '{"image":"ipfs://QmbFBUR8y9Xhwv7nQdiy1Xafyxu3i8BaFThts2UyxM73Ge","attributes":[{"trait_type":"Eyes","value":"Holographic"},{"trait_type":"Background","value":"Gray"},{"trait_type":"Clothes","value":"Stunt Jacket"},{"trait_type":"Mouth","value":"Bored Cigarette"},{"trait_type":"Fur","value":"Robot"},{"trait_type":"Hat","value":"Prussian Helmet"}]}',
    last_token_uri_sync: '2022-10-04T14:49:23.738Z',
    last_metadata_sync: '2022-10-04T14:49:27.266Z',
    minter_address: '0x1766255e71a11f9f9d13abe3f2840e3f6942aa29'
  }
]

const parseNFTData = (data: nftData[]): parsedNFTData[] => {
  return data.map((nft) => ({
    collectionName: nft.name,
    collectionSymbol: nft.symbol,
    imageSrc: JSON.parse(nft.metadata).image,
    tokenId: nft.token_id
  }))
}

// console.log(parseNFTData(data))

const groupDataByCollections = (data: parsedNFTData[]) => {
  return data.reduce((acc, curr) => {
    acc[curr.collectionName] = acc[curr.collectionName] || []
    acc[curr.collectionName].push(curr)
    return acc
  }, Object.create(null))
}

// console.log(groupDataByCollections(parseNFTData(data)))

const NFTTab = () => {
  const collections: Record<string, parsedNFTData[]> = groupDataByCollections(
    parseNFTData(data)
  )

  return (
    <section className="h-[280px] overflow-y-auto mb-1">
      {Object.entries(collections).map(([name, nfts], index) => (
        <Disclosure key={index}>
          {({ open }) => (
            <>
              <Disclosure.Button className="group flex justify-between items-center w-full hover:bg-skin-light-gray/80 hover:cursor-pointer p-2 rounded-lg transition duration-200 ease-out focus:outline-none border-2 border-transparent focus:border-skin-inverse/44">
                <div className="flex items-center gap-2">
                  <div className="rounded-full h-6 w-6 relative overflow-hidden shadow-md">
                    <img
                      src={'https://via.placeholder.com/24'}
                      alt={name || 'Collection image'}
                    />
                  </div>
                  <p className="text-skin-text-primary font-semibold">{name}</p>
                </div>
                <div className="flex items-center gap-1">
                  <p>{nfts.length}</p>
                  <ArrowRightSLine
                    className={clsx(
                      'fill-skin-text-primary/50 group-hover:fill-skin-text-primary transition duration-200 ease-out group-hover:translate-x-1',
                      open ? 'rotate-90' : 'rotate-0'
                    )}
                  />
                </div>
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="flex gap-3 p-1 flex-wrap">
                  {nfts.map((nft, index) => (
                    <div
                      key={index}
                      className="w-44 h-44 bg-red-200 rounded-md hover:scale-105 transition-transform duration-200 ease-out flex items-center justify-center overflow-hidden"
                    >
                      <img src={nft.imageSrc} alt={`${name}#${nft.tokenId}`} />
                    </div>
                  ))}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      ))}
    </section>
  )
}

export default NFTTab
