import IProject from "./project.d";

interface Props {
  project: IProject;
}

function Tags(props: Props) {
  return <>{props.project.tags?.join(", ")}</>;
}

export default Tags;
