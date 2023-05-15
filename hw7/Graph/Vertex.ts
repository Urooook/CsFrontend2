export class Vertex {
    label: string;
    wasVisited: boolean;

    constructor(lab: string) {
        this.label = lab;
        this.wasVisited = false;
    }
}