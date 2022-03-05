import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Button from '../../components/UI/Button';
import StyledInput from '../../components/UI/Input';
import { Wrapper, Logo, Container } from './styles';
import LogoIfmt from '../../assets/logo-shm.svg';
import { useAuth } from '../../context/AuthContext';
import { SignInSchema } from '../../validation';

function SignIn() {
  const { handleSignIn, user } = useAuth();

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Wrapper>
      <Container>
        <Logo src={LogoIfmt} alt="" />
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={SignInSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(credentials) => handleSignIn(credentials)}
        >
          <Form noValidate>
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
            <Button type="submit">Log In</Button>
          </Form>
        </Formik>
        <div>
          <span>New? </span>
          <Link to="/signup">Sign Up</Link>
        </div>
      </Container>
    </Wrapper>
  );
}

export default SignIn;
