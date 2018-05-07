import * as React from "react";
import {
  Button,
  Form,
  Header,
  Icon,
  Message,
  TextArea
} from "semantic-ui-react";
import { TeamMemberInteractionSentiment } from "../../models/Enums";
import ITeamMember from "../../models/ITeamMember";
import ITeamMemberInteraction, {
  TeamMemberInteraction
} from "../../models/ITeamMemberInteractions";

interface IAddTeamMemberInteractionFormProps {
  selectedTeamMember: ITeamMember;
  onTeamMemberInteractionAdd: (
    teamMemberId: string,
    teamMemberInteraction: ITeamMemberInteraction
  ) => Promise<void | ITeamMemberInteraction>;
}
interface IAddTeamMemberInteractionFormState {
  description: string;
  errors?: string[];
  lastSavedInteraction?: ITeamMemberInteraction;
  success?: boolean;
}
class AddTeamMemberInteractionForm extends React.Component<
  IAddTeamMemberInteractionFormProps,
  IAddTeamMemberInteractionFormState
> {
  constructor(props: IAddTeamMemberInteractionFormProps) {
    super(props);

    this.state = {
      description: "",
      errors: undefined,
      lastSavedInteraction: undefined,
      success: undefined
    };

    this.manuallyOverrideInteractionSentiment = this.manuallyOverrideInteractionSentiment.bind(
      this
    );
    this.saveInteraction = this.saveInteraction.bind(this);
    this.createTeamMemberInteraction = this.createTeamMemberInteraction.bind(
      this
    );
  }
  public manuallyOverrideInteractionSentiment(
    interaction: ITeamMemberInteraction,
    newSentiment: TeamMemberInteractionSentiment
  ) {
    if (!interaction || !interaction.id) {
      return;
    }

    interaction = Object.assign({}, this.state.lastSavedInteraction);
    interaction.manualSentiment = newSentiment;

    this.saveInteraction(interaction);
  }
  public saveInteraction(interaction: ITeamMemberInteraction) {
    this.props
      .onTeamMemberInteractionAdd(this.props.selectedTeamMember.id, interaction)
      .then((tm: ITeamMemberInteraction) => {
        // refresh the form

        this.setState({
          description: "",
          errors: undefined,
          lastSavedInteraction: tm,
          success: true
        });
      })
      .catch((error: string) =>
        // tslint:disable-next-line:no-console
        this.setState({
          errors: [error]
        })
      );
  }
  public createTeamMemberInteraction = (event: any) => {
    event.preventDefault();
    const { description } = this.state;
    const teamMemberInteraction = new TeamMemberInteraction(
      description,
      TeamMemberInteractionSentiment.neutral
    );
    this.saveInteraction(teamMemberInteraction);
  };
  public render() {
    const { description } = this.state;
    const lastSavedInteraction =
      this.state.lastSavedInteraction || ({} as ITeamMemberInteraction);
    const lastSavedInteractionSentiment =
      lastSavedInteraction.manualSentiment ||
      lastSavedInteraction.computedSentiment;
    return (
      <div>
        <Header as="h2">Add an interaction</Header>
        <Form onSubmit={this.createTeamMemberInteraction}>
          <Form.Group>
            <TextArea
              placeholder="what was the interaction?..."
              name="description"
              value={description}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button positive={true} type="submit" fluid={true}>
            <Icon name="save" />
            Save interaction
          </Button>
        </Form>
        {this.state.errors && (
          <Message
            error={true}
            header="There were some errors"
            list={this.state.errors || []}
          />
        )}
        {this.state.success && (
          <Message positive={true}>
            <Message.Header>Interaction saved!</Message.Header>
            <p>
              We detected a {lastSavedInteractionSentiment} sentiment. Is this
              incorrect?
            </p>
            {lastSavedInteractionSentiment !==
              TeamMemberInteractionSentiment.positive && (
              <Button
                onClick={
                  // tslint:disable-next-line:jsx-no-lambda
                  () =>
                    this.manuallyOverrideInteractionSentiment(
                      this.state.lastSavedInteraction ||
                        ({} as ITeamMemberInteraction),
                      TeamMemberInteractionSentiment.positive
                    )
                }
              >
                Change to Positive
              </Button>
            )}
            {lastSavedInteractionSentiment !==
              TeamMemberInteractionSentiment.negative && (
              <Button
                onClick={
                  // tslint:disable-next-line:jsx-no-lambda
                  () =>
                    this.manuallyOverrideInteractionSentiment(
                      this.state.lastSavedInteraction ||
                        ({} as ITeamMemberInteraction),
                      TeamMemberInteractionSentiment.negative
                    )
                }
              >
                Change to Negative
              </Button>
            )}
            {lastSavedInteractionSentiment !==
              TeamMemberInteractionSentiment.neutral && (
              <Button
                onClick={
                  // tslint:disable-next-line:jsx-no-lambda
                  () =>
                    this.manuallyOverrideInteractionSentiment(
                      this.state.lastSavedInteraction ||
                        ({} as ITeamMemberInteraction),
                      TeamMemberInteractionSentiment.neutral
                    )
                }
              >
                Change to Neutral
              </Button>
            )}
          </Message>
        )}
      </div>
    );
  }

  private handleChange = (e: any, { name, value }: any) =>
    this.setState({ [name]: value, success: undefined });
}

export default AddTeamMemberInteractionForm;
