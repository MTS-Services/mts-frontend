import BestContributor from "../../components/BestContributor/BestContributor"
import BestMentor from "../../components/BestContributor/BestMentor/BestMentor"
import PunctualityAwards from "../../components/PunctualityAwards/PunctualityAwards"
import RisingTalent from "../../components/PunctualityAwards/RisingTalent/RisingTalent"
import TopPerformer from "../../components/PunctualityAwards/topperformer/TopPerformer"

function BestContributors  ()  {
  return (
   <div className="">
     <div className="bg-background border-b-1 border-accent/30 border-dashed ">
      <BestContributor></BestContributor>
    </div>
     <div className="bg-background border-b-1 border-accent/30 border-dashed ">
      <BestMentor></BestMentor>
    </div>

     <div className="bg-background border-b-1 border-accent/30 border-dashed ">
    <TopPerformer></TopPerformer>
    </div>
     <div className="bg-background border-b-1 border-accent/30 border-dashed ">
      <RisingTalent></RisingTalent>
    </div>

     <div className="bg-background border-b-1 border-accent/30 ">
      <PunctualityAwards></PunctualityAwards>
     </div>

   </div>
  )
}

export default BestContributors
