import * as React from "react";
import {
  Button,
  ButtonProps,
  Header,
  Icon,
  Item,
  Rating
} from "semantic-ui-react";
import constants from "../../constants/constants";
import ITeamMember from "../../models/ITeamMember";
import ITeamMemberAction, {
  TeamMemberAction
} from "../../models/ITeamMemberAction";
import ITechnique from "../../models/ITechnique";
import { getRelevantTechniques } from "../../services/techniqueService";
import { TechniqueCategorySelector } from "./TechniqueCategorySelector";

interface IAddActionProps {
  selectedTeamMember: ITeamMember;
  onSelection: (teamMemberId: string, t: ITeamMemberAction) => void;
}
interface IAddActionState {
  selectedBehaviour: any;
  techniques: ITechnique[];
}
class AddTeamMemberDevelopmentTask extends React.Component<
  IAddActionProps,
  IAddActionState
> {
  constructor(props: IAddActionProps) {
    super(props);
    this.onSelectChanged = this.onSelectChanged.bind(this);
    this.state = {
      selectedBehaviour: "",
      techniques: []
    };
  }

  public onSelectChanged(event: any, data: any) {
    if (typeof data === "undefined") {
      return;
    }
    const selectedTechniques = getRelevantTechniques(data.value);

    this.setState({
      selectedBehaviour: data.value,
      techniques: selectedTechniques
    });
  }

  public onSelectedTechnique(event: any, technique: ITechnique) {
    // maybe this creation shouldn't be here
    const teamMemberAction = new TeamMemberAction(technique.id);
    this.props.onSelection(this.props.selectedTeamMember.id, teamMemberAction);
  }
  public render() {
    if (!this.props.selectedTeamMember || !this.props.selectedTeamMember.name) {
      return null;
    }
    return (
      <div>
        <Header as="h2">
          Add a development task for {this.props.selectedTeamMember.name}
        </Header>
        <TechniqueCategorySelector
          onSelectChanged={this.onSelectChanged}
          placeholderText={
            constants.FIELD_STRINGS.techniqueSearchPlaceholderText
          }
        />
        <Item.Group divided={true}>
          {this.state.techniques.map(technique => (
            <Item key={technique.id}>
              {technique.coverimage && (
                <Item.Image size="tiny" src={technique.coverimage} />
              )}
              <Item.Content>
                <Item.Header>{technique.name}</Item.Header>
                <Item.Meta>
                  <span className="source-name">
                    Source: {technique.sourcename}
                  </span>{" "}
                  by{" "}
                  <span className="source-author">{technique.author}</span>
                </Item.Meta>
                <Item.Meta>
                  <span className="source-location">
                    Location: {technique.locationInSource}
                  </span>
                </Item.Meta>

                <Item.Meta>
                  <Rating
                    icon="star"
                    defaultRating={technique.rating / 2}
                    disabled={true}
                    maxRating={5}
                  />
                </Item.Meta>
                <Item.Description>{technique.description}</Item.Description>
                <Item.Extra>
                  <Button
                    content="Get this source (external site)"
                    icon="add to cart"
                    labelPosition="left"
                    floated="left"
                    // tslint:disable-next-line:jsx-no-lambda
                    onClick={(e: any, data: ButtonProps) => {
                      const win = window.open(technique.referralLink, "_blank");
                      (win || ({} as Window)).focus();
                    }}
                  />
                  <Button
                    type="button"
                    positive={true}
                    floated="right"
                    // tslint:disable-next-line:jsx-no-lambda
                    onClick={(e: any, data: ButtonProps) => {
                      this.onSelectedTechnique(e, technique);
                    }}
                  >
                    Assign task to {this.props.selectedTeamMember.name}
                    <Icon className="right chevron" />
                  </Button>
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </div>
    );
  }
}
export default AddTeamMemberDevelopmentTask;
