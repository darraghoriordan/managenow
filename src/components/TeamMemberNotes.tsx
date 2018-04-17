import * as React from "react";
import { TeamMemberNoteSentiment } from "../models/Enums";
import ITeamMemberNote from "../models/ITeamMemberNote";
import "./TeamMemberNotes.css";
export interface ITeamMemberNotesProps {
  teamMemberNotes: ITeamMemberNote[];
}
export default class TeamMemberNotes extends React.PureComponent<
  ITeamMemberNotesProps,
  any
> {
  constructor(props: ITeamMemberNotesProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <p>Notes</p>
        {this.props.teamMemberNotes
          .sort((note1, note2) => +note2.dateAdded - +note1.dateAdded)
          .map((x: ITeamMemberNote) => (
            <p
              className={
                x.sentiment === TeamMemberNoteSentiment.positive
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
