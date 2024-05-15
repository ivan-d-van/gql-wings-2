import { Button, InputBaseComponentProps, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useCreateUserMutation} from "../../apollo/generated-hooks";
import {validationCheck} from "./helpers/utils";
import {clientConfig} from "../../config";
import {SnackbarUIKit} from "../SnackbarUIKit/SnackbarUIKit";

const Registration: React.FC = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [apiError, setApiError] = useState<string>('');
  const navigate = useNavigate();

  const [createUser] = useCreateUserMutation()


  const handleSubmit = (e: any) => {
    e.preventDefault();
    const validationData = validationCheck(email, password, passwordConfirm)

      if (!validationData.isValid && validationData.validationError) {
        setApiError(validationData.validationError);
      } else {
          createUser({variables: {input: {username, email, password}}})
            .then(res => {
              const tokenId = res.data?.createUser?.token_id

              if (tokenId) {
                localStorage.setItem(clientConfig.tokenName, tokenId)
              }
            })
            .then(() => {
              navigate('/cabinet')
            })
            .catch(error => {
              localStorage.removeItem(clientConfig.tokenName)
              setApiError(error.message)
            })
      }
  }

  const snackbarClose = () => {
    setApiError('')
  }

  return (
    <form className='register-form_form' onSubmit={handleSubmit}>
      <div className="formsWrapper">
        <Typography variant='h4' component='div' gutterBottom = {true}>
          Register
        </Typography>
        <TextField
          label='Enter your name'
          inputProps={username as unknown as InputBaseComponentProps}
          size='small'
          margin='normal'
          fullWidth={true}
          sx={{ width: '25vw' }}
          onChange={e => setName(e.target.value)}
        />
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
        <TextField
          label='Confirm your password'
          inputProps={passwordConfirm as unknown as InputBaseComponentProps}
          type="password"
          size='small'
          margin='normal'
          fullWidth={true}
          sx={{ width: '25vw' }}
          onChange={e => setPasswordConfirm(e.target.value)}
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          size="large"
          className='auth-form_button'
          disableElevation= {true}
          sx={{ width: '25vw' }}
        >
          Register
        </Button>
        <SnackbarUIKit message={apiError} autoHideDuration={6000} open={apiError.length > 0} onClose={snackbarClose}/>
        <Typography variant='subtitle1' component='div' gutterBottom = {true}>
          <Link to={'/login'}>Already have an account?</Link>
        </Typography>
      </div>
    </form>
  );
};

export default Registration;
