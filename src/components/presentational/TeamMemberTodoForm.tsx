import { addDays, addMonths, addWeeks } from "date-fns";
import * as React from "react";
import { Button, Form, Header, Message } from "semantic-ui-react";
import { TeamMemberToDoOwner } from "../../models/Enums";
import ITeamMember from "../../models/ITeamMember";
import ITeamMemberTodo, { TeamMemberTodo } from "../../models/ITeamMemberTodo";
interface ISelectItem {
  key: string;
  text: string;
  value: string;
}
interface ITodoFormProps {
  selectedTeamMember: ITeamMember;
  onSave: (
    teamMemberId: string,
    t: ITeamMemberTodo
  ) => Promise<void | ITeamMemberTodo>;
  editingTodo?: ITeamMemberTodo;
}
interface ITodoFormState {
  success?: boolean;
  errors?: string[];
  title: string;
  description: string;
  ownerSelection: string;
  expectedCompletionSelection: string;
}
class AddTeamMemberTodo extends React.Component<
  ITodoFormProps,
  ITodoFormState
> {
  public static defaultProps: Partial<ITodoFormProps> = {
    editingTodo: undefined
  };
  constructor(props: ITodoFormProps) {
    super(props);

    this.onSave = this.onSave.bind(this);
    this.getOwnerSelections = this.getOwnerSelections.bind(this);
    this.getTimeSpanSelections = this.getTimeSpanSelections.bind(this);

    this.state = {
      description: "",
      errors: undefined,
      expectedCompletionSelection: "",
      ownerSelection: "",
      success: undefined,
      title: ""
    };
  }

  public onSave = (event: any) => {
    event.preventDefault();
    const {
      title,
      description,
      ownerSelection,
      expectedCompletionSelection
    } = this.state;

    const todo = new TeamMemberTodo(
      title,
      description,
      this.getOwner(ownerSelection),
      this.getDate(expectedCompletionSelection)
    );
    this.props
      .onSave(this.props.selectedTeamMember.id, todo)
      .then((tm: ITeamMemberTodo) => {
        this.setState({
          errors: undefined,
          success: true
        });
      })
      .catch((error: string) =>
        // tslint:disable-next-line:no-console
        this.setState({
          errors: [error],
          success: false
        })
      );
  };

  public render() {
    if (!this.props.selectedTeamMember || !this.props.selectedTeamMember.name) {
      return null;
    }
    const {
      title,
      description
      // ownerSelection,
      // expectedCompletionSelection
    } = this.state;
    const ownerOptions = this.getOwnerSelections();
    const timeOptions = this.getTimeSpanSelections();
    return (
      <div>
        <Header as="h2">
          Add a todo for {this.props.selectedTeamMember.name}
        </Header>
        <Form onSubmit={this.onSave}>
          <Form.Group>
            <Form.Input
              placeholder="Title"
              name="title"
              value={title}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="Description"
              name="description"
              value={description}
              onChange={this.handleChange}
            />
            <Form.Select
              // selection={true}
              onChange={this.handleChange}
              fluid={true}
              placeholder="Select Owner"
              options={ownerOptions}
              name="ownerSelection"
              // value={ownerSelection}
            />
            <Form.Select
              // selection={true}
              onChange={this.handleChange}
              fluid={true}
              placeholder="Select Due Date"
              options={timeOptions}
              name="expectedCompletionSelection"
              // value={expectedCompletionSelection}
            />

            <Button type="submit">Add todo</Button>
          </Form.Group>
        </Form>
        {this.state.errors && (
          <Message
            error={true}
            header="There were some errors"
            list={this.state.errors || []}
          />
        )}
        {this.state.success && <Message positive={true} header="Todo saved!" />}
      </div>
    );
  }
  private getOwnerSelections(): ISelectItem[] {
    return [
      {
        key: "you",
        text: "You",
        value: "you"
      },
      {
        key: "teamMember",
        text: "Them",
        value: "teamMember"
      }
    ];
  }
  private getTimeSpanSelections(): ISelectItem[] {
    return [
      {
        key: "oneDay",
        text: "One Day",
        value: "oneDay"
      },
      {
        key: "threeDays",
        text: "Three Days",
        value: "threeDays"
      },
      {
        key: "oneWeek",
        text: "One Week",
        value: "oneWeek"
      },
      {
        key: "twoWeeks",
        text: "Two Weeks",
        value: "twoWeeks"
      },
      {
        key: "oneMonth",
        text: "One Month",
        value: "oneMonth"
      },
      {
        key: "threeMonths",
        text: "Three Months",
        value: "threeMonths"
      }
    ];
  }
  private handleChange = (e: any, { name, value }: any) =>
    this.setState({ [name]: value, success: undefined });

  private getDate(timespanSelection: string): number {
    if (timespanSelection === "threeDays") {
      return addDays(new Date(), 3).getTime();
    }
    if (timespanSelection === "oneWeek") {
      return addWeeks(new Date(), 1).getTime();
    }
    if (timespanSelection === "twoWeeks") {
      return addWeeks(new Date(), 2).getTime();
    }
    if (timespanSelection === "oneMonth") {
      return addMonths(new Date(), 1).getTime();
    }
    if (timespanSelection === "threeMonths") {
      return addMonths(new Date(), 3).getTime();
    }

    return addDays(new Date(), 1).getTime();
  }
  private getOwner(ownerSelection: string): TeamMemberToDoOwner {
    return TeamMemberToDoOwner[ownerSelection];
  }
}
export default AddTeamMemberTodo;
