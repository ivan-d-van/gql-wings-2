import {BrowserRouter, Route, Routes} from "react-router-dom";
import WelcomePage from "../components/WelcomePage/WelcomePage";
import Login from "../components/Login/Login";
import Registration from "../components/Registration/Registration";
import RequireAuth from "../utils/RequiredAuth";
import Cabinet from "../components/Cabinet/Cabinet";
import SendTransaction from "../components/SendTransaction/SendTransaction";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <WelcomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/cabinet' element={<RequireAuth><Cabinet /></RequireAuth>} />
        <Route path='/send-transaction' element={<RequireAuth><SendTransaction /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  )
}
