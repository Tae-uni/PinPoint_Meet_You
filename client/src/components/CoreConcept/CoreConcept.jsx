import './CoreConcept.css'

export default function CoreConcept(props) {
  return (
  <li>
    <img src={props.img} alt={props.title}/>
    <h3>{props.title}</h3>
    <p>{props.description}</p>
  </li>
  );
}