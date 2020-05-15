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
let Admin = class Admin {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Admin.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne((type) => User_1.default),
    typeorm_1.JoinColumn(),
    __metadata("design:type", User_1.default)
], Admin.prototype, "id_usr", void 0);
Admin = __decorate([
    typeorm_1.Entity()
], Admin);
exports.Admin = Admin;
let Moderator = class Moderator {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Moderator.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne((type) => User_1.default),
    typeorm_1.JoinColumn(),
    __metadata("design:type", User_1.default)
], Moderator.prototype, "id_usr", void 0);
Moderator = __decorate([
    typeorm_1.Entity()
], Moderator);
exports.Moderator = Moderator;
let Student = class Student {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Student.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne((type) => User_1.default),
    typeorm_1.JoinColumn(),
    __metadata("design:type", User_1.default)
], Student.prototype, "id_usr", void 0);
Student = __decorate([
    typeorm_1.Entity()
], Student);
exports.Student = Student;
let Student_op = class Student_op {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Student_op.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne((type) => User_1.default),
    typeorm_1.JoinColumn(),
    __metadata("design:type", User_1.default)
], Student_op.prototype, "id_usr", void 0);
Student_op = __decorate([
    typeorm_1.Entity()
], Student_op);
exports.Student_op = Student_op;
let Prepod = class Prepod {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Prepod.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne((type) => User_1.default),
    typeorm_1.JoinColumn(),
    __metadata("design:type", User_1.default)
], Prepod.prototype, "id_usr", void 0);
Prepod = __decorate([
    typeorm_1.Entity()
], Prepod);
exports.Prepod = Prepod;
let Founder = class Founder {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Founder.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        length: 100,
        type: "varchar"
    }),
    __metadata("design:type", String)
], Founder.prototype, "email", void 0);
__decorate([
    typeorm_1.OneToOne((type) => User_1.default),
    typeorm_1.JoinColumn(),
    __metadata("design:type", User_1.default)
], Founder.prototype, "user", void 0);
Founder = __decorate([
    typeorm_1.Entity()
], Founder);
exports.Founder = Founder;
