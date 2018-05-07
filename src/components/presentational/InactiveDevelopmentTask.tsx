import * as React from "react";
import {
  Header,
  Item} from "semantic-ui-react";
import ITeamMemberAction from "../../models/ITeamMemberAction";
import ITechnique from "../../models/ITechnique";

interface IInactiveDevelopmentTaskProps {
  technique: ITechnique;
  teamMemeberAction: ITeamMemberAction;
}
interface IInactiveDevelopmentTaskState {
  notes: string;
}
 class InactiveDevelopmentTask extends React.Component<
IInactiveDevelopmentTaskProps,
IInactiveDevelopmentTaskState
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
              {"Created On: " +
                new Date(teamMemeberAction.dateAdded).toLocaleDateString()}
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
