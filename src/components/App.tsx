import * as React from "react";
import { Container, Header } from "semantic-ui-react";
import ITeamMember from "../models/ITeamMember";
import teamMembers from "../sampleData/sampleTeam";
import AppFooter from "./AppFooter";
import TeamList from "./TeamList";
import TeamStatistcs from "./TeamStatistics";
import TopMenu from "./TopMenu";
export interface IAppState {
  teamMembers: ITeamMember[];
}

export class App extends React.Component<any, IAppState> {
  constructor(props: any) {
    super(props);
    const state: IAppState = { teamMembers };

    this.state = state;
  }

  public render() {
    return (
      <div>
        <TopMenu />

        <Container text={true} style={{ marginTop: "7em" }}>
          <Header as="h1">Your Team</Header>
          <TeamStatistcs teamMembers={this.state.teamMembers} />
          <TeamList teamMembers={this.state.teamMembers} />
        </Container>
        <AppFooter />
      </div>
    );
  }
}

export default App;
