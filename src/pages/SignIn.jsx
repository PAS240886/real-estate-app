import { toast } from "react-toastify";
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {ReactComponent as ArrowRoghtIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from "../components/OAuth";

function SignIn() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const {email, password} = formData
    const navigate = useNavigate()
    const onChange = (e) =>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value,

        })
        
        )
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const auth = getAuth()
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    
            if(userCredentials.user) {
                navigate('/')
            }
            } catch (error) {
                toast.error('Wrong email or password')
        }
    }

  return (
    <>
      <div className='pageContainer'>
        <header>
            <p className="pageHeader">Welcome Back</p>
        </header>
        <main>
            <form onSubmit={onSubmit}>
                <input type='email' className='emailInput' placeholder='email' id='email' value={email} onChange={onChange} />
                <div className='passwordInputDiv'>
                    <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder='Password' id='password' value={password} onChange={onChange}/>
                    <img src={visibilityIcon} alt='' className='showPassword' onClick={()=> setShowPassword((prevState)=> !prevState)}/>
                </div>
                <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password</Link>
                <div className='signInBar'>
                    <p className='signInText'>Sign In</p>
                    <button className='signInButton'>
                        <ArrowRoghtIcon fill='#fff' width='34px' height='34px'/>
                    </button>
                </div>
            </form>
            <OAuth />
        </main>
        <Link to='/sign-up' className='registerLink' >Sign Up</Link>
      </div>
    </>
  );
}

export default SignIn;
