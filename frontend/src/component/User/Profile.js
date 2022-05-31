import React, { useEffect } from 'react';
import MetaData from '../layout/MetaData';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import { useSelector } from 'react-redux';
import Loader from '../layout/loader/Loader';

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector(state => state.user);
  const history = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      history('/login');
    }
  }, [isAuthenticated, history]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Roll Number</h4>
                <p>{user.rollNumber}</p>
              </div>
              <div>
                <h4>Course</h4>
                <p>{user.course}</p>
              </div>
              <div>
                <h4>Year</h4>
                <p>{user.year}</p>
              </div>

              <div>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
