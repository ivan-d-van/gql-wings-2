import { Button } from '@mui/material';
import React from 'react';
import { Link } from "react-router-dom";

const WelcomePage: React.FC = () => {
  return (
    <div className={'welcomePageWrapper'}>
      <div className={'welcomePage'}>
        <Link to={'/login'}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            size="medium"
            disableElevation= {true}
            sx={{ width: '15vw' }}
          >
            Go to login
          </Button>
        </Link>
        <Link to={'/registration'}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            size="medium"
            disableElevation= {true}
            sx={{ width: '15vw' }}
          >
            Go to registration
          </Button>
        </Link>
      </div>
    </div>

  );
};

export default WelcomePage;
