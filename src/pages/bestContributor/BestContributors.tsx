import BestContributor from "../../components/BestContributor/BestContributor"
import PunctualityAwards from "../../components/PunctualityAwards/PunctualityAwards"
import RisingTalent from "../../components/RisingTalent/RisingTalent"

function BestContributors  ()  {
  return (
   <div className="">
     <div className="bg-background border-b-1 border-accent/30 border-dashed ">
      <BestContributor></BestContributor>
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
