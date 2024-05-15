import { Navigate } from "react-router-dom";
import {clientConfig} from "../config";

export default function RequireAuth({ children }: { children: JSX.Element | JSX.Element[]}): JSX.Element {
  const idToken = localStorage.getItem(clientConfig.tokenName)

  return idToken ? children as unknown as JSX.Element : <Navigate to="/" replace /> as unknown as JSX.Element;
}
