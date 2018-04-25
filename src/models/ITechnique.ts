import { TechniqueSourceType } from "./Enums";

export default interface ITechnique {
  id: string;
  name: string;
  description: string;
  sourcename: string;
  referralLink: string;
  author: string;
  type: TechniqueSourceType;
  category:string;
  locationInSource: string;
}
