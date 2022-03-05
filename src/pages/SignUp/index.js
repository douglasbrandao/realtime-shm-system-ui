import React, { useRef, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useAuth } from '../../context/AuthContext';
import StyledInput from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { Wrapper, Container, Logo } from './styles';
import LogoIfmt from '../../assets/logo-shm.svg';
import { SignUpSchema } from '../../validation';

function SignUp() {
  const { handleSignUp, user } = useAuth();
  const inputRef = useRef();
  const [avatar, setAvatar] = useState({ src: '', alt: '' });

  if (user) {
    return <Redirect to="/dashboard" />;
  }

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
    <Wrapper>
      <Container>
        <Logo src={LogoIfmt} alt="Logo IFMT" />
        <Formik
          initialValues={{
            avatar: '',
            username: '',
            email: '',
            password: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values) => {
            handleSignUp(values);
          }}
          validateOnChange={false}
          validateOnBlur={false}
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
                name="avatar"
                onChange={(e) => {
                  setFieldValue('avatar', e.currentTarget.files[0]);
                  handleAvatar(e);
                }}
                ref={inputRef}
              />
              <Field
                name="username"
                type="username"
                component={StyledInput}
                placeholder="Username"
              />
              <Field
                name="email"
                type="email"
                component={StyledInput}
                placeholder="Email"
              />
              <Field
                name="password"
                type="password"
                component={StyledInput}
                placeholder="Password"
              />
              <Button type="submit">Sign Up</Button>
            </Form>
          )}
        </Formik>
        <div>
          <span>Already an user? </span>
          <Link to="/">Sign In</Link>
        </div>
      </Container>
    </Wrapper>
  );
}

export default SignUp;
