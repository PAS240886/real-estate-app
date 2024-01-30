import { useLocation, useNavigate } from "react-router-dom"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import googleIcong from '../assets/svg/googleIcon.svg'

const OAuth = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const onGoogleClick = async () => {
        const auth = getAuth()
        

        try {
            
        } catch (error) {
            
        }
    }

  return (
    <div className='socialLogin'>
        <p>
            Sign {location.pathname === '/sign-in' ? 'in' : 'up'} with
        </p>
        <button className='socialIconDiv' onClick={onGoogleClick}>
            <img className='socialIconImg' scr={googleIcong} alt="google"/>
        </button>
    </div>
  )
}

export default OAuth
