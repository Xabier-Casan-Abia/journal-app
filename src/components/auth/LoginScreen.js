import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginEmailPassword, googlelogin } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

const LoginScreen = () => {

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.ui);

    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: ''
    })

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginEmailPassword(email,password))
    }

    const handleGoogleLogin = () => {
        dispatch(googlelogin());
    }
    
    return (
        <>
            
            <h3 className="auth__title">Login</h3> 
            <form onSubmit={ handleLogin }>

                <input
                    autoComplete="off"
                    className="auth__input"
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={ email }
                    onChange={ handleInputChange }
                />
                
                <input
                    autoComplete="off"
                    className="auth__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <button
                    className="btn btn-primary btn-block"
                    type="submit"
                    disabled={ loading }
                >
                    Login
                </button>

                <div className="auth__social-networks">

                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >

                        <div className="google-icon-wrapper">

                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />

                        </div>
                        
                        <p className="btn-text"><b>Sign in with google</b></p>

                    </div>

                </div>

                    <Link  
                        to="/auth/register"
                        className="link">
                        Create new account
                    </Link>

            </form>

        </>
    )
}

export default LoginScreen
