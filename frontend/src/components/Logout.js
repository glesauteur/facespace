import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Logout = ({ setCurrentUser }) => {
  let navigate = useNavigate();
  const handleLogOut = () => {
    setCurrentUser(null);
    navigate(`/`);
  };
  return <LogOut onClick={handleLogOut}>Log Out</LogOut>;
};

const LogOut = styled.h3`
  cursor: pointer;
`;

export default Logout;
