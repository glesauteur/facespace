import React from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

const FriendRquests = ({ currentUser, setCurrentUser }) => {
  const [users, setUsers] = React.useState(null);
  const { id } = useParams();
  let navigate = useNavigate();
  React.useEffect(() => {
    fetch("/api/users")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error("Home Feed Fetch Error");
        }
      })
      .then((data) => {
        setUsers(data.data);
      });
  }, []);

  if (!currentUser) {
    return <div>Requires Authentication</div>;
  }

  console.log(currentUser.friendshipRequests);
  const filteredPendingRequests = currentUser.friendshipRequests.filter(
    (friend) => {
      return friend.status === "pending" && friend.to == currentUser.id;
    }
  );

  let pendingFriendsArray = [];
  if (users) {
    filteredPendingRequests.forEach((friend) => {
      console.log(users);
      users.forEach((user) => {
        if (friend.from === user.id) {
          pendingFriendsArray.push(user);
        }
      });
    });
  }

  function handleClickAccept(friendId) {
    const requestOptionsAcceptFriendship = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newFriends: [currentUser.id, friendId],
      }),
    };
    fetch("/api/friends", requestOptionsAcceptFriendship).then((res) => {
      if (res.ok) {
        fetch(`/api/users/${currentUser.id}`)
          .then((res) => res.json())
          .then((data) => setCurrentUser(data.data));
      }
    });
  }

  function handleClickCancel(friendId) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // we reverse the friendship to cancel the friend's request
        friendship: [friendId, currentUser.id],
      }),
    };
    fetch(`/api/newfriendship/`, requestOptions).then((res) => {
      if (res.ok) {
        fetch(`/api/users/${currentUser.id}`)
          .then((res) => res.json())
          .then((data) => setCurrentUser(data.data));
      }
    });
  }

  function handleClickFriendProfile(friendId) {
    navigate(`/profile/${friendId}`);
  }
  const pendingRequests = pendingFriendsArray.map((friend) => {
    return (
      <RequestsContainer>
        <Name>{friend.name}</Name>

        <Avatar
          onClick={() => handleClickFriendProfile(friend.id)}
          src={friend.avatarUrl}
        />

        <ButtonsContainer>
          <AcceptBtn onClick={() => handleClickAccept(friend.id)}>
            Accept
          </AcceptBtn>
          <CancelBtn onClick={() => handleClickCancel(friend.id)}>
            Cancel
          </CancelBtn>
        </ButtonsContainer>
      </RequestsContainer>
    );
  });

  return (
    <>
      {pendingRequests.length > 0 ? (
        <div>{pendingRequests}</div>
      ) : (
        <Title>No friend requests 😢</Title>
      )}
    </>
  );
};

const CancelBtn = styled.button`
  border-radius: 10px;
  border-style: none;
  padding: 8px;
  background-color: #ff7878;
  font-weight: 600;
  cursor: pointer;
  color: white;
  margin-top: 20px;
  :hover {
    background-color: #9d5353;
  }
`;
const Title = styled.h2`
  text-align: center;
  margin-top: calc(50vh - 69px);
`;
const AcceptBtn = styled.button`
  margin-right: 5px;
  margin-top: 20px;
  border-radius: 10px;
  border-style: none;
  padding: 8px;
  background-color: #54bab9;
  font-weight: 600;
  color: white;
  cursor: pointer;

  :hover {
    background-color: #316b83;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
`;

const RequestsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Name = styled.h3`
  margin: 30px 50px 20px 50px;
`;

const Avatar = styled.img`
  width: 10%;
  margin: 9px;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 50px;
`;
export default FriendRquests;
