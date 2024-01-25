import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'

//importing google firebase configs
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'

import {ReactComponent as ArrowRoghtIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const {name, email, password} = formData
    const navigate = useNavigate()
    const onChange = (e) =>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value,
        })
        )
    }

    //Google firebase auth
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const auth = getAuth()
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            updateProfile(auth.currentUser, {
                displayName: name,
            })
            
            //forming the data for the database
            const formDataCopy = { ...formData }
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            //update database
            await setDoc(doc(db, 'users', user.uid), formDataCopy)

            navigate('/')
        } catch (error) {
            console.log(error)
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
                <input type='text' className='nameInput' placeholder='Name' id='name' value={name} onChange={onChange} />
                <input type='email' className='emailInput' placeholder='email' id='email' value={email} onChange={onChange} />
                <div className='passwordInputDiv'>
                    <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder='Password' id='password' value={password} onChange={onChange}/>
                    <img src={visibilityIcon} alt='' className='showPassword' onClick={()=> setShowPassword((prevState)=> !prevState)}/>
                </div>
                <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password</Link>
                <div className='signUpBar'>
                    <p className='signUpText'>Sign Up</p>
                    <button className='signUpButton'>
                        <ArrowRoghtIcon fill='#fff' width='34px' height='34px'/>
                    </button>
                </div>
            </form>
        </main>
        <Link to='/sign-in' className='registerLink' >Sign In</Link>
      </div>
    </>
  );
}

export default SignUp;
