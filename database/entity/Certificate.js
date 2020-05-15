"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("./User"));
const OlympInfo_1 = __importDefault(require("./OlympInfo"));
let Certificate = class Certificate extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Certificate.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne((type) => User_1.default),
    typeorm_1.JoinColumn(),
    __metadata("design:type", User_1.default)
], Certificate.prototype, "uid", void 0);
__decorate([
    typeorm_1.OneToOne((type) => OlympInfo_1.default),
    typeorm_1.JoinColumn(),
    __metadata("design:type", OlympInfo_1.default)
], Certificate.prototype, "oid", void 0);
Certificate = __decorate([
    typeorm_1.Entity()
], Certificate);
exports.default = Certificate;
