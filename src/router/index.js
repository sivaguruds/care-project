import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// Layouts
import LoginLayout from '../layouts/login/loginLayout';
import UserLayout from '../layouts/user/userLayout';

// Pages
import LoginPage from '../pages/loginPage';
import ForgotPage from '../pages/forgotPage';
import GravityProfile from '../pages/profile/gravityAdmin/myProfile';
import DoctorList from '../pages/manageDoctor/gravityAdmin/DoctorList';
import CreateDoctor from '../pages/manageDoctor/gravityAdmin/CreateDoctor';


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
                            <Route path='/admin/doctorList' exact component={DoctorList}/>
                            <Route path='/admin/createDoctor' exact component={CreateDoctor}/>
                        </Switch>
                    </UserLayout>
                </Route>
            </Switch>
        </Router>
    )
}

export default routes;
