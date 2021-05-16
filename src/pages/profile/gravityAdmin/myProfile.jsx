import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import AccountApi from '../../../services/api/account/accountAll';


const GravityProfile = () => {

    const [profile, setProfile] = useState({
      user: {
        id: ''
      },
      address: {},
      profile: {},
      userRole: []
    })
    let userId = localStorage.getItem('user_id');

    const getProfile = () => {
      AccountApi.gravityProfileGet(userId)
      .then(response =>{
        setProfile(response.data)
        console.log(profile)
      })
      .catch(err =>{
        console.error(err);
      })
    }

    useEffect (() => {
      getProfile();
    }, []);

  
  
    return (
      <div>
        Today I am Years of Age
        <div>
        {profile.user.id}
        {profile.profile.first_name ? profile.profile.first_name : '-'}
        </div>
      </div>
    )
    
}

export default GravityProfile;