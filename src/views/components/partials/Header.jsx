import React, { useContext, useState } from "react";
import { CancelOutlined, SendOutlined, Search as SearchIcon } from "@mui/icons-material";
import { Divider, InputAdornment, TextField, IconButton } from "@mui/material";
import Login from "../modal/LoginModal";
import { UserAuth } from "../../../hooks/auth/Auth.Provider";
import AccountMenu from "./componets/AccountMenu";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [inputValue, setInputValue] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { user } = UserAuth();
  const mode = "ModeLight";
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim() !== "") {
      navigate(`/search/${inputValue}`);
      setInputValue("");

    }
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };

  return (
    <header className={`GM__${mode}__header`}>
      <ul>
        {!isMobileSearchOpen && (
          <li>
            <div className={`GM__${mode}__header-logo`}>3DPrintSage</div>
          </li>
        )}
        <li
          className={`GM__${mode}__header-search ${
            isMobileSearchOpen ? "mobile-search-open" : "mobile-search-closed"
          }`}
        >
          <TextField
            placeholder="Buscar..."
            sx={{ width: "100%", maxWidth: "100%" }}
            id="input-with-icon-textfield"
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  {inputValue && (
                    <CancelOutlined
                      onClick={() => setInputValue("")}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </InputAdornment>
              ),
            }}
            variant="standard"
            value={inputValue}
            onChange={handleChange}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <SendOutlined onClick={handleSearch} style={{ cursor: "pointer" }} />
          {isMobileSearchOpen && (
            <IconButton onClick={toggleMobileSearch}>
              <CancelOutlined />
            </IconButton>
          )}
        </li>
        {!isMobileSearchOpen && (
          <li>
            {user ? <AccountMenu /> : <Login />}
            <IconButton className="mobile-search-icon" onClick={toggleMobileSearch}>
              <SearchIcon />
            </IconButton>
          </li>
        )}
      </ul>
    </header>
  );
}