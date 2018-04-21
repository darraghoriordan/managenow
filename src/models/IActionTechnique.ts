import IActionTechniqueSource from "./IActionTechniqueSource";
export default interface IActionTechnique {
  id: string;
  name: string;
  description: string;
  sourceDetails: IActionTechniqueSource;
  locationInSource: string;
}
