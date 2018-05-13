import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ITeamMember from "../../models/ITeamMember";
import ITeamMemberTodo from "../../models/ITeamMemberTodo";
import AddTeamMemberTodo from "../presentational/TeamMemberTodoForm";
import TopPageNavigation from "../presentational/TopPageNavigation";
interface IAddTeamMemberPageProps extends RouteComponentProps<any> {
  teamMember: ITeamMember;
  onTodoSave: (
    teamMemberId: string,
    teamMemberTodo: ITeamMemberTodo
  ) => Promise<void|ITeamMemberTodo>;
}

class AddTodoPage extends React.Component<IAddTeamMemberPageProps, any> {
  constructor(props: IAddTeamMemberPageProps) {
    super(props);

    this.onTodoSave = this.onTodoSave.bind(this);
  }
  public onTodoSave(
    teamMemberId: string,
    teamMemberTodo: ITeamMemberTodo
  ): Promise<void|ITeamMemberTodo> {
    return this.props.onTodoSave(teamMemberId, teamMemberTodo);
  }
  public render() {
    const { teamMember } = this.props;
    return (
      <div>
        <TopPageNavigation history={this.props.history} />
        <AddTeamMemberTodo
          selectedTeamMember={teamMember}
          onSave={this.onTodoSave}
        />
      </div>
    );
  }
}

export default withRouter(AddTodoPage);
