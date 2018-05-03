import * as React from "react";
import {
  Container,
  Divider,
  List,
  Segment
} from "semantic-ui-react";

const AppFooter = () => <Segment
vertical={true}
style={{ margin: "5em 0em 0em"}}
>
<Container textAlign="center">
  <Divider section={true} />
  <List horizontal={true} divided={true} link={true}>
    <List.Item as="a" href="#">
      Site Map
    </List.Item>
    <List.Item as="a" href="#">
      Contact Us
    </List.Item>
    <List.Item as="a" href="#">
      Terms and Conditions
    </List.Item>
    <List.Item as="a" href="#">
      Privacy Policy
    </List.Item>
  </List>
</Container>
</Segment>

export default AppFooter;