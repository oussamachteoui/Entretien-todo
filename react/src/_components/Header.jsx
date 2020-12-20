import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch,shallowEqual, useSelector } from 'react-redux';
import { history } from '../_helpers';
import { userActions } from '../_actions';
import BeatLoader from "react-spinners/BeatLoader";

function Header() {

    var  user = useSelector(state => state.authentication.user,shallowEqual);
    const dispatch = useDispatch();
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    console.log(user,loggingIn);
    // reset login status
    useEffect(() => { 
        user = JSON.parse(localStorage.getItem('user'));
    }, [localStorage.getItem('user')]);

    function handleLogout() {
        dispatch(userActions.logout()); 
        history.push('/login');
    }

    return (<div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">TODO</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                     
                        </ul>
                        <div className="form-inline my-2 my-lg-0">
                        {user 
                            ? 
                            user ? 
                            // Login User
                            <a className="btn btn-outline-success my-2 my-sm-0" onClick={() => handleLogout()}>Déconnexion</a>
                            // Spinner
                            :   <BeatLoader
                                    size={15}
                                    margin={6}
                                    color={"#009688"}
                                    loading={true}
                                />
                            // Not Login User
                            : 
                            <div className="navbar-right-btn">
                                <NavLink to="/login" className="btn btn-outline-success my-2 my-sm-0" >Se connecter</NavLink> 
                                <NavLink to="/register" className="btn btn-success my-2 my-sm-0" >S'inscrire</NavLink> 
                            </div>
                        }
                        </div>
                    </div>
                    </div>
                </nav>
            </div>
    );
}


export {Header};
