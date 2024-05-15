import React, {useEffect, useRef, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {Button, CircularProgress, InputBaseComponentProps, Typography} from '@mui/material';
import {
  useGetAllUsersQuery,
  useSendTransactionMutation,
  useUserInfoLazyQuery, useUserInfoWithoutTransactionsLazyQuery
} from "../../apollo/generated-hooks";
import {LogoutButton} from "../LogoutButton/LogoutButton";
import {SnackbarUIKit} from "../SnackbarUIKit/SnackbarUIKit";
import {validationSendTxCheck} from "./helpers/utils";

const defaultVariables = {
  variables: {
    filter: {
      limit: 10,
      username: null
    }
  }
}

const DEBOUNCE_TIME = 300

const SendTransaction: React.FC = () => {
  const location = useLocation();

  const [txUsername, setTxUsername] = useState(location?.state?.username || '');
  const [txAmount, setTxAmount] = useState( Math.abs(location?.state?.amount) || 0);
  const [options, setOptions] = useState([{ name: '' }]);
  const [validationError, setValidationError] = useState('');
  const [amountHelperText, setAmountHelperText] = useState('');
  const [ balanceAmount, setBalanceAmount ] = useState(0);
  const [isAmountEmpty, setIsAmountEmpty] = useState(false);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const [getUserInfo] = useUserInfoWithoutTransactionsLazyQuery()
  const {data, loading: userListLoading, called, refetch} = useGetAllUsersQuery(defaultVariables)
  const [sendTransaction] = useSendTransactionMutation()

  useEffect(() => {
    getUserInfo({fetchPolicy: 'no-cache'})
      .then(res => {
        const user = res.data?.userInfo
        if (user) {
          setBalanceAmount(user.balance)
        }
      })
      .catch(_ => {
        navigate('/login')
      })
  }, [])

  useEffect(() => {
    if (called && !userListLoading && data) {
      const userList = data?.getAllUsers || []
      const userNames = userList.map(user => ({name: user?.username}))
      setOptions(userNames as {name: string}[]);
    }
  }, [data, userListLoading, called])

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      refetch({...defaultVariables, filter: {username: txUsername}})
    }, DEBOUNCE_TIME);

    return () => {
      debounceTimerRef.current && clearTimeout(debounceTimerRef.current)
    }

  }, [txUsername, refetch])

  if (!balanceAmount) {
    return <CircularProgress/>
  }

  const checkAmount = (value: string) => {
    if (!value || value === '') {
      setIsAmountEmpty(true)
      return;
    }

    const number = parseInt(value);
    setIsAmountEmpty(false)
    const validationCheck = validationSendTxCheck(number, balanceAmount, null)

    if (!validationCheck.isValid && validationCheck.validationError) {
      setTxAmount(number);
      setAmountHelperText(validationCheck.validationError)
    }

    if (validationCheck.isValid) {
      setAmountHelperText('')
      setTxAmount(number);
    }
  }

  const send = () => {
    const validationCheck = validationSendTxCheck(txAmount, balanceAmount, txUsername, isAmountEmpty)


    if (!validationCheck.isValid && validationCheck.validationError) {
      setValidationError(validationCheck.validationError)
      return;
    }

    sendTransaction({variables: {username: txUsername, amount: txAmount}})
      .then(() => navigate('/cabinet'))
      .catch(_ => {
        navigate('/')
      })
  }

  const onInputChange = (event: any, value: string) => {
      setTxUsername(value ? value: '');
  };

  const snackbarClose = () => {
    setValidationError('')
  }

  return (
    <div className='send-tx-form'>
      <LogoutButton />

      <div className={'backToCabinetWrapper'}>
        <Link to={'/cabinet'} >
          <Button
            type="button"
            variant={'outlined'}
            color="primary"
            size="medium"
            disableElevation= {true}
          >
            Back to cabinet
          </Button>
        </Link>
        {balanceAmount && (
          <Typography variant='h5' component='div' gutterBottom>
            Your balance amount: {balanceAmount} PW
          </Typography>
        )}
      </div>

      <div className={'transactionWrapper'}>
        <TextField
          error={!!amountHelperText}
          label='Send amount'
          inputProps={txAmount as unknown as InputBaseComponentProps}
          size='medium'
          margin='normal'
          helperText={amountHelperText && amountHelperText}
          placeholder={'Send amount'}
          fullWidth={true}
          sx={{ width: '25vw' }}
          defaultValue={location?.state?.amount ? Math.abs(location.state.amount) : 0}
          onChange={e => checkAmount(e.target.value)}
        />
        <Autocomplete
          id="name"
          options={options}
          onInputChange={onInputChange}
          getOptionLabel={(option) => option.name}
          style={{ width: '25vw' }}
          defaultValue={location?.state?.username ? {name: location.state.username} : {name: ''}}
          renderInput={(params) => (
            <TextField {...params} label="Name of receiver" variant="outlined" />
          )}
        />
        <Button
          type="button"
          variant="contained"
          color="primary"
          size="large"
          disableElevation= {true}
          sx={{ width: '25vw' }}
          onClick={() => send()}
        >
          Send transaction
        </Button>
      </div>

      <SnackbarUIKit message={validationError} autoHideDuration={4000} open={validationError.length > 0} onClose={snackbarClose}/>
    </div>
  );
};

export default SendTransaction;
