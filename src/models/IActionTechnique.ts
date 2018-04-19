import IActionTechniqueSource from "./IActionTechniqueSource";
export default interface IActionTechnique {
  name: string;
  description: string;
  sourceDetails: IActionTechniqueSource;
  locationInSource: string;
}
