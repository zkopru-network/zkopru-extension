import { Disclosure, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { ArrowRightSLine } from '../../components/common/icons'

// The plan here is to collect the NFT data and group into collections if needed. We'll show the NFTs as dropdown items

const NFTTab = ({
  collections
}: {
  collections: {
    nfts: { image: string }[]
    collectionName: string
    collectionImage: string
  }[]
}) => {
  return (
    <section className="h-[280px] overflow-y-auto mb-1">
      {collections.map((collection, index) => (
        <Disclosure key={index}>
          {({ open }) => (
            <>
              <Disclosure.Button className="group flex justify-between items-center w-full hover:bg-skin-light-gray/80 hover:cursor-pointer p-2 rounded-lg transition duration-200 ease-out focus:outline-none border-2 border-transparent focus:border-skin-inverse/44">
                <div className="flex items-center gap-2">
                  <div className="rounded-full h-6 w-6 relative overflow-hidden shadow-md">
                    <img
                      src={collection.collectionImage}
                      alt={collection.collectionName || 'Collection image'}
                    />
                  </div>
                  <p className="text-skin-text-primary font-semibold">
                    {collection.collectionName}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <p>999 </p>
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
                  {collection.nfts.map((nft, index) => (
                    <div
                      key={index}
                      className="w-44 h-44 bg-red-200 rounded-md hover:scale-105 transition-transform duration-200 ease-out flex items-center justify-center"
                    >
                      {nft.image}
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
