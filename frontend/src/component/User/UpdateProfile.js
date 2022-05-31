import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateProfile.css';
import Loader from '../layout/loader/Loader';
// import { Link } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import NumbersIcon from '@material-ui/icons/ConfirmationNumberTwoTone';
import Course from '@material-ui/icons/DateRange';
import FaceIcon from '@material-ui/icons/Face';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { UPDATE_PROFILE_RESET } from '../../constants/UserConstants';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();
  const { user } = useSelector(state => state.user);
  const { error, isUpdated, loading } = useSelector(state => state.profile);

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState('/logo.png');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');

  const updateProfileSubmit = e => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('rollNumber', rollNumber);
    myForm.set('course', course);
    myForm.set('year', year);
    myForm.set('avatar', avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = e => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRollNumber(user.rollNumber);
      setCourse(user.course);
      setYear(user.year);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success('Profile updated successfully');
      dispatch(loadUser());
      history('/account');
      dispatch({
        type: UPDATE_PROFILE_RESET
      });
    }
  }, [dispatch, error, alert, isUpdated, history, user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="updateProfileRollNumber">
                  <NumbersIcon />
                  <input
                    type="text"
                    placeholder="Roll Number"
                    required
                    name="rollNumber"
                    value={rollNumber}
                    onChange={e => setRollNumber(e.target.value)}
                  />
                </div>
                <div className="updateProfileCourse">
                  <Course />
                  <input
                    type="text"
                    placeholder="Course"
                    required
                    name="course"
                    value={course}
                    onChange={e => setCourse(e.target.value)}
                  />
                </div>
                <div className="updateProfileYear">
                  <NumbersIcon />
                  <input
                    type="text"
                    placeholder="Year"
                    required
                    name="year"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
