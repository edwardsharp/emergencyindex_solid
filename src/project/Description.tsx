import IProject from "./project.d";

interface Props {
  project: IProject;
}

function Description(props: Props) {
  return <div innerHTML={props.project.content}></div>;
}

export default Description;
