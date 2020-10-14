import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { registerNameEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm'

const RegisterScreen = () => {
   
    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = formValues;

    const dispatch = useDispatch();

    const { msgError } = useSelector(state => state.ui);

    const handleRegister = (e) => {
        e.preventDefault();
        if(isFormValue()) {
           dispatch(registerNameEmailPassword(name, email, password))
        }
    };

    const isFormValue = () => {

        if (name.trim().length === 0 ) {
            dispatch(setError('Name is required'));
            return false;
        }

        if (!validator.isEmail(email)) {
            dispatch(setError('Email is required'));
            return false;
        }

        if (password !== confirmPassword) {
            dispatch(setError("Passwords don't match"));
            return false;
        } 

        if (password.length < 5) {
            dispatch(setError("Password should have at least 6 characters"));
            return false;
        }

        dispatch(removeError());
        return true;
    }

    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            
            <h3 className="auth__title">Register</h3> 
            <form onSubmit={ handleRegister }>

                { 
                    msgError &&
                    <div className='auth__alert-error'>
                        {msgError}
                    </div>
                }

                <input
                    autoComplete="off"
                    className="auth__input"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={ name }
                    onChange= { handleInputChange }
                />

                <input
                    autoComplete="off"
                    className="auth__input"
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={ email }
                    onChange= { handleInputChange }
                />

                <input
                    autoComplete="off"
                    className="auth__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={ password }
                    onChange= { handleInputChange }
                />

                <input
                    autoComplete="off"
                    className="auth__input"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={ confirmPassword }
                    onChange= { handleInputChange }
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

        </div>
    )
}

export default RegisterScreen
