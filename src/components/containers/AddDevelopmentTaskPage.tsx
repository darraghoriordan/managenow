import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ITeamMember from "../../models/ITeamMember";
import ITeamMemberDevelopmentAction from "../../models/ITeamMemberDevelopmentAction";
import AddTeamMemberDevelopmentTask from "../presentational/AddTeamMemberDevelopmentTask";
import TopPageNavigation from "../presentational/TopPageNavigation";
interface IAddTeamMemberPageProps extends RouteComponentProps<any> {
  teamMember: ITeamMember;
  onDevelopmentTaskSave: (
    teamMemberId: string,
    teamMemberAction: ITeamMemberDevelopmentAction
  ) => void;
}

class AddTeamMemberPage extends React.Component<IAddTeamMemberPageProps, any> {
  constructor(props: IAddTeamMemberPageProps) {
    super(props);

    this.onAddDevelopmentTask = this.onAddDevelopmentTask.bind(this);
  }
  public onAddDevelopmentTask(
    teamMemberId: string,
    teamMemberAction: ITeamMemberDevelopmentAction
  ) {
    this.props.onDevelopmentTaskSave(teamMemberId, teamMemberAction);
    this.props.history.goBack();
  }
  public render() {
    const { teamMember } = this.props;
    return (
      <div>
        <TopPageNavigation history={this.props.history} />
        <AddTeamMemberDevelopmentTask
          selectedTeamMember={teamMember}
          onSelection={this.onAddDevelopmentTask}
        />
      </div>
    );
  }
}

export default withRouter(AddTeamMemberPage);
