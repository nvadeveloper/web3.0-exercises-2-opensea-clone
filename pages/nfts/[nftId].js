import { useEffect, useMemo, useState } from "react"
import { useWeb3 } from "@3rdweb/hooks"
import { ThirdwebSDK } from "@3rdweb/sdk"
import { useRouter } from "next/router"
import Header from "../../components/Header"
import NFTImage from "../../components/nft/NFTImage"
import GeneralDetails from "../../components/nft/GeneralDetails"
import ItemActivity from "../../components/nft/ItemActivity"
import Purchase from "../../components/nft/Purchase"

const style = {
    wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
    container: `container p-6`,
    topContent: `flex`,
    nftImgContainer: `mr-4`,
    detailsContainer: `flex-[2] ml-4`,
  }

const Nft = () => {
    const { provider } = useWeb3()
    const [selectedNft, setSelectedNft] = useState()
    const [listings, setListings] = useState([])
    const router = useRouter()

    const nftModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK( 
            provider.getSigner()
        )
        
        return sdk.getNFTModule('0x49E9219aC13F6692105C8d216698d72E7B2A2fE8')
    }, [provider])
    
    useEffect(() => {
        if (!nftModule) return
        ;(async () => {
            const nfts = await nftModule.getAll()

            const selectedNftArray = nfts.filter(
                (nft) => nft.id == router.query.nftId
            )

            setSelectedNft(selectedNftArray[0])
        })()

    }, [nftModule])

    const marketPlaceModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner()
        )

        return sdk.getMarketplaceModule('0xDd9ADf385E9d99D61b64d4d821700daC6Ac0ef78')

    }, [provider])

    useEffect(() => {
        if (!marketPlaceModule) return

        ;(async () => {
            setListings(await marketPlaceModule.getAllListings())
        })()

    }, [marketPlaceModule])
    // console.log(provider)
    // console.log(nftModule)  
  return (
    <div>
        <Header />
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.topContent}>
                    <div className={style.nftImgContainer}>
                        <NFTImage selectedNft={selectedNft}/>
                    </div>
                    <div className={style.detailsContainer}>
                        <GeneralDetails selectedNft={selectedNft}/>
                        <Purchase 
                            isListed={router.query.isListed}
                            selectedNft={selectedNft}
                            listings={listings}
                            marketPlaceModule={marketPlaceModule}
                        />
                    </div>                  
                </div> 
                <ItemActivity />               
            </div>            
        </div>
        
    </div>
  )
}

export default Nft
