import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Button, ButtonProps, Header, Icon } from "semantic-ui-react";
import constants from "../../constants/constants";
import { TeamMemberTodoStatus } from "../../models/Enums";
import ITeamMember from "../../models/ITeamMember";
import ITeamMemberTodo from "../../models/ITeamMemberTodo";
import TeamMemberTodoList from "../presentational/TeamMemberTodoList";
import { TopPageNavigation } from "../presentational/TopPageNavigation";

export interface IToDoPageProps extends RouteComponentProps<any> {
  isAuthenticated: boolean;
  teamMember: ITeamMember;
  todos: ITeamMemberTodo[];
  onToDoSave: (
    teamMemberId: string,
    teamMemberToDo: ITeamMemberTodo
  ) => Promise<void | ITeamMemberTodo>;
}
export interface IToDoPageState {
  loading: boolean;
}
class ToDoPage extends React.PureComponent<IToDoPageProps, IToDoPageState> {
  constructor(props: IToDoPageProps) {
    super(props);

    this.onTeamMemberToDoComplete = this.onTeamMemberToDoComplete.bind(this);

    this.state = {
      loading: true
    };
  }

  public componentDidMount() {
    if (!this.props.isAuthenticated) {
      // tslint:disable-next-line:no-console
      console.log("no auth user, redirecting to signin");
      this.props.history.push(constants.ROUTES.SIGN_IN);
    }

    this.setState({ loading: false });
  }
  public onTeamMemberToDoComplete(teamMemberToDoId: string) {
    const todo = Object.assign(
      {},
      this.props.teamMember.todos[teamMemberToDoId]
    ) as ITeamMemberTodo;
    todo.dateCompleted = new Date().getTime();
    todo.status = TeamMemberTodoStatus.done;
    // TODO: handle the success and error
    this.props.onToDoSave(this.props.teamMember.id, todo);
  }

  public render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    const { teamMember, todos } = this.props;
    return (
      <React.Fragment>
        <TopPageNavigation history={this.props.history} />
        <Header as="h1">Todos - {teamMember.name}</Header>
        <Button
          type="button"
          primary={true}
          style={{ marginBottom: "1em" }}
          // tslint:disable-next-line:jsx-no-lambda
          onClick={(e: any, data: ButtonProps) => {
            this.props.history.push(
              constants.ROUTES.TEAM_MEMBER_TODOS_ADD.replace(
                ":id",
                teamMember.id
              )
            );
          }}
        >
          Add To Do
          <Icon className="chevron right" />
        </Button>
        <TeamMemberTodoList
          teamMemberName={teamMember.name}
          todos={todos}
          onTeamMemberToDoComplete={this.onTeamMemberToDoComplete}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(ToDoPage);
