import BestContributor from "../../components/BestContributor/BestContributor"
import PunctualityAwards from "../../components/PunctualityAwards/PunctualityAwards"
import RisingTalent from "../../components/RisingTalent/RisingTalent"

function BestContributors  ()  {
  return (
   <div>
     <div className="bg-background">
      <BestContributor></BestContributor>
    </div>

     <div className="bg-secondary">
      <RisingTalent></RisingTalent>
    </div>

     <div className="bg-background">
      <PunctualityAwards></PunctualityAwards>
     </div>

   </div>
  )
}

export default BestContributors
