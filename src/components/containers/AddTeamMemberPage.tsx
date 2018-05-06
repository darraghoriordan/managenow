import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ButtonProps } from "semantic-ui-react";
import { Button, Icon } from "semantic-ui-react";
import ITeamMember from "../../models/ITeamMember";
import AddTeamMemberForm from "../presentational/AddTeamMemberForm";
interface IAddTeamMemberPageProps extends RouteComponentProps<any> {
  onTeamMemberAdd: (teamMember: ITeamMember) => Promise<ITeamMember>;
}
const AddTeamMemberPage = (props: IAddTeamMemberPageProps) => (
  <div style={{ marginTop: "7em" }}>
    <Button
      type="button"
      primary={true}
      style={{ marginBottom: "1em" }}
      // tslint:disable-next-line:jsx-no-lambda
      onClick={(e: any, data: ButtonProps) => {
        props.history.goBack();
      }}
    >
      <Icon className="chevron left" />
      Back
    </Button>
    <AddTeamMemberForm onTeamMemberAdd={props.onTeamMemberAdd} />
  </div>
);

export default withRouter(AddTeamMemberPage);
