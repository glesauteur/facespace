import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HomeFeedUser = ({ avatar, id, currentUser }) => {
  let navigate = useNavigate();
  const [isFriend, setIsFriend] = React.useState(null);

  function handleClickProfile() {
    navigate(`/profile/${id}`);
  }

  const found = currentUser
    ? currentUser.friends.find((friend) => {
        return friend === id;
      })
    : false;

  return (
    <>
      <Avatar
        style={{
          border:
            found && currentUser !== null
              ? "solid #FF8AAE 5px"
              : currentUser && currentUser.id === id
              ? "solid #6867AC 5px"
              : "none",
        }}
        onClick={handleClickProfile}
        src={avatar}
      />
    </>
  );
};

const Avatar = styled.img`
  width: 8%;
  margin: 9px;
  border-radius: 50%;
  transition: transform 0.3s;
  cursor: pointer;

  :hover {
    transform: scale(1.2);
  }
`;

export default HomeFeedUser;
