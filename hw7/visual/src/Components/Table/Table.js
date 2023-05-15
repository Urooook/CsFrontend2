import React, {useRef, useState} from 'react';
import {Form, InputGroup, Table} from "react-bootstrap";
import {Insert} from "../Buttons/Insert";

const TableMatrix = React.memo(({ matrix, size, change }) => {
    const [isActive, setActive] = useState({
        x: null,
        y: null
    });
    const [curVal, setCurVal] = useState(null);
    const ref = useRef(null);
    const handler = (e) => {
        if(e.code === 'Enter') {
            change(isActive.x, isActive.y, curVal);
            setCurVal(null);
            setActive({
                x: null,
                    y: null
            })
        }
    }

    function getMatrixData() {
        function* getData() {
            let res = []
            const m = [...matrix];
            for(let i =0; i< m.length; i++){
                res.push(m[i])
                if((i+1 )% size === 0) {
                    yield res;
                    res = [];
                }

            }
        }

        const iter = getData();
        const results = [];

        while(true){
            const {done, value} = iter.next();
            if(done) {
                break;
            } else {
                results.push(value);
            }
        }
        console.log(results)
        return results
    }

    return (
        <div>
            <Table responsive striped="columns">
                {/*<thead>*/}
                {/*<tr>*/}
                {/*    <th>#</th>*/}
                {/*    <th>First Name</th>*/}
                {/*    <th>Last Name</th>*/}
                {/*    <th>Username</th>*/}
                {/*</tr>*/}
                {/*</thead>*/}
                <tbody>
                {
                    getMatrixData().map((data) => {
                        return (
                            <tr>{
                                data.map(([{x, y}, val]) => (
                                    <td onDoubleClick={() => {
                                        setActive({x, y});
                                        setCurVal(val);
                                        ref?.current?.focus();
                                    }}>{
                                        (isActive.x === x && isActive.y === y)
                                        ? (
                                                    <Form.Control
                                                        ref={ref}
                                                        aria-label="y"
                                                        aria-describedby="inputGroup-sizing-sm"
                                                        value={curVal}
                                                        onChange={(e) => {
                                                            if((Number(e.target.value) === 0 || Number(e.target.value) === 1)) {
                                                                setCurVal(Number(e.target.value))
                                                            }
                                                        }}
                                                        onKeyDown={handler}
                                                        style={{ maxWidth: 40, margin: 'auto', }}
                                                    />
                                            )
                                            : val
                                    }</td>
                                ))
                            }</tr>
                        )
                    })
                }
                </tbody>
            </Table>
            {/*<Insert />*/}
        </div>
    );
})

export { TableMatrix };