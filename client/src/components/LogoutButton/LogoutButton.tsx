import {Button} from "@mui/material";
import React from "react";
import {clientConfig} from "../../config";
import {useNavigate} from "react-router-dom";

export const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(clientConfig.tokenName)
    navigate('/')
  }

  return (
    <div className={'logoutBtnWrapper'}>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        disableElevation= {true}
        sx={{ width: '15vw' }}
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  )
}
