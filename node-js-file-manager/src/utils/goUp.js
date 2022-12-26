import { resolve } from "path";
import { showCurrentDirectory } from "./showCurrentDirectory.js";
export const goUp = () => {
    process.chdir(resolve(process.cwd(), '..'))
    showCurrentDirectory()
}