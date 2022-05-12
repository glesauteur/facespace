import React from "react";
import styled from "styled-components";

const SignInErrorMessage = () => {
  return <Message>User doesn't exist in the system!</Message>;
};

const Message = styled.p`
  color: red;
  margin-top: 10px;
  font-size: 16px;

  border: solid red;
  padding: 5px;
  font-family: "Teko", sans-serif;
`;

export default SignInErrorMessage;
