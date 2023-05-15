import {Graph} from "./dist/hw7/Graph";

const graph = new Graph(5);

const getMatrix = () => {
    const size = graph.MatrixLineSize;
    const matrixBlock = document.querySelector('.matrix');

    const table = document.createElement('table');
    table.classList.add('table');
    table.style.maxHeight = '500px';
    table.style.width = '500px';

    const tBody = document.createElement('tBody');
    table.appendChild(tBody);

    for(let i = 0; i< size; i++) {
        const tr = document.createElement('tr');

        for(let j = 0; j < size; j++) {
            const td = document.createElement('td');
            td.innerHTML = graph.matrix.get({x:i, y: j});
            tr.appendChild(td);
        }

        tBody.appendChild(tr);
    }

    matrixBlock.appendChild(table);
}

getMatrix();