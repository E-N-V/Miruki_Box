import { utils, readFile, writeFile } from "xlsx";
import { join } from "path";

export function ParseFile(path: string) {
	return utils.sheet_to_json(readFile(path).Sheets["Лист1"]);
}

/**
 * Редактирование олимпиад
 * @param num Номер олимпиады
 * @param data Данные в виде json
 */
export function ImportJson2Ods(num: number, data: any[]) {
	let file = readFile(join(__dirname, "..", "database", "tests", num + ".ods"));
	file.Sheets["Лист1"] = {};
	utils.sheet_add_json(file.Sheets["Лист1"], data);
    writeFile(file, join(__dirname, "..", "database", "tests", num + ".ods"), { bookType: "ods" });
    return 0
}
