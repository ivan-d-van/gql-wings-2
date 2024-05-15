import { Button, InputBaseComponentProps, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import {useLoginLazyQuery} from "../../apollo/generated-hooks";
import {clientConfig} from "../../config";
import {SnackbarUIKit} from "../SnackbarUIKit/SnackbarUIKit";

interface IFormInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState<string>('');

  const navigate = useNavigate();
  const { handleSubmit } = useForm<IFormInput>();

  const [login] = useLoginLazyQuery();

  const onSubmit = () => {
    login({variables: { email, password}})
        .then(res => {
          const tokenId = res.data?.login?.token_id

          if (tokenId) {
            localStorage.setItem(clientConfig.tokenName, tokenId)
            navigate('/cabinet')
          } else {
            if (res.error?.message) {
              setApiError(res.error?.message)
            }
          }
        })
        .catch(error => {
          localStorage.removeItem(clientConfig.tokenName)
          setApiError(error.message)
        })
  }

  const snackbarClose = () => {
    setApiError('')
  }


  return (
    <form className='register-form_form' onSubmit={handleSubmit(onSubmit)}>
      <div className="formsWrapper">
        <Typography variant='h4' component='div' gutterBottom = {true}>
          Login
        </Typography>

        <TextField
          label='Enter your email'
          inputProps={email as unknown as InputBaseComponentProps}
          size='small'
          margin='normal'
          fullWidth={true}
          sx={{ width: '25vw' }}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label='Enter your password'
          inputProps={password as unknown as InputBaseComponentProps}
          type="password"
          size='small'
          margin='normal'
          fullWidth={true}
          sx={{ width: '25vw' }}
          onChange={e => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          onClick={onSubmit}
          variant="contained"
          color="primary"
          size="large"
          disableElevation= {true}
          sx={{ width: '25vw' }}
        >
          Login
        </Button>
        <Typography variant='subtitle1' component='div' gutterBottom = {true}>
          <a href='/registration'>You are new? Register your account first!</a>
        </Typography>

        <SnackbarUIKit message={apiError} autoHideDuration={4000} open={apiError.length > 0} onClose={snackbarClose}/>
      </div>
    </form>
  );
};

export default Login;
