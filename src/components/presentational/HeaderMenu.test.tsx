import * as React from "react";
import { MemoryRouter } from "react-router";
import * as renderer from "react-test-renderer";
import HeaderMenu from "./HeaderMenu";

it("renders correctly for non-authenticated user", () => {
  const component = renderer.create(
    <MemoryRouter initialEntries={["/"]}>
      <HeaderMenu
        authenticated={false}
        // tslint:disable-next-line:jsx-no-lambda
        onSignOut={() => true}
      />
    </MemoryRouter>
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders correctly for authenticated user", () => {
  const component = renderer.create(
    <MemoryRouter initialEntries={["/"]}>
      <HeaderMenu
        authenticated={true}
        displayName="darragh"
        // tslint:disable-next-line:jsx-no-lambda
        onSignOut={() => true}
      />
    </MemoryRouter>
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
