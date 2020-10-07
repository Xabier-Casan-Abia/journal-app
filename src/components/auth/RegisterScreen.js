import React from 'react'
import { Link } from 'react-router-dom'

const RegisterScreen = () => {
    return (
        <>
            
            <h3 className="auth__title">Register</h3> 
            <form>

            <input
                    autoComplete="off"
                    className="auth__input"
                    type="text"
                    placeholder="Name"
                    name="name"
                />

                <input
                    autoComplete="off"
                    className="auth__input"
                    type="text"
                    placeholder="Email"
                    name="email"
                />
                
                <input
                    autoComplete="off"
                    className="auth__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                />

                <input
                    autoComplete="off"
                    className="auth__input"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm-password"
                />

                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit"
                >
                    Register
                </button>

                    <Link  
                        to="/auth/login"
                        className="link">
                        Alredy Registered?
                    </Link>

            </form>

        </>
    )
}

export default RegisterScreen
