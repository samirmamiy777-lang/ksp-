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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicianController = void 0;
const common_1 = require("@nestjs/common");
const musician_service_1 = require("./musician.service");
const musician_dto_1 = require("./musician.dto");
let MusicianController = class MusicianController {
    constructor(service) {
        this.service = service;
    }
    findAll() { return this.service.findAll(); }
    findOne(id) { return this.service.findOne(+id); }
    create(dto) { return this.service.create(dto); }
    update(id, dto) {
        return this.service.update(+id, dto);
    }
    remove(id) { return this.service.remove(+id); }
};
exports.MusicianController = MusicianController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MusicianController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MusicianController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [musician_dto_1.CreateMusicianDto]),
    __metadata("design:returntype", void 0)
], MusicianController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, musician_dto_1.UpdateMusicianDto]),
    __metadata("design:returntype", void 0)
], MusicianController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MusicianController.prototype, "remove", null);
exports.MusicianController = MusicianController = __decorate([
    (0, common_1.Controller)('musicians'),
    __metadata("design:paramtypes", [musician_service_1.MusicianService])
], MusicianController);
//# sourceMappingURL=musician.controller.js.map