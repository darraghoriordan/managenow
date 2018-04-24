import * as React from "react";
import { Button, ButtonProps, Dropdown, Icon, Item } from "semantic-ui-react";
import constants from "../constants/constants";
import ITechnique from "../models/ITechnique";
import { getRelevantTechniques } from "../services/techniqueService";

interface IDropdownOption {
  key: string;
  value: string;
  text: string;
}
interface IAddActionProps {
  categories: IDropdownOption[];
  onSelection: (event: any, data: ButtonProps, t: ITechnique) => void;
}
interface IAddActionState {
  selectedBehaviour: any;
  techniques: ITechnique[];
}
class AddAction extends React.PureComponent<IAddActionProps, IAddActionState> {
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

  public render() {
    return (
      <div>
        <Dropdown
          placeholder={constants.FIELD_STRINGS.techniqueSearchPlaceholderText}
          fluid={true}
          search={true}
          selection={true}
          options={this.props.categories}
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
                      this.props.onSelection(e, data, t);
                    }}
                  >
                    Use Technique
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
