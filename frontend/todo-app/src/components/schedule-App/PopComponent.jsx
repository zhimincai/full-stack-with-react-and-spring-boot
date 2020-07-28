import React, {useState} from 'react';
// import { Button, Collapse, CardBody, Card } from 'reactstrap';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

function PopComponent(props) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  const comp_id = "Popover" + props.id;
  const body_func = () => {
                              if(props.body_func){
                                  return props.body_func(...props.inputs)
                              }
                          }
  return (
    <div>
      <Button id={comp_id} type="button" color={props.color}>
        +
      </Button>
      <UncontrolledPopover trigger="legacy" placement="bottom" isOpen={popoverOpen} target={comp_id} toggle={toggle}>
        <PopoverHeader>{props.title}</PopoverHeader>
        <PopoverBody>{props.body} {popoverOpen && body_func()}</PopoverBody>
      </UncontrolledPopover>
    </div>
  );
}

export default PopComponent