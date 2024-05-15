import React, {useEffect, useState} from 'react';
import {Button, Typography} from '@mui/material';
import {Directions, User, UserTransaction, useUserInfoLazyQuery} from "../../apollo/generated-hooks";
import { Balance } from '../Balance/Balance';
import {Link, useNavigate} from "react-router-dom";
import {TransactionsHistory} from "../TransactionHistory/TransactionHistory";
import {LogoutButton} from "../LogoutButton/LogoutButton";

const Cabinet: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [sortDirection, setSortDirection] = useState<Directions>(Directions.Asc)
  const navigate = useNavigate();

  const [getUserInfo] = useUserInfoLazyQuery()

  useEffect(() => {
    const sort = {direction: sortDirection, field: 'date'}

    getUserInfo({fetchPolicy: 'no-cache', variables: { sort }})
      .then(res => {
        const user = res.data?.userInfo

        if (user) {
          setUser(user)
        }
      })
      .catch(_ => {
        navigate('/login')
      })
  }, [sortDirection])

  const onSort = () => {
    const newDirection = sortDirection === Directions.Asc ? Directions.Desc : Directions.Asc
    setSortDirection(newDirection)
  }

  return (
    <div>
      <div className='cabinet-general-form'>
        <LogoutButton />
        {user && <Balance user={user}/>}
        <Link to={'/send-transaction'}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disableElevation= {true}
            sx={{ width: '25vw' }}
          >
            Send transaction
          </Button>
        </Link>
      </div>
      {user?.transactions && user.transactions.length > 0 && (
        <TransactionsHistory transactions={user.transactions as UserTransaction[]} onSort={onSort}/>
      )}
      {user?.transactions && user.transactions.length === 0 && (
        <Typography variant='h4' component='div' gutterBottom = {true}>
          Transactions List Empty
        </Typography>
      )}
    </div>
  );
};

export default Cabinet;
