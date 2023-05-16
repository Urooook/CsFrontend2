import logo from './logo.svg';
import './App.css';
import {Graph} from "./dist/hw7/Graph";
import {TableMatrix} from "./Components/Table/Table";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const graph = new Graph(5);
  // console.log(...graph.matrix)
  //   console.log(graph.defaultValues)
    graph.addEge(0,1)
    graph.addEge(0,3)
    graph.addEge(4,3)
    graph.addEge(1,4)

  return (
    <div className="App">
      <TableMatrix matrix={graph.matrix} size={graph.MatrixLineSize} change={(x, y, v) => graph.addEge(x, y, v)} defaultValues={graph.defaultValues}/>
    </div>
  );
}

export default App;
