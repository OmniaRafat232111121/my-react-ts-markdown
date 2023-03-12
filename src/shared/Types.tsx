export type NoteData={
    title:string;
    markdown:string;
    tags:tag[]
}
export type Tag={
    id:string;
    label:string;
}
export type Note={
    id:string;
} &NoteData