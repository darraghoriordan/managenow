import * as React from "react";
import { Container, Header } from "semantic-ui-react";
import AppFooter from "./AppFooter";
import ITeamMember from "./Models/ITeamMember";
import TopMenu from "./TopMenu";

interface IAppState {
  teamMembers: ITeamMember[];
}

class App extends React.Component<null, IAppState> {
  public render() {
    return (
      <div>
        <TopMenu />

        <Container text={true} style={{ marginTop: "7em" }}>
          <Header as="h1">Semantic UI React Fixed Template</Header>
          <p>
            This is a basic fixed menu template using fixed size containers.
          </p>
          <p>
            A text container is used for the main container, which is useful for
            single column layouts.
          </p>
        </Container>
        <AppFooter />
      </div>
    );
  }
}

export default App;
