import * as React from "react";
import ITeamMember from "../models/ITeamMember";

export interface ITeamStatisticsProps {
  teamMembers: ITeamMember[];
}
export default class TeamStatistics extends React.PureComponent<ITeamStatisticsProps, any> {
  constructor(props: ITeamStatisticsProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <p>Some team  overview</p>
      </div>
    );
  }
}
