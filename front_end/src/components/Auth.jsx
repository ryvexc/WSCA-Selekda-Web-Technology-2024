import { Outlet } from "react-router-dom"

export default function Auth() {
  if (!window.localStorage.getItem("auth_token"))
    window.location.href = "/auth/login"

  return <>
    <Outlet />
  </>
}