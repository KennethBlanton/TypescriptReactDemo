export interface TodoModel {
    id: string;
    text: string;
}

export interface TodoCardInterface {
    id: number, 
    title: string,
    desc: string,
    time: number,
    priority: number,
    column: number,
    index: number,
}