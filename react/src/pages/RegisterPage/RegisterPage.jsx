import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../_actions';

function RegisterPage() {
    const [user, setUser] = useState({
        username: '',
        email:'',       
        password: '',       
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
        window.scrollTo(0, 0);
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if ( user.username && user.username.length >= 6 && user.email && user.password  && user.password.length >= 6 ) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <div className="container mg-top-50">
            <div className="form-style formRegister">
                <h2>Créer un compte</h2>
                <form name="form" onSubmit={handleSubmit}>              
                    <div className="form-group">
                        <label>Nom d'utilisateur</label>
                        <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + ((submitted && !user.username) || (submitted && user.username.length < 6) ? ' is-invalid' : '')} />
                        {submitted && !user.username &&
                            <div className="invalid-feedback">Veuillez saisir votre nom d'utilisateur.</div>
                        }
                        {submitted && user.username.length >= 1 && user.username.length < 6 &&
                            <div className="invalid-feedback">Nom d'utilisateur est trop court (minimum 6 caractères).</div>
                        }
                    </div>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input type="email" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} />
                        {submitted && !user.email &&
                            <div className="invalid-feedback">Veuillez saisir votre adresse e-mail.</div>
                        }
                    </div>
                   
                    <div className="form-group">
                        <label>Mot de passe</label>
                        <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + ((submitted && !user.password) || (user.password.length >= 1 && user.password.length <= 8) ? ' is-invalid' : '')} />
                        {submitted && !user.password && user.password.length <= 6 &&
                            <div className="invalid-feedback">Veuillez saisir un mot de passe.</div>
                        }
                        {submitted && user.password.length >= 1 && user.password.length <= 8 &&
                            <div className="invalid-feedback">Le mot de passe est trop court (minimum 8 caractères).</div>
                        }
                    </div>
                    
                    <div className="form-group">
                        <button className="btn btn-outline-success">
                            {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            S'inscrire
                        </button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
}

export { RegisterPage };