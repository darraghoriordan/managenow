import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ButtonProps } from "semantic-ui-react";
import { Button, Icon } from "semantic-ui-react";
import ITeamMember from "../../models/ITeamMember";
import ITeamMemberAction from "../../models/ITeamMemberAction";
import AddTeamMemberDevelopmentTask from "../presentational/AddTeamMemberDevelopmentTask";
interface IAddTeamMemberPageProps extends RouteComponentProps<any> {
  teamMember: ITeamMember;
  onDevelopmentTaskSave: (
    teamMemberId: string,
    teamMemberAction: ITeamMemberAction
  ) => void;
}

class AddTeamMemberPage extends React.Component<IAddTeamMemberPageProps, any> {
  constructor(props: IAddTeamMemberPageProps) {
    super(props);

    this.onAddDevelopmentTask = this.onAddDevelopmentTask.bind(this);
  }
  public onAddDevelopmentTask(
    teamMemberId: string,
    teamMemberAction: ITeamMemberAction
  ) {
    this.props.onDevelopmentTaskSave(teamMemberId, teamMemberAction);
    this.props.history.goBack();
  }
  public render() {
    const { teamMember } = this.props;
    return (
      <div style={{ marginTop: "7em" }}>
        <Button
          type="button"
          primary={true}
          style={{ marginBottom: "1em" }}
          // tslint:disable-next-line:jsx-no-lambda
          onClick={(e: any, data: ButtonProps) => {
            this.props.history.goBack();
          }}
        >
          <Icon className="chevron left" />
          Back
        </Button>
        <AddTeamMemberDevelopmentTask
          selectedTeamMember={teamMember}
          onSelection={this.onAddDevelopmentTask}
        />
      </div>
    );
  }
}

export default withRouter(AddTeamMemberPage);
