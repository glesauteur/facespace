import React from "react";
import { useParams } from "react-router-dom";
import UsersFriends from "./UsersFriends";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ProfilePage = ({ currentUser, setCurrentUser }) => {
  const { id } = useParams();
  const [user, setUser] = React.useState(null);
  let friendshipStatus = "";

  React.useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
      });
  }, [id]);

  if (!user) {
    return <div>loading user profile...</div>;
  }

  function handleAcceptFriendRequest() {
    console.log(user.id, currentUser.id);
    const requestOptionsAcceptFriendship = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newFriends: [currentUser.id, user.id],
      }),
    };
    fetch("/api/friends", requestOptionsAcceptFriendship).then((res) => {
      if (res.ok) {
        fetch(`/api/users/${currentUser.id}`)
          .then((res) => res.json())
          .then((data) => setCurrentUser(data.data));
        fetch(`/api/users/${user.id}`)
          .then((res) => res.json())
          .then((data) => setUser(data.data));
      }
    });
  }

  function handleClickFriendshipRequest() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        friendship: [currentUser.id, user.id],
      }),
    };
    fetch(`/api/newfriendship/`, requestOptions).then((res) => {
      if (res.ok) {
        fetch(`/api/users/${currentUser.id}`)
          .then((res) => res.json())
          .then((data) => setCurrentUser(data.data));
        fetch(`/api/users/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setUser(data.data);
          });
      }
    });
  }

  console.log(user);
  const friends = user.friends.map((friend, index) => {
    return <UsersFriends key={index} id={friend}></UsersFriends>;
  });

  function isFriendWithCurrentUserFn() {
    const friend = currentUser.friends.find((friend) => {
      return friend === user.id;
    });

    return !!friend;
  }

  if (currentUser) {
    const hasPendingFriendRequest = currentUser.friendshipRequests.find(
      (friend) => {
        return friend.to === user.id;
      }
    );

    if (hasPendingFriendRequest) {
      friendshipStatus = "pending";
    }
  }

  function renderFriendshipButton() {
    // If we're not logged in or this is our profile, we don't render anything
    if (!currentUser || currentUser.id === user.id) {
      return;
    }

    const currentUserToFriend = currentUser.friendshipRequests.find(
      (request) => {
        return request.from === currentUser.id && request.to === user.id;
      }
    );

    const friendToCurrentUser = user.friendshipRequests.find((request) => {
      return request.from === user.id && request.to === currentUser.id;
    });

    console.log("currentusertofriend", currentUserToFriend);
    console.log("friendToCurrentUser", friendToCurrentUser);

    if (currentUserToFriend && currentUserToFriend.status === "accepted") {
      return;
    }
    if (friendToCurrentUser && friendToCurrentUser.status === "accepted") {
      return;
    }

    if (isFriendWithCurrentUserFn()) {
      return;
    }

    if (!currentUserToFriend && !friendToCurrentUser) {
      console.log("CASE 1");
      // Case 1: There are no friendship requests between the two users.
      // Add a friend
      return (
        <FriendshipButtonsWrapper>
          <AddBtn onClick={handleClickFriendshipRequest}>
            Add as a friend
          </AddBtn>
        </FriendshipButtonsWrapper>
      );
    } else if (currentUserToFriend && !friendToCurrentUser) {
      // Case 2: There is a friendship pending request from us to the user
      // Cancel friendship request
      console.log("CASE 2");
      return (
        <FriendshipButtonsWrapper>
          <AddBtn onClick={handleClickFriendshipRequest}>
            Cancel Friend Request
          </AddBtn>
        </FriendshipButtonsWrapper>
      );
    } else if (!currentUserToFriend && friendToCurrentUser) {
      console.log("CASE 3");
      // Case 3: There is a friendhsip pending request from them to us
      // Accept friendship
      return (
        <FriendshipButtonsWrapper>
          <AddBtn onClick={handleAcceptFriendRequest}>
            Accept Friend Request
          </AddBtn>
        </FriendshipButtonsWrapper>
      );
    }
  }

  return (
    <>
      <BackgroundImageContainer>
        <BackgroundImage src="/images/facespace_bg.jpg" />
      </BackgroundImageContainer>
      <Container>
        <ProfileInfo>
          <Avatar src={user.avatarUrl} />
          <NameContainer>
            <h2>{user.name}</h2>
            {renderFriendshipButton()}
          </NameContainer>
        </ProfileInfo>
        <br />
        <h3>{user.name}'s friends</h3>
        <Line></Line>
        <FriendsList>{friends}</FriendsList>
      </Container>
    </>
  );
};

const FriendshipButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AddBtn = styled.button`
  margin-top: 10px;
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
const NameContainer = styled.div`
  margin-left: 20px;
`;

const FriendsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;
const Line = styled.hr`
  border-color: #efefef;
  margin-bottom: 30px;
`;
const Container = styled.div`
  margin-left: 90px;
  margin-right: 90px;
`;

const ProfileInfo = styled.div`
  display: flex;
  margin-bottom: 30px;
`;
const BackgroundImageContainer = styled.div`
  width: 100vw;
  height: 400px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const BackgroundImage = styled.img`
  margin-top: -500px;
`;

const Avatar = styled.img`
  width: 20vw;
  margin-top: -120px;
`;

export default ProfilePage;
