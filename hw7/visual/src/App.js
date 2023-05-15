import logo from './logo.svg';
import './App.css';
import {Graph} from "./dist/hw7/Graph";
import {TableMatrix} from "./Components/Table/Table";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const graph = new Graph(10);
  // console.log(...graph.matrix)
  //   graph.addEge(0,0)
  return (
    <div className="App" style={{ width: 700, height: 400 }}>
      <TableMatrix matrix={graph.matrix} size={graph.MatrixLineSize} change={(x, y, v) => graph.addEge(x, y, v)}/>
    </div>
  );
}

export default App;
