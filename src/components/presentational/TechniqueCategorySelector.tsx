import * as React from "react";
import { Dropdown } from "semantic-ui-react";
import constants from "../../constants/constants";

interface IDropdownOption {
  key: string;
  value: string;
  text: string;
}

interface ITechniqueCategorySelectorProps {
    placeholderText: string;
  onSelectChanged: (event: any, data: any) => void;
}

export class TechniqueCategorySelector extends React.PureComponent<
  ITechniqueCategorySelectorProps,
  any
> {
  constructor(props: ITechniqueCategorySelectorProps) {
    super(props);
  }
  public getCategoriesAsDropDownModels(
    categories: string[]
  ): IDropdownOption[] {
    return categories.map(objKey => {
      const val = constants.TECHNIQUE_CATEGORY[objKey];
      return {
        key: objKey,
        text: val,
        value: objKey
      };
    });
  }

  public render() {
    return (
      <Dropdown
        placeholder={this.props.placeholderText}
        fluid={true}
        search={true}
        selection={true}
        options={this.getCategoriesAsDropDownModels(
          Object.keys(constants.TECHNIQUE_CATEGORY)
        )}
        onChange={this.props.onSelectChanged}
      />
    );
  }
}

export default TechniqueCategorySelector;
