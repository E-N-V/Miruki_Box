import {utils, readFile} from "xlsx"

export function ParseFile(path: string){
    return utils.sheet_to_json(readFile(path).Sheets["Лист1"])
}