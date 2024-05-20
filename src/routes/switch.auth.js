import React, { Suspense } from "react";
import RoutesUser from "./routes.user";
import RoutesAdmin from "./routes.admin";
import Routes from "./routes.app";
import { UserAuth } from "../hooks/auth/Auth.Provider";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function SwitchAuth() {
  const { user, dataUser, tokenLoading } = UserAuth();
  if (tokenLoading) {
    return (
      <div className="loader">
        <RefreshIcon />
      </div>
    );
  }
  if (user) {
    const isAdmin = dataUser && dataUser.roll === "admin";
    return (
      <Suspense
        fallback={
          <div className="loader">
            <RefreshIcon />
          </div>
        }
      >
        {isAdmin ? <RoutesAdmin /> : <RoutesUser />}
      </Suspense>
    );
  } else {
    return (
      <Suspense
        fallback={
          <div className="loader">
            {" "}
            <RefreshIcon />
          </div>
        }
      >
        <Routes />
      </Suspense>
    );
  }
}
