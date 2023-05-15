import React, {useState} from 'react';
import {InputGroup, Form} from "react-bootstrap";

const Insert = ({graph}) => {
    const [coords, setCoords] = useState({
        x: -1,
        y: -1
    });
    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: 150 }}>

               <div style={{width: 150, display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}} >
                   <InputGroup size="sm" className="mb-3" style={{ width: 60 }}>
                   <InputGroup.Text id="inputGroup-sizing-sm">x</InputGroup.Text>
                   <Form.Control
                       aria-label="x"
                       aria-describedby="inputGroup-sizing-sm"
                   />
                   </InputGroup>
                   <InputGroup size="sm" className="mb-3" style={{ width: 60 }}>
                       <InputGroup.Text id="inputGroup-sizing-sm">y</InputGroup.Text>
                       <Form.Control
                           aria-label="y"
                           aria-describedby="inputGroup-sizing-sm"
                       />
                   </InputGroup>
               </div>
            <button style={{width: 150}} className='btn btn-primary'>Вставить</button>
        </div>
    );
};

export  {Insert};