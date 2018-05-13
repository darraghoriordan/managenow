import * as React from "react";
import { Header, Item } from "semantic-ui-react";
import ITeamMemberDevelopmentAction from "../../models/ITeamMemberDevelopmentAction";
import ITechnique from "../../models/ITechnique";

interface IInactiveDevelopmentTaskProps {
  technique: ITechnique;
  teamMemeberAction: ITeamMemberDevelopmentAction;
}
class InactiveDevelopmentTask extends React.Component<
  IInactiveDevelopmentTaskProps,
  any
> {
  constructor(props: IInactiveDevelopmentTaskProps) {
    super(props);
  }

  public render() {
    const { technique, teamMemeberAction } = this.props;
    return (
      <Item key={teamMemeberAction.id}>
        <Item.Content>
          <Item.Header>{technique.name}</Item.Header>
          <Item.Meta>
            <span className="source">
              {technique.sourcename + " - " + technique.locationInSource}
            </span>
          </Item.Meta>
          <Item.Meta>
            <span className="created">
              {"Completed On: " +
                new Date(teamMemeberAction.dateCompleted).toLocaleString()}
            </span>
          </Item.Meta>
          <Item.Description>{technique.description}</Item.Description>
          <Header as="h4">Notes</Header>
          <p>{teamMemeberAction.notes}</p>
        </Item.Content>
      </Item>
    );
  }
}

export default InactiveDevelopmentTask;
