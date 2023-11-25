"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notRowsAffected = exports.notFoundUser = void 0;
const common_1 = require("@nestjs/common");
function notFoundUser(user) {
    if (user) {
        throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.notFoundUser = notFoundUser;
function notRowsAffected(result) {
    if (result == 0) {
        throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.notRowsAffected = notRowsAffected;
//# sourceMappingURL=common.js.map