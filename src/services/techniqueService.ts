import constants from "../constants/constants";
import { TechniqueSourceType } from "../models/Enums";
import ITechnique from "../models/ITechnique";

export function getRelevantTechniques(behaviourKey: string): ITechnique[] {
  return getTechniques().filter(element => findCategory(element, behaviourKey));
}
export function getTechniques() {
  const sampleTechniques = new Array<ITechnique>();
  sampleTechniques.push({
    author: "Jurgen Appelo",

    category: constants.TECHNIQUE_CATEGORY.BuildingProducts,
    coverimage: "/images/covers/management30.jpg",
    description:
      "Discuss the identifiable results of innovation in our organisation. If we cant identify any then why not?",
    id: "1",
    locationInSource: "Chapter 4. The Information-Innovation System",
    name: "Discuss Identifiable Innovation",
    rating: 8,
    referralLink:
      "https://www.amazon.com/Management-3-0-Developers-Developing-Addison-Wesley/dp/0321712471/ref=sr_1_2?ie=UTF8&qid=1524119998&sr=8-2&keywords=management+3.0",

    sourcename: "Management 3.0",
    type: TechniqueSourceType.book
  });

  sampleTechniques.push({
    author: "Michael D. Watkins",

    category: constants.TECHNIQUE_CATEGORY.Decisons,
    coverimage: "/images/covers/thefirst90days.jpg",
    description:
      "There a few different ways to make decisions depending on the maturity of the team. Picking the right model can change he outcome.",
    id: "2",
    locationInSource: "Chapter 7. Build your team",
    name: "How to make decisions",
    rating: 5,
    referralLink:
      "https://www.amazon.com/First-Days-Updated-Expanded-Strategies-ebook/dp/B00B6U63ZE/ref=sr_1_4?s=books&ie=UTF8&qid=1524128886&sr=1-4&keywords=first+90+days",

    sourcename: "The First 90 Days",
    type: TechniqueSourceType.book
  });
  sampleTechniques.push({
    author: "Get Lighthouse",
    category: constants.TECHNIQUE_CATEGORY.BuildingRapportandInfluence,
    coverimage: "",
    description: "How to start one on ones with your team",
    id: "3",
    locationInSource: "",
    name: "",
    rating: 6,
    referralLink:
      "https://getlighthouse.com/blog/how-to-start-one-on-ones-your-teams/",
    sourcename: "Starting one-on-ones",
    type: TechniqueSourceType.blog
  });

  return sampleTechniques;
}
function findCategory(technique: ITechnique, behaviourKey: string) {
  return technique.category === constants.TECHNIQUE_CATEGORY[behaviourKey];
}
