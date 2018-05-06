import * as React from "react";
import { Container,Header } from "semantic-ui-react";
const HomePage = () => (
  <div>
    <Container text={true} style={{ marginTop: "7em" }}>
      <Header as="h1">
        The greatest minds in leadership at your fingertips
      </Header>
      <Header as="h3">
      Rapidly improve your team with instant references to relevant content in your favorite leadership books, blogs and podcasts.
      </Header>
      <Header as="h3">
        Use AI and machine learning to monitor the pulse of your team.
      </Header>
      <Header as="h3">
        Effectively track those tasks that surface throughout the day - on mobile and in the cloud.
      </Header>
    </Container>
  </div>
);

export default HomePage;
