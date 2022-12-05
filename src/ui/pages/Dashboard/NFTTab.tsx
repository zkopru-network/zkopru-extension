import { ArrowRightSLine } from '../../components/common/icons'

// The plan here is to collect the NFT data and group into collections if needed. We'll show the NFTs as dropdown items

const NFTTab = () => {
  return (
    <ul className="max-h-72 overflow-y-auto mb-2">
      <li className="group flex justify-between items-center w-full hover:bg-skin-light-gray/80 hover:cursor-pointer p-2 rounded-lg transition duration-200 ease-out focus:outline-none border-2 border-transparent focus:border-skin-inverse/44">
        <div className="flex items-center gap-2">
          <div className="rounded-full h-6 w-6 relative overflow-hidden shadow-md">
            <img src="https://via.placeholder.com/24" alt="Collection image" />
          </div>
          <p className="text-skin-text-primary font-semibold">
            Metroverse Genesis
          </p>
        </div>
        <div className="flex items-center gap-1">
          <p>999 </p>
          <ArrowRightSLine className="fill-skin-text-primary/50 group-hover:fill-skin-text-primary transition duration-200 ease-out group-hover:translate-x-1" />
        </div>
      </li>
      <li>
        <div className="flex gap-3 p-1 flex-wrap">
          <div className="w-44 h-44 bg-red-200 rounded-md hover:scale-105 transition-transform duration-200 ease-out flex items-center justify-center">
            NFT
          </div>
          <div className="w-44 h-44 bg-red-200 rounded-md hover:scale-105 transition-transform duration-200 ease-out flex items-center justify-center">
            NFT
          </div>
          <div className="w-44 h-44 bg-red-200 rounded-md hover:scale-105 transition-transform duration-200 ease-out flex items-center justify-center">
            NFT
          </div>
          <div className="w-44 h-44 bg-red-200 rounded-md hover:scale-105 transition-transform duration-200 ease-out flex items-center justify-center">
            NFT
          </div>
          <div className="w-44 h-44 bg-red-200 rounded-md hover:scale-105 transition-transform duration-200 ease-out flex items-center justify-center">
            NFT
          </div>
        </div>
      </li>
    </ul>
  )
}

export default NFTTab
