import * as React from "react";
import {
  Button,
  ButtonProps,
  Dropdown,
  Header,
  Icon,
  Item
} from "semantic-ui-react";
import constants from "../constants/constants";
import ITeamMember from "../models/ITeamMember";
import ITeamMemberAction, {
  TeamMemberAction
} from "../models/ITeamMemberAction";
import ITechnique from "../models/ITechnique";
import { getRelevantTechniques } from "../services/techniqueService";

interface IDropdownOption {
  key: string;
  value: string;
  text: string;
}
interface IAddActionProps {
  selectedTeamMember: ITeamMember;
  onSelection: (teamMemberId: string, t: ITeamMemberAction) => void;
}
interface IAddActionState {
  selectedBehaviour: any;
  techniques: ITechnique[];
}
class AddAction extends React.Component<IAddActionProps, IAddActionState> {
  constructor(props: IAddActionProps) {
    super(props);
    this.onSelectChanged = this.onSelectChanged.bind(this);
    this.state = {
      selectedBehaviour: "",
      techniques: []
    };
  }
  public getCategoriesAsDropDownModels(
    categories: string[]
  ): IDropdownOption[] {
    return categories.map(objKey => {
      const val = constants.TECHNIQUE_CATEGORY[objKey];
      return {
        key: objKey,
        text: val,
        value: objKey
      };
    });
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
    return (
      <div>
        <Header as="h2">
          Add an action for {this.props.selectedTeamMember.name}
        </Header>
        <Dropdown
          placeholder={constants.FIELD_STRINGS.techniqueSearchPlaceholderText}
          fluid={true}
          search={true}
          selection={true}
          options={this.getCategoriesAsDropDownModels(
            Object.keys(constants.TECHNIQUE_CATEGORY)
          )}
          onChange={this.onSelectChanged}
        />
        <Item.Group divided={true}>
          {this.state.techniques.map(t => (
            <Item key={t.id}>
              <Item.Content>
                <Item.Header as="a">{t.name}</Item.Header>
                <Item.Meta>
                  <span className="source">{t.locationInSource}</span>
                </Item.Meta>
                <Item.Description>{t.description}</Item.Description>
                <Item.Extra>
                  <Button
                    type="button"
                    primary={true}
                    floated="right"
                    // tslint:disable-next-line:jsx-no-lambda
                    onClick={(e: any, data: ButtonProps) => {
                      this.onSelectedTechnique(e, t);
                    }}
                  >
                    Select
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
export default AddAction;
