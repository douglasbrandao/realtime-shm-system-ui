import React, { useRef, useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { toast } from 'react-toastify';
import Dashboard from '../index';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import { Container, Divider, WhiteBox } from './styles';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

function Profile() {
  const inputRef = useRef();
  const { user } = useAuth();

  const [avatar, setAvatar] = useState({
    src: `${process.env.REACT_APP_HOST}/${user.avatar_url}`,
    alt: '',
  });

  const handleUpdateProfile = async (values) => {
    const formData = new FormData();
    formData.append('newAvatar', values.newAvatar);
    formData.append('currentPassword', values.currentPassword);
    formData.append('newPassword', values.newPassword);

    await api
      .put('/api/updateUser', formData)
      .then(({ data }) => {
        toast.success(data.message);
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };

  const handleAvatar = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      setAvatar({
        src: URL.createObjectURL(file),
        alt: file.name,
      });
    }
  };

  return (
    <Dashboard>
      <Container>
        <WhiteBox>
          <div className="header">
            <h2>Profile</h2>
            <p style={{ color: 'var(--text-email)', marginTop: '.25rem' }}>Manage your personal information</p>
          </div>
          <Divider />
          <Formik
            initialValues={{
              newAvatar: '',
              currentPassword: '',
              newPassword: '',
            }}
            onSubmit={(values) => handleUpdateProfile(values)}
          >
            {({ setFieldValue }) => (
              <Form>
                <img
                  className="form__img-preview"
                  src={avatar.src}
                  alt={avatar.alt}
                  onClick={() => inputRef.current.click()}
                />
                <input
                  style={{ display: 'none' }}
                  type="file"
                  name="newAvatar"
                  onChange={(e) => {
                    setFieldValue('newAvatar', e.currentTarget.files[0]);
                    handleAvatar(e);
                  }}
                  ref={inputRef}
                />
                <Field
                  name="currentPassword"
                  type="password"
                  placeholder="Current Password"
                  component={Input}
                />
                <Field
                  name="newPassword"
                  type="password"
                  placeholder="New Password"
                  component={Input}
                />
                <Button type="submit">Update</Button>
              </Form>
            )}
          </Formik>
        </WhiteBox>
      </Container>
    </Dashboard>
  );
}

export default Profile;
