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
exports.MusicianService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const musician_entity_1 = require("./musician.entity");
let MusicianService = class MusicianService {
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.find({ relations: ['genre', 'albums'], order: { full_name: 'ASC' } });
    }
    async findOne(id) {
        const m = await this.repo.findOne({ where: { id }, relations: ['genre', 'albums'] });
        if (!m)
            throw new common_1.NotFoundException(`Музыкант #${id} не найден`);
        return m;
    }
    create(dto) {
        return this.repo.save(this.repo.create(dto));
    }
    async update(id, dto) {
        await this.findOne(id);
        await this.repo.update(id, dto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.findOne(id);
        await this.repo.delete(id);
    }
};
exports.MusicianService = MusicianService;
exports.MusicianService = MusicianService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(musician_entity_1.Musician)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MusicianService);
//# sourceMappingURL=musician.service.js.map