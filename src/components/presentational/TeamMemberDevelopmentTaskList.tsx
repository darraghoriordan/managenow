import * as React from "react";
import { Divider, Header, Item } from "semantic-ui-react";
import { TeamMemberActionStatus } from "../../models/Enums";
import ITeamMemberAction from "../../models/ITeamMemberAction";
import ITechnique from "../../models/ITechnique";
import ActiveDevelopmentTask from "./ActiveDevelopmentTask";
import InactiveDevelopmentTask from "./InactiveDevelopmentTask";
interface ITeamMemberActionListProps {
  actions: {};
  teamMemberName: string;
  techniques: ITechnique[];
  onCompletedClick: (teamMemberActionId: string, notes: string) => void;
  onSaveNotesClick: (teamMemberActionId: string, notes: string) => void;
}

export default class TeamMemberDevelopmentTaskList extends React.Component<
  ITeamMemberActionListProps,
  any
> {
  constructor(props: ITeamMemberActionListProps) {
    super(props);
  }

  public render() {
    const { teamMemberName, actions } = this.props;
    const activeTasks = Object.keys(actions || {})
      .map((element: string) => actions[element] as ITeamMemberAction)
      .filter(
        (el: ITeamMemberAction) => el.status === TeamMemberActionStatus.active
      );

    const completedTasks = Object.keys(actions || {})
      .map((element: string) => actions[element] as ITeamMemberAction)
      .filter(
        (el: ITeamMemberAction) => el.status === TeamMemberActionStatus.done
      );
    return (
      <div>
        <div>
          <Header as="h2">Active Development Tasks</Header>
          <Item.Group divided={true}>
            {activeTasks.map((el: ITeamMemberAction) => {
              const technique =
                this.props.techniques.find(x => x.id === el.techniqueId) ||
                ({} as ITechnique);
              if (!technique) {
                return null;
              }
              return (
                <ActiveDevelopmentTask
                  technique={technique}
                  teamMemeberAction={el}
                  onCompletedClick={this.props.onCompletedClick}
                  onSaveNotesClick={this.props.onSaveNotesClick}
                  key={el.id}
                />
              );
            })}
          </Item.Group>
          {(!activeTasks || activeTasks.length <= 0) && (
            <p>
              {teamMemberName} has no active development tasks. Add one now!
            </p>
          )}
        </div>

        {completedTasks &&
          completedTasks.length > 0 && (
            <div>
              <Divider />
              <Header as="h2">Development Task History</Header>
              <Item.Group divided={true}>
                {completedTasks.map((el: ITeamMemberAction) => {
                  const technique =
                    this.props.techniques.find(x => x.id === el.techniqueId) ||
                    ({} as ITechnique);

                  if (!technique) {
                    return null;
                  }
                  return (
                    <InactiveDevelopmentTask
                      technique={technique}
                      teamMemeberAction={el}
                      key={el.id}
                    />
                  );
                })}
              </Item.Group>
            </div>
          )}
      </div>
    );
  }
}
