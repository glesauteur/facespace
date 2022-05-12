import React, { useEffect } from "react";
import styled from "styled-components";
import HomeFeedUser from "./HomeFeedUser";

const HomeFeed = ({ currentUser }) => {
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    return fetch("/api/users")
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

  if (!users) {
    return <div>loading...</div>;
  }

  const homepageUsers = users.map((user) => {
    return (
      <HomeFeedUser
        key={user.id}
        id={user.id}
        name={user.name}
        avatar={user.avatarUrl}
        currentUser={currentUser}
      ></HomeFeedUser>
    );
  });

  return (
    <>
      <Container>
        <SubTitle>All Facespace members</SubTitle>
        <HomepageUsersContainer>{homepageUsers}</HomepageUsersContainer>
      </Container>
    </>
  );
};

const SubTitle = styled.h2`
  margin-top: 15px;
`;
const Container = styled.div`
  margin: 0 50px;
`;
const HomepageUsersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: center;
`;

export default HomeFeed;
