import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// Layouts
import LoginLayout from '../layouts/loginLayout'

// Pages
import LoginPage from '../pages/loginPage';
import ForgotPage from '../pages/forgotPage';


// ROUTER FUNCTIONS
const routes = () => {
    return (
        <Router>
            <Switch>
                <Route  path='/'>
                    <LoginLayout>
                        <Switch>
                            <Route exact  path='/' component={LoginPage}/>
                            <Route  path='/forgotPassword' exact component={ForgotPage}/>
                        </Switch>
                    </LoginLayout>
                </Route>
            </Switch>
        </Router>
    )
}

export default routes;
