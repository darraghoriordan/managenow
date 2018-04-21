import { ActionSourceType } from "./Enums";
export default interface IActionTechniqueSource {
  id: string;
  name: string;
  referralLink: string;
  author: string;
  type: ActionSourceType;
}
