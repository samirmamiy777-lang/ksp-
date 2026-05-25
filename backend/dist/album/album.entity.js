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
exports.Album = void 0;
const typeorm_1 = require("typeorm");
const musician_entity_1 = require("../musician/musician.entity");
const track_entity_1 = require("../track/track.entity");
let Album = class Album {
};
exports.Album = Album;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Album.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Album.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Album.prototype, "release_year", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => musician_entity_1.Musician, (m) => m.albums, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'musician_id' }),
    __metadata("design:type", musician_entity_1.Musician)
], Album.prototype, "musician", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Album.prototype, "musician_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => track_entity_1.Track, (t) => t.album),
    __metadata("design:type", Array)
], Album.prototype, "tracks", void 0);
exports.Album = Album = __decorate([
    (0, typeorm_1.Entity)('album')
], Album);
//# sourceMappingURL=album.entity.js.map