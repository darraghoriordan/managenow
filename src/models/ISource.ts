import { ActionSourceType } from "./Enums";
import ITechnique from "./ITechnique";

export default interface ISource {
  name: string;
  referralLink: string;
  author: string;
  type: ActionSourceType;
  techniques: ITechnique[];
}
