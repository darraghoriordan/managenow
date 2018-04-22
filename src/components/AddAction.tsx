import * as React from "react";
import {
  Button,
  Dropdown,
  Icon,
  Image as ImageComponent,
  Item,
  Label
} from "semantic-ui-react";

const paragraph = (
  <ImageComponent src="/assets/images/wireframe/short-paragraph.png" />
);
interface IDropdownOption {
  key: string;
  value: string;
  text:string;
}
interface IAddActionProps {
  categories: IDropdownOption[];
}
class AddAction extends React.PureComponent<IAddActionProps> {
  constructor(props: IAddActionProps) {
    super(props);
  }
  public render() {
    return (
      <div>
        <Dropdown
          placeholder="I need to work on..."
          fluid={true}
          search={true}
          selection={true}
          options={this.props.categories}
        />
        <Item.Group divided={true}>
          <Item>
            <Item.Content>
              <Item.Header as="a">12 Years a Slave</Item.Header>
              <Item.Meta>
                <span className="cinema">Union Square 14</span>
              </Item.Meta>
              <Item.Description>{paragraph}</Item.Description>
              <Item.Extra>
                <Button primary={true} floated="right">
                  Use Technique
                  <Icon className="right chevron" />
                </Button>
                <Label>IMAX</Label>
                <Label icon="globe" content="Additional Languages" />
              </Item.Extra>
            </Item.Content>
          </Item>

          <Item>
            <Item.Content>
              <Item.Header as="a">My Neighbor Totoro</Item.Header>
              <Item.Meta>
                <span className="cinema">IFC Cinema</span>
              </Item.Meta>
              <Item.Description>{paragraph}</Item.Description>
              <Item.Extra>
                <Button primary={true} floated="right">
                  Use Technique
                  <Icon className="right chevron" />
                </Button>
                <Label>Limited</Label>
              </Item.Extra>
            </Item.Content>
          </Item>

          <Item>
            <Item.Content>
              <Item.Header as="a">Watchmen</Item.Header>
              <Item.Meta>
                <span className="cinema">IFC</span>
              </Item.Meta>
              <Item.Description>{paragraph}</Item.Description>
              <Item.Extra>
                <Button primary={true} floated="right">
                  Use Technique
                  <Icon className="right chevron" />
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    );
  }
}
export default AddAction;
