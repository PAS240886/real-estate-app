import { useState, useEffect } from "react"
import { useNavigate,Link,useParams } from "react-router-dom"
import { getDoc, doc } from "firebase/firestore"
import { getAuth } from "firebase/auth" 
import { db } from "../firebase.config"
import Spinner from "../components/Spinner"
import shareIcon from '../assets/svg/shareIcon.svg'


function Listing() {
    const [listing, setListing] = useState (null)
    const [loading, setLoading] = useState (true)
    const [shareLinkCopied, setShareLinkCopied] = useState (false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth ()

    useEffect ( ()=> {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId)
            const snapDoc = await getDoc(docRef)
            if(snapDoc.exists()) {
                setListing(snapDoc.data())
                setLoading(false)

            }
        }
        fetchListing()
    },[navigate, params.listingId])

    if(loading) {
        return <Spinner/>
    }

  return (
    <main>
      <div className="shareIconDiv" onClick={()=>{
        navigator.clipboard.writeText(window.location.href)
        setShareLinkCopied(true)
        setTimeout(()=>{
            setShareLinkCopied(false)
        },2000)
      }}>
            <img src={shareIcon} alt=''/>
        </div>
        {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}
        <div className="listingDetails">
            <p className="listingName">
                {listing.name} - ${listing.offer ? listing.discountedPrice : listing.discountedPrice }
            </p>
            <p className="listingLocation">{listing.location}</p>
            <p className="listingType">For {listing.type === 'rent' ? 'Rent' : 'Sell'}</p>
            {listing.offer && <p className="discountPrice">
                ${listing.regularPrice - listing.discountedPrice} discount
            </p>}
            <ul className="listingDetailsList">
                <li>{`${listing.bedrooms} Bedrooms`}</li>
                <li>{`${listing.bathrooms} Bathrooms`}</li>
                <li>{listing.parking && 'Parking Spot'}</li>
                <li>{listing.furnished && 'Furnished'}</li>

            </ul>
            <p className="listinlocationTitle">Location</p>

            {auth.currentUser?.uid !== listing.userRef && (
                <Link to={`/contact/${listing.userRef}?listingName=${listing.name}&listingLocation=${listing.location}`} className="primaryButton">
                    Contact Landlord
                </Link>
            )}
        </div>
    </main>
  )
}

export default Listing
