import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const UsersFriends = ({ id }) => {
  let navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
      });
  }, [id]);

  if (!user) {
    return <div>loading..</div>;
  }

  function handleClickProfile() {
    navigate(`/profile/${id}`);
  }
  return (
    <FriendsList onClick={handleClickProfile}>
      <FriendAvatar src={user.avatarUrl} />
      <FriendName>{user.name}</FriendName>
    </FriendsList>
  );
};

const FriendName = styled.h3`
  font-size: 15px;
  text-align: center;
  margin-top: 10px;
`;

const FriendAvatar = styled.img`
  width: 15vw;
  border-radius: 50%;
`;
const FriendsList = styled.div`
  cursor: pointer;
`;
export default UsersFriends;
