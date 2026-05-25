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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Musician = void 0;
const typeorm_1 = require("typeorm");
const genre_entity_1 = require("../genre/genre.entity");
const album_entity_1 = require("../album/album.entity");
let Musician = class Musician {
};
exports.Musician = Musician;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Musician.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Musician.prototype, "full_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Musician.prototype, "birth_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Musician.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Musician.prototype, "biography", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => genre_entity_1.Genre, (genre) => genre.musicians, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'genre_id' }),
    __metadata("design:type", genre_entity_1.Genre)
], Musician.prototype, "genre", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Musician.prototype, "genre_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => album_entity_1.Album, (album) => album.musician),
    __metadata("design:type", Array)
], Musician.prototype, "albums", void 0);
exports.Musician = Musician = __decorate([
    (0, typeorm_1.Entity)('musician')
], Musician);
//# sourceMappingURL=musician.entity.js.map