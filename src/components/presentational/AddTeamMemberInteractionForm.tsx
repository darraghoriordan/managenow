import * as React from "react";
import { Button, Form, Header, Message } from "semantic-ui-react";
import { TeamMemberInteractionSentiment } from "../../models/Enums";
import ITeamMember from "../../models/ITeamMember";
import ITeamMemberInteraction, { TeamMemberInteraction } from "../../models/ITeamMemberInteractions";

interface IAddTeamMemberFormProps {
  selectedTeamMember: ITeamMember;
  onTeamMemberInteractionAdd: (teamMemberId:string, teamMemberInteraction: ITeamMemberInteraction) => Promise<void | ITeamMemberInteraction>;
}
interface IAddTeamMemberFormState {
  description: string;
  errors?: string[];
  success?: boolean;
}
class AddTeamMemberForm extends React.Component<
  IAddTeamMemberFormProps,
  IAddTeamMemberFormState
> {
  constructor(props: IAddTeamMemberFormProps) {
    super(props);

    this.state = { description: "", errors: undefined, success: undefined };
  }

  public createTeamMemberInteraction = (event: any) => {
    event.preventDefault();
    const { description } = this.state;
    const teamMemberInteraction = new TeamMemberInteraction(description, TeamMemberInteractionSentiment.neutral);
    this.props
      .onTeamMemberInteractionAdd(this.props.selectedTeamMember.id, teamMemberInteraction)
      .then((tm: ITeamMemberInteraction) => {
        // refresh the form

        this.setState({
          description: "",
          errors: undefined,
      
          success: true
        });
      })
      .catch((error: string) =>
        // tslint:disable-next-line:no-console
        this.setState({
          errors: [error]
        })
      );
  };
  public render() {
    const { description } = this.state;
    return (
      <div>
        <Header as="h2">Add an interaction</Header>
        <Form onSubmit={this.createTeamMemberInteraction}>
          <Form.Group>
            <Form.Input
              placeholder="what was the interaction?..."
              name="description"
              value={description}
              onChange={this.handleChange}
            />
            <Button type="submit">Add interaction</Button>
          </Form.Group>
        </Form>
        {this.state.errors && (
          <Message
            error={true}
            header="There were some errors"
            list={this.state.errors || []}
          />
        )}
        {this.state.success && <Message positive={true} header="Interaction saved!" />}
      </div>
    );
  }

  private handleChange = (e: any, { name, value }: any) =>
    this.setState({ [name]: value, success: undefined });
}

export default AddTeamMemberForm;
