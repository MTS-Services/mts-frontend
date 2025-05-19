import OrderPageScreenshot from "./OrderPageScreenshot";
import ProjectsDetail from "./ProjectsDetail";

const ProjectsDetails = () => {
  return (
    <div className="m-auto w-[1440px] overflow-hidden px-2.5 md:px-4 lg:px-6">
      <ProjectsDetail></ProjectsDetail>
      <OrderPageScreenshot></OrderPageScreenshot>
    </div>
  );
};

export default ProjectsDetails;
