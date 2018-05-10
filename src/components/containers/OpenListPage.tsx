import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import {
  Button,
  ButtonProps,
  Container,
  Header,
  Icon,
  Item,
  Popup,
  Rating
} from "semantic-ui-react";
import constants from "../../constants/constants";
import ITechnique from "../../models/ITechnique";
import { getRelevantTechniques } from "../../services/techniqueService";
import TechniqueCategorySelector from "../presentational/TechniqueCategorySelector";

interface IOpenListPageState {
  selectedBehaviour: string;
  techniques: ITechnique[];
}

class OpenListPage extends React.Component<
  RouteComponentProps<any>,
  IOpenListPageState
> {
  constructor(props: RouteComponentProps<any>) {
    super(props);
    this.onSelectChanged = this.onSelectChanged.bind(this);
    this.state = {
      selectedBehaviour: "",
      techniques: [] as ITechnique[]
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
      <Container text={true}>
        <Header as="h1">Find the best solutions to common leadership problems</Header>
        Select a topic and find solutions from your favorite world-class leaders<TechniqueCategorySelector 
        onSelectChanged={this.onSelectChanged} 
        placeholderText={ constants.FIELD_STRINGS.openListtechniqueSearchPlaceholderText}
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
                  <Popup
                    trigger={
                      <Button
                        type="button"
                        color="orange"
                        disabled={true}
                        floated="right"
                        // tslint:disable-next-line:jsx-no-lambda
                        onClick={(e: any, data: ButtonProps) => {
                          // BUY PREMIUM!!!
                        }}
                      >
                        <Icon className="lock" />Assign task to a team member
                        <Icon className="right chevron" />
                      </Button>
                    }
                    content="With the app you can assign techniques and track progress."
                    on="hover"
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Container>
    );
  }
}

export default withRouter(OpenListPage);
