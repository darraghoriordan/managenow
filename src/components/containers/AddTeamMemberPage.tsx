import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ITeamMember from "../../models/ITeamMember";
import AddTeamMemberForm from "../presentational/AddTeamMemberForm";
import TopPageNavigation from "../presentational/TopPageNavigation";
interface IAddTeamMemberPageProps extends RouteComponentProps<any> {
  onTeamMemberAdd: (teamMember: ITeamMember) => Promise<ITeamMember>;
}
const AddTeamMemberPage = (props: IAddTeamMemberPageProps) => (
  <React.Fragment>
    <TopPageNavigation history={props.history} />
    <AddTeamMemberForm onTeamMemberAdd={props.onTeamMemberAdd} />
  </React.Fragment>
);

export default withRouter(AddTeamMemberPage);
