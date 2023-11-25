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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const enums_1 = require("@nestjs/common/enums");
const exceptions_1 = require("@nestjs/common/exceptions");
const update_user_dto_1 = require("./dto/update-user.dto");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUser(idOrEmail, byId = false) {
        try {
            let user;
            if (byId) {
                const id = parseInt(idOrEmail, 10);
                if (isNaN(id)) {
                    throw new exceptions_1.HttpException('Invalid ID format', enums_1.HttpStatus.BAD_REQUEST);
                }
                user = await this.userService.getUserById(id);
            }
            else {
                const lowercaseEmail = idOrEmail.toLowerCase();
                user = await this.userService.getUserByEmail(lowercaseEmail);
            }
            if (!user) {
                throw new exceptions_1.HttpException('User not found', enums_1.HttpStatus.NOT_FOUND);
            }
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    getUsers() {
        return this.userService.getUsers();
    }
    createUser(newUser) {
        return this.userService.createUser(newUser);
    }
    async deleteUser(idOrEmail, byId = false) {
        try {
            let user;
            if (byId) {
                const id = parseInt(idOrEmail, 10);
                if (isNaN(id)) {
                    throw new exceptions_1.HttpException('Invalid ID format', enums_1.HttpStatus.BAD_REQUEST);
                }
                if (this.userService.getUserById(user.id)) {
                    return await this.userService.deleteUserById(id);
                }
            }
            else {
                const lowercaseEmail = idOrEmail.toLowerCase();
                const user = await this.userService.getUserByEmail(lowercaseEmail);
                if (user === null) {
                    throw new exceptions_1.HttpException('User Not Found', enums_1.HttpStatus.BAD_REQUEST);
                }
                return await this.userService.deleteUserById(user.id);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async updateUser(idOrEmail, user, byId = false) {
        try {
            if (byId) {
                const id = parseInt(idOrEmail, 10);
                if (isNaN(id)) {
                    throw new exceptions_1.HttpException('Invalid ID format', enums_1.HttpStatus.BAD_REQUEST);
                }
                if (this.userService.getUserById(id)) {
                    return await this.userService.updateUser(id, user);
                }
            }
            else {
                const lowercaseEmail = idOrEmail.toLowerCase();
                const user_pivot = await this.userService.getUserByEmail(lowercaseEmail);
                if (!user_pivot) {
                    throw new exceptions_1.NotFoundException('User Not Found: The specified email does not exist.');
                }
                return await this.userService.updateUser(user_pivot.id, user);
            }
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(':idOrEmail'),
    __param(0, (0, common_1.Param)('idOrEmail')),
    __param(1, (0, common_1.Query)('byId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Delete)(':idOrEmail'),
    __param(0, (0, common_1.Param)('idOrEmail')),
    __param(1, (0, common_1.Query)('byId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Patch)(':idOrEmail'),
    __param(0, (0, common_1.Param)('idOrEmail')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('byId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Boolean]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map