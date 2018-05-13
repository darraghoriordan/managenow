import { distanceInWordsToNow } from "date-fns";
import * as React from "react";
import { Button, ButtonProps, Icon, Item } from "semantic-ui-react";
import ITeamMemberTodo from "../../models/ITeamMemberTodo";

interface IActiveTodoProps {
  teamMemberTodo: ITeamMemberTodo;
  onCompletedClick: (teamMemberToDoId: string) => void;
}

class ActiveTodo extends React.Component<IActiveTodoProps, any> {
  constructor(props: IActiveTodoProps) {
    super(props);
  }
  public handleChange = (e: any, { name, value }: any) =>
    this.setState({ [name]: value });

  public render() {
    const { teamMemberTodo } = this.props;
    const addedAsDate = new Date(teamMemberTodo.dateAdded);
    const completionAsDate = new Date(teamMemberTodo.expectedCompletionDate);
    return (
      <Item key={teamMemberTodo.id}>
        <Item.Content>
          <Item.Header>{teamMemberTodo.title}</Item.Header>
          <Item.Meta>Added: {addedAsDate.toLocaleString()}</Item.Meta>

          <Item.Meta>
            Expected in{" "}
            {distanceInWordsToNow(completionAsDate, { addSuffix: true })}
          </Item.Meta>
          <Item.Meta>Owner: {teamMemberTodo.owner}</Item.Meta>
          <Item.Description>{teamMemberTodo.description}</Item.Description>
          <Item.Extra>
            <Button
              type="button"
              primary={true}
              floated="right"
              // tslint:disable-next-line:jsx-no-lambda
              onClick={(e: any, data: ButtonProps) => {
                this.props.onCompletedClick(teamMemberTodo.id);
              }}
            >
              <Icon className="check" />
              Mark Completed
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default ActiveTodo;
