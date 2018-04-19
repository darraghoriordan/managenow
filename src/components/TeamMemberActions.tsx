import * as React from "react";
import { TeamMemberActionStatus } from "../models/Enums";
import ITeamMemberAction from "../models/ITeamMemberAction";
import "./TeamMemberNotes.css";

export interface ITeamMemberActionsProps {
  teamMemberActions: ITeamMemberAction[];
}

export default class TeamMemberActions extends React.PureComponent<
  ITeamMemberActionsProps,
  any
> {
  constructor(props: ITeamMemberActionsProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <p>Todo For</p>
        {this.props.teamMemberActions
          .sort((note1, note2) => +note2.dateAdded - +note1.dateAdded)
          .map((x: ITeamMemberAction) => (
            <p
              className={
                x.status === TeamMemberActionStatus.active
                  ? "note-positive"
                  : "note-negative"
              }
            >
              {x.dateAdded + " - " + x.description}
            </p>
          ))}
      </div>
    );
  }
}
