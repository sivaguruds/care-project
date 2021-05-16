import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// Layouts
import LoginLayout from '../layouts/loginLayout';
import UserLayout from '../layouts/userLayout';

// Pages
import LoginPage from '../pages/loginPage';
import ForgotPage from '../pages/forgotPage';
import GravityProfile from '../pages/profile/gravityAdmin/myProfile';


// ROUTER FUNCTIONS
const routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <LoginLayout>
                        <Switch>
                            <Route exact  path='/' component={LoginPage}/>
                            <Route  path='/forgotPassword' exact component={ForgotPage}/>
                        </Switch>
                    </LoginLayout>
                </Route>
                <Route exact path='/admin/:path?'>
                    <UserLayout>
                        <Switch>
                            <Route path='/admin/gravityProfile' exact component={GravityProfile}/>
                        </Switch>
                    </UserLayout>
                </Route>
            </Switch>
        </Router>
    )
}

export default routes;
