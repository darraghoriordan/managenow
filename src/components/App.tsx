import * as React from "react";
import { Container, Header } from "semantic-ui-react";
import ITeamMember from "../models/ITeamMember";
import AppFooter from "./AppFooter";
import TopMenu from "./TopMenu";

export interface IAppState {
  teamMembers: ITeamMember[];
}

export class App extends React.Component<any, IAppState> {
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
