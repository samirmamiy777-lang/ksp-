"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicianModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const musician_entity_1 = require("./musician.entity");
const musician_service_1 = require("./musician.service");
const musician_controller_1 = require("./musician.controller");
let MusicianModule = class MusicianModule {
};
exports.MusicianModule = MusicianModule;
exports.MusicianModule = MusicianModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([musician_entity_1.Musician])],
        providers: [musician_service_1.MusicianService],
        controllers: [musician_controller_1.MusicianController],
        exports: [musician_service_1.MusicianService],
    })
], MusicianModule);
//# sourceMappingURL=musician.module.js.map