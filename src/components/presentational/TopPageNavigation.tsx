import * as H from "history";
import * as React from "react";
import { Button, ButtonProps, Icon } from "semantic-ui-react";

interface ITopNavigationProps {
  history: H.History;
}

export const TopPageNavigation = (props: ITopNavigationProps) => (
  <Button
    type="button"
    primary={true}
    style={{ marginBottom: "1em" }}
    // tslint:disable-next-line:jsx-no-lambda
    onClick={(e: any, data: ButtonProps) => {
      props.history.goBack();
    }}
  >
    <Icon className="chevron left" />
    Back
  </Button>
);


export default TopPageNavigation;