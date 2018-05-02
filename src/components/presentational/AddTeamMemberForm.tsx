import * as React from "react";
import { Button, Form, Header, Message } from "semantic-ui-react";
import ITeamMember, { TeamMember } from "../../models/ITeamMember";

interface IAddTeamMemberFormProps {
  onTeamMemberAdd: (teamMember: ITeamMember) => Promise<ITeamMember>;
}
interface IAddTeamMemberFormState {
  name: string;
  errors?: string[];
}
class AddTeamMemberForm extends React.Component<
  IAddTeamMemberFormProps,
  IAddTeamMemberFormState
> {
  constructor(props: IAddTeamMemberFormProps) {
    super(props);

    this.state = { name: "", errors: undefined };
  }

  public createTeamMember = (event: any) => {
    event.preventDefault();
    const { name } = this.state;
    const teamMember = new TeamMember(name);
    this.props
      .onTeamMemberAdd(teamMember)
      .then((tm: ITeamMember) => {
        // refresh the form

        this.setState({
          errors: undefined,
          name: ""
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
    const { name } = this.state;
    return (
      <div>
        <Header as="h2">Add a team member</Header>
        <Form onSubmit={this.createTeamMember}>
          <Form.Group>
            <Form.Input
              placeholder="Name"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
            <Button type="submit">Add team member</Button>
          </Form.Group>
        </Form>
        {this.state.errors && (
          <Message
            error={true}
            header="There was some errors"
            list={this.state.errors || []}
          />
        )}
      </div>
    );
  }

  private handleChange = (e: any, { name, value }: any) =>
    this.setState({ [name]: value });
}

export default AddTeamMemberForm;
