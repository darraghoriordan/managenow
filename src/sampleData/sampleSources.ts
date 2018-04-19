import { ActionSourceType } from "../models/Enums";
import ISource from "../models/ISource";

const sampleSources = new Array<ISource>();
sampleSources.push({
  author: "Jurgen Appelo",
  name: "Management 3.0",
  referralLink:
    "https://www.amazon.com/Management-3-0-Developers-Developing-Addison-Wesley/dp/0321712471/ref=sr_1_2?ie=UTF8&qid=1524119998&sr=8-2&keywords=management+3.0",
  techniques: [
    {
      description:
        "Discuss the identifiable results of innovation in our organisation. If we cant identify any then why not?",
      locationInSource: "Chapter 4. The Information-Innovation System",
      name: "Discuss Identifiable Innovation"
    }
  ],
  type: ActionSourceType.book
});

sampleSources.push({
  author: "Michael D. Watkins",
  name: "The First 90 Days",
  referralLink:
    "https://www.amazon.com/First-Days-Updated-Expanded-Strategies-ebook/dp/B00B6U63ZE/ref=sr_1_4?s=books&ie=UTF8&qid=1524128886&sr=1-4&keywords=first+90+days",
  techniques: [
    {
      description:
        "There a few different ways to make decisions depending on the maturity of the team. Picking the right model can change he outcome.",
      locationInSource: "Chapter 7. Build your team",
      name: "How to make decisions"
    }
  ],
  type: ActionSourceType.book
});
sampleSources.push({
  author: "Get Lighthouse",
  name: "Starting one-on-ones",
  referralLink:
    "https://getlighthouse.com/blog/how-to-start-one-on-ones-your-teams/",
  techniques: [
    {
      description: "How to start one on ones with your team",
      locationInSource: "",
      name: ""
    }
  ],
  type: ActionSourceType.blog
});
export default sampleSources;
