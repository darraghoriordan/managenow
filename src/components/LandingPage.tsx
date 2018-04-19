import * as React from "react";
import { Container, Header } from "semantic-ui-react";
import ITeamMember from "../models/ITeamMember";
import TeamList from "./TeamList";
import TeamMemberNotes from "./TeamMemberNotes";
import TeamMemberTodos from "./TeamMemberTodos";
import TeamStatistcs from "./TeamStatistics";

export interface ILandingPageProps {
  teamMembers: ITeamMember[];
}
export default class LandingPage extends React.PureComponent<
  ILandingPageProps,
  any
> {
  constructor(props: ILandingPageProps) {
    super(props);
  }

  public render() {
    return (
      <Container text={true} style={{ marginTop: "7em" }}>
        <Header as="h1">Your Team</Header>
        <TeamStatistcs teamMembers={this.props.teamMembers} />
        <TeamList teamMembers={this.props.teamMembers} />
        <TeamMemberNotes teamMemberNotes={this.props.teamMembers[0].notes} />
        <TeamMemberTodos teamMemberTodos={this.props.teamMembers[0].todos} />
      </Container>
    );
  }
}
