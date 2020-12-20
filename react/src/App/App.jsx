import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { PublicRoute } from '../_components';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { Header } from '../_components/Header';


import  './styles.css';

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <>
        <div className="app">
                    <Router history={history}>
                        <Header/>
                        <div className="container-website">
                            <div className="alert_code">
                            {alert.message && 
                            alert.type == 'alert-danger' ? toast.error(alert.message) : toast.success(alert.message) }
                            <ToastContainer
                                position="top-right"
                                autoClose={8000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                >
                            </ToastContainer>
                            </div>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PublicRoute path="/login" component={LoginPage} />
                                <PublicRoute path="/register" component={RegisterPage} />
                                <Redirect from="*" to="/404" />
                            </Switch>
                        </div>
                       
                    </Router>
        </div>
        </>
    );
}

export { App };