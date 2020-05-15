"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = require("xlsx");
const path_1 = require("path");
function ParseFile(path) {
    return xlsx_1.utils.sheet_to_json(xlsx_1.readFile(path).Sheets["Лист1"]);
}
exports.ParseFile = ParseFile;
/**
 * Редактирование олимпиад
 * @param num Номер олимпиады
 * @param data Данные в виде json
 */
function ImportJson2Ods(num, data) {
    let file = xlsx_1.readFile(path_1.join(__dirname, "..", "database", "tests", num + ".ods"));
    file.Sheets["Лист1"] = {};
    xlsx_1.utils.sheet_add_json(file.Sheets["Лист1"], data);
    xlsx_1.writeFile(file, path_1.join(__dirname, "..", "database", "tests", num + ".ods"), { bookType: "ods" });
    return 0;
}
exports.ImportJson2Ods = ImportJson2Ods;
