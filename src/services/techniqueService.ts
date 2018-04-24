import constants from "../constants/constants";
import ITechnique from "../models/ITechnique";
import sampleSources from "../sampleData/sampleSources";



export const getRelevantTechniques=(behaviourKey: string): ITechnique[] => {
    // get the techniques for the behaviour
    // sort them by effectiveness
    // populate field if used before for this team member
    const techniques: ITechnique[] = [];

    sampleSources.forEach(element => {
      element.techniques.forEach(el => {
        if (el.category === constants.TECHNIQUE_CATEGORY[behaviourKey]) {
          techniques.push(el);
        }
      });
    });
    return techniques;
}