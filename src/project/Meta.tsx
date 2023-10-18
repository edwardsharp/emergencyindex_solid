import IProject from "./project.d";

interface Props {
  project: IProject;
}

function Meta(props: Props) {
  return <>{props.project.title}</>;
}

export default Meta;
