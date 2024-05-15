import { Typography } from "@mui/material";
import React from "react";
import { User } from "../../apollo/generated-hooks";

interface BalanceProps {
  user: User
}

export const Balance: React.FC<BalanceProps> = (props) => {
  const {user} = props

  return (
    <div>
      <Typography variant='h5' component='div' gutterBottom>
        Hello, {user.username}
      </Typography>
      <Typography variant='h5' component='div' gutterBottom>
        Your balance amount: {user.balance} PW
      </Typography>
    </div>
  );
}
