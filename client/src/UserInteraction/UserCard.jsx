import { useEffect } from "react";
import Button from 'react-bootstrap/Button';

function UserCard(props) {
  //console.log(props);
  let name = props.user.name;

  if (name.length > 10) {
    name = name.substring(0, 10) + "...";
  }

  let name2 = props.name2;

  if (name2.length > 10) {
    name2 = name2.substring(0, 10) + "...";
  }
  
  useEffect(() => {
    return () => {
      console.log("Componnet Is UnMounting", props.user.name);
    };
  }, []);

  const handleOnClick = () => {
    console.log("Clicked On", name);
    props.onShowMore();
  };
  return (
    <>
    <div
      className={`product-card ${props.user.id % 2 === 0 ? "bg-tomato" : "bg-dodgerblue"
        }`}
    >
      <img src={props.image} alt="" />
      <h3 title={props.name}>{name}</h3>
      <div className="actions">
        <Button variant="outline-success" onClick={handleOnClick}>Show More</Button>
        <Button variant="outline-success"  onClick={props.onDelete}>Remove</Button>
      </div>
      
    </div>

    <div
      className={`product-card ${props.user.id % 2 === 0 ? "bg-tomato" : "bg-dodgerblue"
        }`}
    >
      <img src={props.image2} alt="" />
      <h3 title={props.name2}>{name2}</h3>
      <div className="actions">
        {/* <Button variant="outline-success" onClick={handleOnClick}>Show More</Button> */}
        <Button variant="outline-success"  onClick={props.onDelete}>Remove</Button>
      </div>
      
    </div>
    </>
  );
}

export default UserCard;