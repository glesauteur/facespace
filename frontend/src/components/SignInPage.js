import React from "react";
import { useNavigate } from "react-router-dom";
import SignInErrorMessage from "./SignInErrorMessage";
import styled from "styled-components";

const SignInPage = ({ setCurrentUser }) => {
  const [userNameInput, setUserNameInput] = React.useState("");
  const [signInStatus, setSignInStatus] = React.useState("");

  let navigate = useNavigate();
  function handleChange(e) {
    setUserNameInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`/api/users/`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.data.find((user) => {
          return user.name.toLowerCase() === userNameInput.toLowerCase();
        });

        if (found) {
          setCurrentUser(found);
          setSignInStatus("success");
          navigate(`/`);
        } else {
          setSignInStatus("error");
        }
      });
  }

  return (
    <>
      <BackgroundImage />
      <Form>
        <div>
          <label for="name"></label>
          <Title>Sign In</Title>
          <InputWrapper>
            <input
              onChange={handleChange}
              value={userNameInput}
              id="example"
              type="text"
              name="text"
              placeholder="Your Name"
              ref={(input) => input && input.focus()}
              style={{
                borderRadius: "10px",
                borderStyle: "none",
                marginBottom: "10px",
                padding: "7px 0px",
                paddingLeft: "10px",
              }}
            />

            <input
              style={{
                borderRadius: "10px",
                borderStyle: "none",
                padding: "5px 0px",
                backgroundColor: "#9ADCFF",
                fontWeight: "900",
              }}
              onClick={handleSubmit}
              type="submit"
              value="Submit"
            />
            {signInStatus === "error" && <SignInErrorMessage />}
          </InputWrapper>
        </div>
      </Form>
    </>
  );
};

const Title = styled.h2`
  position: absolute;
  top: 40vh;
  width: 100vw;
  text-align: center;
`;
const BackgroundImage = styled.img`
  width: 100vw;
  height: 100vh;
  background-color: #ff8aae;
  opacity: 0.3;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20vw;
  position: absolute;
  left: 40vw;
  top: 50vh;
  height: auto;
  background-color: #ff8aae;
  opacity: 0.8;
  padding: 50px;
  border-radius: 20px;
`;
const Form = styled.form``;
export default SignInPage;
