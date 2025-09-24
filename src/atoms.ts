import { atom } from 'jotai';

export interface Dinosaur {
    Name: string;
    Description: string;
}

const dinosaursAtom = atom<Dinosaur[]>([]);
const randomDinosaur = atom<Dinosaur>()

export { dinosaursAtom, randomDinosaur };