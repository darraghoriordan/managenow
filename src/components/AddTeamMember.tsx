import * as React from "react";
import { Button, Form } from "semantic-ui-react";
import ITeamMember, { TeamMember } from "../models/ITeamMember";

interface IAddTeamMemberFormProps {
  addTeamMember: (teamMember: ITeamMember) => void;
}
interface IAddTeamMemberFormState {
  name: string;
}
class AddTeamMemberForm extends React.Component<
  IAddTeamMemberFormProps,
  IAddTeamMemberFormState
> {
  constructor(props: IAddTeamMemberFormProps) {
    super(props);

    this.state = { name: "" };
  }

  public createTeamMember = (event: any) => {
    event.preventDefault();
    const { name } = this.state;
    const teamMember = new TeamMember(name);
    this.props.addTeamMember(teamMember);
    // refresh the form
    event.currentTarget.reset();
  };
  public render() {
    const { name } = this.state;
    return (
      <Form onSubmit={this.createTeamMember}>
        <Form.Group>
          <Form.Input
            placeholder="Name"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <Button type="submit">+ Add team member</Button>
        </Form.Group>
      </Form>
    );
  }

  private handleChange = (e: any, { name, value }: any) =>
    this.setState({ [name]: value });
}

export default AddTeamMemberForm;
