import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, {useEffect} from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {UserTransaction} from "../../apollo/generated-hooks";

interface TransactionsHistoryProps {
  transactions: UserTransaction[],
  onSort?: () => void;
}

export const TransactionsHistory: React.FC<TransactionsHistoryProps> = (props) => {
  const {transactions, onSort} = props

  const [txHistory, setTxHistory] = useState<UserTransaction[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    setTxHistory(transactions)
  }, [transactions])


  const handleDublicateTransaction = (row: UserTransaction) => {
    if (row.amount && row.username) {
      navigate(`/send-transaction?username=${row.username}&amount=${row.amount * -1}`, { state: { username: row.username, amount: row.amount } });
    }
  }

  const sortByName = () => {
    onSort?.()
  }


  return (
    <TableContainer component={Paper} className={"tableWrapper"} sx={{width: 'auto'}}>
      <Table sx={{ minWidth: 650, maxWidth: '100%' }} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell align="center" onClick={sortByName} className={"withPointer"}> Date </TableCell >
            <TableCell align="center"> Username </TableCell>
            <TableCell align="center"> Amount </TableCell>
            <TableCell align="center"> Balance </TableCell>
            <TableCell align="center"> Send again </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {txHistory.length > 0 && txHistory.map((row) => (
            <TableRow
              key={row.id}
            >
              <TableCell align="center"> {row.date} </TableCell>
              <TableCell align="center">{row.username}</TableCell>
              <TableCell align="center">{row.amount}</TableCell>
              <TableCell align="center">{row.balance}</TableCell>
              <TableCell align="center">
                {row.amount && row.amount < 0 ? <Button
                  variant="outlined"
                  color={"primary"}
                  onClick={() => {
                    handleDublicateTransaction(row);
                  }}
                >
                  {"Repeat"}
                </Button> : <></>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
