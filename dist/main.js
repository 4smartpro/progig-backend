/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(2);
const common_2 = __webpack_require__(5);
const user_module_1 = __webpack_require__(40);
const auth_module_1 = __webpack_require__(51);
const gig_module_1 = __webpack_require__(62);
const config_1 = __webpack_require__(7);
const connection_module_1 = __webpack_require__(73);
const Joi = __webpack_require__(77);
const chat_module_1 = __webpack_require__(78);
const contract_module_1 = __webpack_require__(85);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    MYSQL_DATABASE_URL: Joi.string().required(),
                    PORT: Joi.number().required(),
                    JWT_SECRET: Joi.string().required(),
                    JWT_EXPIRES_IN: Joi.number().required(),
                    AZURE_CONNECTION_STRING: Joi.string().required(),
                    COMMUNICATION_SERVICES_CONNECTION_STRING: Joi.string().required(),
                }),
                envFilePath: process.env.NODE_ENV === 'production'
                    ? '.env.production'
                    : '.env.development',
            }),
            common_2.DatabaseModule,
            common_2.GraphQLModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            gig_module_1.GigModule,
            connection_module_1.ConnectionModule,
            chat_module_1.ChatModule,
            contract_module_1.ContractModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(6), exports);
__exportStar(__webpack_require__(10), exports);
__exportStar(__webpack_require__(13), exports);
__exportStar(__webpack_require__(28), exports);
__exportStar(__webpack_require__(31), exports);
__exportStar(__webpack_require__(32), exports);
__exportStar(__webpack_require__(34), exports);
__exportStar(__webpack_require__(37), exports);
__exportStar(__webpack_require__(38), exports);


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(7);
const typeorm_1 = __webpack_require__(8);
const migration_1 = __webpack_require__(9);
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => {
                    return {
                        type: 'mysql',
                        url: configService.get('MYSQL_DATABASE_URL'),
                        logging: false,
                        synchronize: true,
                        migrations: (0, migration_1.default)(),
                        autoLoadEntities: true,
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function getMigragions() {
    return [];
}
exports["default"] = getMigragions;


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractEntity = void 0;
const graphql_1 = __webpack_require__(11);
const typeorm_1 = __webpack_require__(12);
let AbstractEntity = class AbstractEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AbstractEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], AbstractEntity.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], AbstractEntity.prototype, "updatedAt", void 0);
AbstractEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], AbstractEntity);
exports.AbstractEntity = AbstractEntity;


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(14), exports);
__exportStar(__webpack_require__(19), exports);
__exportStar(__webpack_require__(20), exports);
__exportStar(__webpack_require__(16), exports);
__exportStar(__webpack_require__(21), exports);
__exportStar(__webpack_require__(22), exports);
__exportStar(__webpack_require__(23), exports);
__exportStar(__webpack_require__(24), exports);
__exportStar(__webpack_require__(26), exports);
__exportStar(__webpack_require__(25), exports);
__exportStar(__webpack_require__(18), exports);
__exportStar(__webpack_require__(17), exports);
__exportStar(__webpack_require__(27), exports);


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = exports.UserRole = void 0;
const typeorm_1 = __webpack_require__(12);
const bcrypt = __webpack_require__(15);
const graphql_1 = __webpack_require__(11);
const abstract_entity_1 = __webpack_require__(10);
const gig_entity_1 = __webpack_require__(16);
const saved_gig_entity_1 = __webpack_require__(18);
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["CONTRACTOR"] = "CONTRACTOR";
    UserRole["HELPER"] = "HELPER";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
(0, graphql_1.registerEnumType)(UserRole, { name: 'UserRole' });
let User = class User extends abstract_entity_1.AbstractEntity {
    async insertPassword() {
        if (this.password) {
            this.password = this.hashPassword(this.password);
        }
    }
    hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }
    isPasswordMatched(password) {
        return bcrypt.compareSync(password, this.password);
    }
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "state", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "zipcode", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "company", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)(() => UserRole),
    (0, typeorm_1.Column)({
        default: UserRole.HELPER,
        enum: UserRole,
        type: 'enum',
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailVerified", void 0);
__decorate([
    (0, graphql_1.Field)(() => [gig_entity_1.Gig], { defaultValue: [] }),
    (0, typeorm_1.OneToMany)(() => gig_entity_1.Gig, (p) => p.contractor),
    __metadata("design:type", Array)
], User.prototype, "gigs", void 0);
__decorate([
    (0, graphql_1.Field)(() => [saved_gig_entity_1.SavedGig], { defaultValue: [] }),
    (0, typeorm_1.OneToMany)(() => saved_gig_entity_1.SavedGig, (p) => p.user),
    __metadata("design:type", Array)
], User.prototype, "savedGigs", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "insertPassword", null);
User = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], User);
exports.User = User;


/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Gig = exports.GigStatus = void 0;
const typeorm_1 = __webpack_require__(12);
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(11);
const user_entity_1 = __webpack_require__(14);
const content_entity_1 = __webpack_require__(17);
var GigStatus;
(function (GigStatus) {
    GigStatus["OPEN"] = "OPEN";
    GigStatus["TAKEN"] = "TAKEN";
})(GigStatus = exports.GigStatus || (exports.GigStatus = {}));
(0, graphql_1.registerEnumType)(GigStatus, { name: 'GigStatus' });
let Gig = class Gig extends common_1.AbstractEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Gig.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Gig.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Gig.prototype, "budget", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true, type: 'date' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Gig.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true, type: 'date' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Gig.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ default: 50 }),
    __metadata("design:type", Number)
], Gig.prototype, "maxProposal", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true, defaultValue: 0 }),
    __metadata("design:type", Number)
], Gig.prototype, "noOfProposals", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: GigStatus.OPEN, type: 'enum', enum: GigStatus }),
    __metadata("design:type", String)
], Gig.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Gig.prototype, "requirements", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Gig.prototype, "paymentMethod", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Gig.prototype, "paymentType", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Gig.prototype, "location", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Gig.prototype, "jobType", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Gig.prototype, "image", void 0);
__decorate([
    (0, graphql_1.Field)(() => [content_entity_1.Content], { defaultValue: [] }),
    (0, typeorm_1.ManyToMany)(() => content_entity_1.Content),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Gig.prototype, "images", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Gig.prototype, "contractorId", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (c) => c.gigs),
    (0, typeorm_1.JoinColumn)({ name: 'contractorId' }),
    __metadata("design:type", typeof (_c = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _c : Object)
], Gig.prototype, "contractor", void 0);
__decorate([
    (0, graphql_1.Field)(() => [common_1.Proposal], { defaultValue: [] }),
    (0, typeorm_1.OneToMany)(() => common_1.Proposal, (p) => p.gig),
    __metadata("design:type", Array)
], Gig.prototype, "proposals", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean)
], Gig.prototype, "isSaved", void 0);
Gig = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Gig);
exports.Gig = Gig;


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Content = void 0;
const graphql_1 = __webpack_require__(11);
const typeorm_1 = __webpack_require__(12);
const abstract_entity_1 = __webpack_require__(10);
const user_entity_1 = __webpack_require__(14);
let Content = class Content extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Content.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Content.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], Content.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Content.prototype, "ref", void 0);
Content = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Content);
exports.Content = Content;


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SavedGig = void 0;
const typeorm_1 = __webpack_require__(12);
const abstract_entity_1 = __webpack_require__(10);
const graphql_1 = __webpack_require__(11);
const user_entity_1 = __webpack_require__(14);
const gig_entity_1 = __webpack_require__(16);
let SavedGig = class SavedGig extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SavedGig.prototype, "gigId", void 0);
__decorate([
    (0, graphql_1.Field)(() => gig_entity_1.Gig, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => gig_entity_1.Gig, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'gigId' }),
    __metadata("design:type", typeof (_a = typeof gig_entity_1.Gig !== "undefined" && gig_entity_1.Gig) === "function" ? _a : Object)
], SavedGig.prototype, "gig", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SavedGig.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], SavedGig.prototype, "user", void 0);
SavedGig = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], SavedGig);
exports.SavedGig = SavedGig;


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Helper = void 0;
const typeorm_1 = __webpack_require__(12);
const user_entity_1 = __webpack_require__(14);
const abstract_entity_1 = __webpack_require__(10);
let Helper = class Helper extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Helper.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], Helper.prototype, "user", void 0);
Helper = __decorate([
    (0, typeorm_1.Entity)()
], Helper);
exports.Helper = Helper;


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Contractor = void 0;
const typeorm_1 = __webpack_require__(12);
const user_entity_1 = __webpack_require__(14);
const abstract_entity_1 = __webpack_require__(10);
let Contractor = class Contractor extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contractor.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], Contractor.prototype, "user", void 0);
Contractor = __decorate([
    (0, typeorm_1.Entity)()
], Contractor);
exports.Contractor = Contractor;


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Proposal = exports.ProposalStatus = void 0;
const typeorm_1 = __webpack_require__(12);
const gig_entity_1 = __webpack_require__(16);
const user_entity_1 = __webpack_require__(14);
const abstract_entity_1 = __webpack_require__(10);
const graphql_1 = __webpack_require__(11);
const contract_entity_1 = __webpack_require__(22);
var ProposalStatus;
(function (ProposalStatus) {
    ProposalStatus["PENDING"] = "PENDING";
    ProposalStatus["ACCEPTED"] = "ACCEPTED";
    ProposalStatus["DELETED"] = "DELETED";
    ProposalStatus["REJECTED"] = "REJECTED";
})(ProposalStatus = exports.ProposalStatus || (exports.ProposalStatus = {}));
let Proposal = class Proposal extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Proposal.prototype, "coverLetter", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Proposal.prototype, "gigId", void 0);
__decorate([
    (0, graphql_1.Field)(() => gig_entity_1.Gig, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => gig_entity_1.Gig),
    (0, typeorm_1.JoinColumn)({ name: 'gigId' }),
    __metadata("design:type", typeof (_a = typeof gig_entity_1.Gig !== "undefined" && gig_entity_1.Gig) === "function" ? _a : Object)
], Proposal.prototype, "gig", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Proposal.prototype, "helperId", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'helperId' }),
    __metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], Proposal.prototype, "helper", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({
        enum: ProposalStatus,
        default: ProposalStatus.PENDING,
        type: 'enum',
    }),
    __metadata("design:type", String)
], Proposal.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Proposal.prototype, "contractId", void 0);
__decorate([
    (0, graphql_1.Field)(() => contract_entity_1.Contract, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => contract_entity_1.Contract),
    (0, typeorm_1.JoinColumn)({ name: 'contractId' }),
    __metadata("design:type", typeof (_c = typeof contract_entity_1.Contract !== "undefined" && contract_entity_1.Contract) === "function" ? _c : Object)
], Proposal.prototype, "contract", void 0);
Proposal = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Proposal);
exports.Proposal = Proposal;


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Contract = exports.ContractStatus = void 0;
const typeorm_1 = __webpack_require__(12);
const gig_entity_1 = __webpack_require__(16);
const proposal_entity_1 = __webpack_require__(21);
const user_entity_1 = __webpack_require__(14);
const abstract_entity_1 = __webpack_require__(10);
const graphql_1 = __webpack_require__(11);
var ContractStatus;
(function (ContractStatus) {
    ContractStatus["ACTIVE"] = "ACTIVE";
    ContractStatus["COMPLETED"] = "COMPLETED";
    ContractStatus["CANCELED"] = "CANCELED";
})(ContractStatus = exports.ContractStatus || (exports.ContractStatus = {}));
(0, graphql_1.registerEnumType)(ContractStatus, { name: 'ContractStatus' });
let Contract = class Contract extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contract.prototype, "gigId", void 0);
__decorate([
    (0, graphql_1.Field)(() => gig_entity_1.Gig, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => gig_entity_1.Gig),
    (0, typeorm_1.JoinColumn)({ name: 'gigId' }),
    __metadata("design:type", typeof (_a = typeof gig_entity_1.Gig !== "undefined" && gig_entity_1.Gig) === "function" ? _a : Object)
], Contract.prototype, "gig", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contract.prototype, "proposalId", void 0);
__decorate([
    (0, graphql_1.Field)(() => proposal_entity_1.Proposal, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => proposal_entity_1.Proposal),
    (0, typeorm_1.JoinColumn)({ name: 'proposalId' }),
    __metadata("design:type", typeof (_b = typeof proposal_entity_1.Proposal !== "undefined" && proposal_entity_1.Proposal) === "function" ? _b : Object)
], Contract.prototype, "proposal", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contract.prototype, "helperId", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'helperId' }),
    __metadata("design:type", typeof (_c = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _c : Object)
], Contract.prototype, "helper", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contract.prototype, "contractorId", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'contractorId' }),
    __metadata("design:type", typeof (_d = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _d : Object)
], Contract.prototype, "contractor", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], Contract.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], Contract.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => ContractStatus),
    (0, typeorm_1.Column)({
        enum: ContractStatus,
        default: ContractStatus.ACTIVE,
        type: 'enum',
    }),
    __metadata("design:type", String)
], Contract.prototype, "status", void 0);
Contract = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Contract);
exports.Contract = Contract;


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Notification = void 0;
const typeorm_1 = __webpack_require__(12);
const abstract_entity_1 = __webpack_require__(10);
let Notification = class Notification extends abstract_entity_1.AbstractEntity {
};
Notification = __decorate([
    (0, typeorm_1.Entity)()
], Notification);
exports.Notification = Notification;


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatUser = exports.Chat = exports.ChatUserRole = void 0;
const typeorm_1 = __webpack_require__(12);
const abstract_entity_1 = __webpack_require__(10);
const graphql_1 = __webpack_require__(11);
const user_entity_1 = __webpack_require__(14);
const message_entity_1 = __webpack_require__(25);
var ChatUserRole;
(function (ChatUserRole) {
    ChatUserRole["ADMIN"] = "ADMIN";
    ChatUserRole["MEMBER"] = "MEMBER";
})(ChatUserRole = exports.ChatUserRole || (exports.ChatUserRole = {}));
(0, graphql_1.registerEnumType)(ChatUserRole, { name: 'ChatUserRole' });
let Chat = class Chat extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Chat.prototype, "senderId", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'senderId' }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], Chat.prototype, "sender", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Chat.prototype, "receiverId", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'receiverId' }),
    __metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], Chat.prototype, "receiver", void 0);
__decorate([
    (0, graphql_1.Field)(() => [message_entity_1.Message], { defaultValue: [] }),
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (s) => s.chat),
    __metadata("design:type", Array)
], Chat.prototype, "conversations", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Chat.prototype, "lastMessageId", void 0);
__decorate([
    (0, graphql_1.Field)(() => message_entity_1.Message, { nullable: true }),
    (0, typeorm_1.OneToOne)(() => message_entity_1.Message, (s) => s.chat),
    (0, typeorm_1.JoinColumn)({ name: 'lastMessageId' }),
    __metadata("design:type", typeof (_c = typeof message_entity_1.Message !== "undefined" && message_entity_1.Message) === "function" ? _c : Object)
], Chat.prototype, "lastMessage", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: 0 }),
    __metadata("design:type", Number)
], Chat.prototype, "unseen", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: 0 }),
    __metadata("design:type", Number)
], Chat.prototype, "totalUnseen", void 0);
Chat = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Chat);
exports.Chat = Chat;
let ChatUser = class ChatUser extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChatUser.prototype, "chatId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Chat, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => Chat, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'chatId' }),
    __metadata("design:type", Chat)
], ChatUser.prototype, "chat", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChatUser.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", typeof (_d = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _d : Object)
], ChatUser.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => ChatUserRole),
    (0, typeorm_1.Column)({ type: 'enum', enum: ChatUserRole, default: ChatUserRole.ADMIN }),
    __metadata("design:type", String)
], ChatUser.prototype, "role", void 0);
ChatUser = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], ChatUser);
exports.ChatUser = ChatUser;


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Message = void 0;
const graphql_1 = __webpack_require__(11);
const typeorm_1 = __webpack_require__(12);
const chat_entity_1 = __webpack_require__(24);
const abstract_entity_1 = __webpack_require__(10);
const user_entity_1 = __webpack_require__(14);
let Message = class Message extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "attachment", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Message.prototype, "seen", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Message.prototype, "senderId", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'senderId' }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], Message.prototype, "sender", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Message.prototype, "chatId", void 0);
__decorate([
    (0, graphql_1.Field)(() => chat_entity_1.Chat, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => chat_entity_1.Chat, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'chatId' }),
    __metadata("design:type", typeof (_b = typeof chat_entity_1.Chat !== "undefined" && chat_entity_1.Chat) === "function" ? _b : Object)
], Message.prototype, "chat", void 0);
Message = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Message);
exports.Message = Message;


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Connection = exports.ConnectionStatus = void 0;
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(11);
const typeorm_1 = __webpack_require__(12);
const user_entity_1 = __webpack_require__(14);
var ConnectionStatus;
(function (ConnectionStatus) {
    ConnectionStatus["PENDING"] = "PENDING";
    ConnectionStatus["ACCEPTED"] = "ACCEPTED";
    ConnectionStatus["REJECTED"] = "REJECTED";
})(ConnectionStatus = exports.ConnectionStatus || (exports.ConnectionStatus = {}));
(0, graphql_1.registerEnumType)(ConnectionStatus, { name: 'ConnectionStatus' });
let Connection = class Connection extends common_1.AbstractEntity {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Connection.prototype, "followerId", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'followerId' }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], Connection.prototype, "follower", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Connection.prototype, "followingId", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'followingId' }),
    __metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], Connection.prototype, "following", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({
        enum: ConnectionStatus,
        default: ConnectionStatus.PENDING,
        type: 'enum',
    }),
    __metadata("design:type", String)
], Connection.prototype, "status", void 0);
Connection = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Connection);
exports.Connection = Connection;


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OTP = void 0;
const typeorm_1 = __webpack_require__(12);
const abstract_entity_1 = __webpack_require__(10);
let OTP = class OTP extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OTP.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OTP.prototype, "otp", void 0);
OTP = __decorate([
    (0, typeorm_1.Entity)()
], OTP);
exports.OTP = OTP;


/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GraphQLModule = void 0;
const common_1 = __webpack_require__(2);
const apollo_1 = __webpack_require__(29);
const graphql_1 = __webpack_require__(11);
const path_1 = __webpack_require__(30);
let GraphQLModule = class GraphQLModule {
};
GraphQLModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'libs/common/src/graphql/schema.gql'),
                sortSchema: true,
                subscriptions: {
                    'graphql-ws': true,
                    'subscriptions-transport-ws': true,
                },
                path: '/',
                csrfPrevention: false,
            }),
        ],
    })
], GraphQLModule);
exports.GraphQLModule = GraphQLModule;


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),
/* 30 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = void 0;
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(11);
const getCurrentUserByContext = (context) => {
    if (context.getType() === 'http') {
        return context.switchToHttp().getRequest().user;
    }
    else {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req.user;
    }
};
exports.CurrentUser = (0, common_1.createParamDecorator)((_data, contenxt) => getCurrentUserByContext(contenxt));


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Upload = void 0;
const graphql_1 = __webpack_require__(11);
const graphql_upload_ts_1 = __webpack_require__(33);
let Upload = class Upload {
    constructor() {
        this.description = 'File upload scalar type';
    }
    parseValue(value) {
        return graphql_upload_ts_1.GraphQLUpload.parseValue(value);
    }
    serialize(value) {
        return graphql_upload_ts_1.GraphQLUpload.serialize(value);
    }
    parseLiteral(value) {
        return graphql_upload_ts_1.GraphQLUpload.parseLiteral(value);
    }
};
Upload = __decorate([
    (0, graphql_1.Scalar)('Upload')
], Upload);
exports.Upload = Upload;


/***/ }),
/* 33 */
/***/ ((module) => {

module.exports = require("graphql-upload-ts");

/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AzureFilesService = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(7);
const storage_blob_1 = __webpack_require__(35);
const crypto = __webpack_require__(36);
let AzureFilesService = class AzureFilesService {
    constructor(configService) {
        this.configService = configService;
        this.containerName = 'assets';
    }
    async getBlobServiceInstance() {
        const connectionString = this.configService.get('AZURE_CONNECTION_STRING');
        return storage_blob_1.BlobServiceClient.fromConnectionString(connectionString);
    }
    async getBlobClient(imageName) {
        const blobService = await this.getBlobServiceInstance();
        const containerName = this.containerName;
        const containerClient = blobService.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(imageName);
        return blockBlobClient;
    }
    async singleUpload(_file, containerName) {
        if (containerName)
            this.containerName = containerName;
        const file = await _file;
        const extension = file.filename.split('.').pop();
        const file_name = crypto.randomUUID() + '.' + extension;
        const blockBlobClient = await this.getBlobClient(file_name);
        const fileUrl = blockBlobClient.url;
        const stream = file.createReadStream();
        const buffer = await this.streamToBuffer(stream);
        await blockBlobClient.uploadData(buffer);
        return fileUrl;
    }
    async streamToBuffer(stream) {
        return new Promise((resolve, reject) => {
            const chunks = [];
            stream.on('data', (chunk) => chunks.push(chunk));
            stream.on('error', reject);
            stream.on('end', () => resolve(Buffer.concat(chunks)));
        });
    }
};
AzureFilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], AzureFilesService);
exports.AzureFilesService = AzureFilesService;


/***/ }),
/* 35 */
/***/ ((module) => {

module.exports = require("@azure/storage-blob");

/***/ }),
/* 36 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AzureModule = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(7);
const azure_file_service_1 = __webpack_require__(34);
let AzureModule = class AzureModule {
};
AzureModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        exports: [azure_file_service_1.AzureFilesService],
        providers: [],
    })
], AzureModule);
exports.AzureModule = AzureModule;


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailService = void 0;
const common_1 = __webpack_require__(2);
const communication_email_1 = __webpack_require__(39);
const config_1 = __webpack_require__(7);
let MailService = class MailService {
    constructor(configService) {
        this.configService = configService;
        this.from = 'DoNotReply@301efaea-ee86-472d-b76d-ae37192c6572.azurecomm.net';
        const connectionString = this.configService.get('COMMUNICATION_SERVICES_CONNECTION_STRING');
        this.client = new communication_email_1.EmailClient(connectionString);
    }
    async sendMail(payload) {
        const emailMessage = {
            senderAddress: this.from,
            content: {
                subject: payload.subject,
                html: payload.html,
            },
            recipients: {
                to: [{ address: payload.to }],
            },
        };
        const poller = await this.client.beginSend(emailMessage);
        const result = await poller.pollUntilDone();
        return result;
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], MailService);
exports.MailService = MailService;


/***/ }),
/* 39 */
/***/ ((module) => {

module.exports = require("@azure/communication-email");

/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(8);
const user_resolver_1 = __webpack_require__(41);
const user_service_1 = __webpack_require__(42);
const common_2 = __webpack_require__(5);
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([common_2.User, common_2.Connection])],
        providers: [user_resolver_1.UserResolver, user_service_1.UserService, common_2.AzureFilesService],
        exports: [typeorm_1.TypeOrmModule, user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserResolver = void 0;
const graphql_1 = __webpack_require__(11);
const user_service_1 = __webpack_require__(42);
const common_1 = __webpack_require__(2);
const guards_1 = __webpack_require__(43);
const common_2 = __webpack_require__(5);
const user_dto_1 = __webpack_require__(48);
const update_user_dto_1 = __webpack_require__(49);
const change_password_dto_1 = __webpack_require__(50);
let UserResolver = class UserResolver {
    constructor(userService, azureFileService) {
        this.userService = userService;
        this.azureFileService = azureFileService;
    }
    findAll(user, page, limit, searchText, role) {
        return this.userService.findAll({
            page,
            limit,
            searchText,
            userId: user.id,
            role,
        });
    }
    findConnections(user, page, limit, searchText, role) {
        return this.userService.findConnections({
            page,
            limit,
            searchText,
            userId: user.id,
            role,
        });
    }
    findOne(id) {
        return this.userService.getUserById(id);
    }
    async myProfile(user) {
        return user;
    }
    async updateProfile(payload, user) {
        if (payload.profilePictureFile) {
            const fileurl = await this.azureFileService.singleUpload(payload.profilePictureFile);
            payload.profilePicture = fileurl;
            delete payload.profilePictureFile;
        }
        return this.userService.updateProfile(user, payload);
    }
    async changePassword(payload, user) {
        return this.userService.changePassword(user, payload);
    }
};
__decorate([
    (0, graphql_1.Query)(() => user_dto_1.UsersResponse, { name: 'users' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('page', { nullable: true, type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('limit', { nullable: true, type: () => graphql_1.Int })),
    __param(3, (0, graphql_1.Args)('searchText', { nullable: true })),
    __param(4, (0, graphql_1.Args)('role', { nullable: true, type: () => common_2.UserRole })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof common_2.User !== "undefined" && common_2.User) === "function" ? _c : Object, Number, Number, String, typeof (_d = typeof common_2.UserRole !== "undefined" && common_2.UserRole) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => user_dto_1.UsersResponse),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('page', { nullable: true, type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('limit', { nullable: true, type: () => graphql_1.Int })),
    __param(3, (0, graphql_1.Args)('searchText', { nullable: true })),
    __param(4, (0, graphql_1.Args)('role', { nullable: true, type: () => common_2.UserRole })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof common_2.User !== "undefined" && common_2.User) === "function" ? _e : Object, Number, Number, String, typeof (_f = typeof common_2.UserRole !== "undefined" && common_2.UserRole) === "function" ? _f : Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "findConnections", null);
__decorate([
    (0, graphql_1.Query)(() => common_2.User, { name: 'user' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => common_2.User),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof common_2.User !== "undefined" && common_2.User) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "myProfile", null);
__decorate([
    (0, graphql_1.Mutation)(() => common_2.User),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('payload')),
    __param(1, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof update_user_dto_1.UpdateUserInput !== "undefined" && update_user_dto_1.UpdateUserInput) === "function" ? _h : Object, typeof (_j = typeof common_2.User !== "undefined" && common_2.User) === "function" ? _j : Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateProfile", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('payload')),
    __param(1, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof change_password_dto_1.ChangePasswordInput !== "undefined" && change_password_dto_1.ChangePasswordInput) === "function" ? _k : Object, typeof (_l = typeof common_2.User !== "undefined" && common_2.User) === "function" ? _l : Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof common_2.AzureFilesService !== "undefined" && common_2.AzureFilesService) === "function" ? _b : Object])
], UserResolver);
exports.UserResolver = UserResolver;


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const common_1 = __webpack_require__(2);
const common_2 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(8);
const typeorm_2 = __webpack_require__(12);
let UserService = class UserService {
    constructor(userRepository, connectionRepository) {
        this.userRepository = userRepository;
        this.connectionRepository = connectionRepository;
    }
    async createUser(payload) {
        const exists = await this.userRepository.findOne({
            where: { email: payload.email },
        });
        if (exists) {
            throw new common_1.BadRequestException('This email already exists');
        }
        return this.userRepository.create(payload).save();
    }
    async updateUser(id, updateUserInput) {
        if (updateUserInput.email) {
            const exists = await this.userRepository.findOne({
                where: { email: updateUserInput.email, id: (0, typeorm_2.Not)(id) },
            });
            if (exists) {
                throw new common_1.BadRequestException('This email already exists with other user');
            }
        }
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User does not exists');
        Object.assign(user, updateUserInput);
        await user.save();
        return user;
    }
    async resetPassword(email, password) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user)
            throw new common_1.NotFoundException('User does not exists');
        user.password = user.hashPassword(password);
        await user.save();
        return user;
    }
    async updateProfile(user, updateUserInput) {
        if (updateUserInput.email) {
            const exists = await this.userRepository.findOne({
                where: { email: updateUserInput.email, id: (0, typeorm_2.Not)(user.id) },
            });
            if (exists) {
                throw new common_1.BadRequestException('This email already exists with other user');
            }
        }
        Object.assign(user, updateUserInput);
        await user.save();
        return user;
    }
    async changePassword(user, payload) {
        if (!user.isPasswordMatched(payload.oldPassword)) {
            throw new common_1.UnauthorizedException('Old password does not match');
        }
        user.password = user.hashPassword(payload.newPassword);
        await user.save();
        return 'Password successfully changed';
    }
    async findOne(email) {
        return this.userRepository.findOne({ where: { email } });
    }
    async findAll(params) {
        const [entries, total] = await this.userRepository.findAndCount({
            where: [{ id: (0, typeorm_2.Not)(params.userId) }],
            skip: params.page ? (params.page - 1) * params.limit : 0,
            take: params.limit,
        });
        return {
            entries,
            total,
        };
    }
    async findConnections(params) {
        const connections = await this.connectionRepository.find({
            select: { followerId: true, followingId: true },
        });
        const users = {
            [params.userId]: 1,
        };
        connections.forEach((e) => {
            users[e.followerId] = 1;
            users[e.followingId] = 1;
        });
        const excludes = Object.keys(users);
        const [entries, total] = await this.userRepository.findAndCount({
            where: {
                id: (0, typeorm_2.Not)((0, typeorm_2.In)(excludes)),
                role: params.role,
                firstname: (0, typeorm_2.ILike)(`%${params.searchText}%`),
            },
            skip: params.page ? (params.page - 1) * params.limit : 0,
            take: params.limit,
        });
        return {
            entries,
            total,
        };
    }
    async getUserById(id) {
        return this.userRepository.findOne({
            where: { id },
            relations: ['gigs', 'savedGigs', 'savedGigs.user', 'savedGigs.gig'],
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(common_2.User)),
    __param(1, (0, typeorm_1.InjectRepository)(common_2.Connection)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], UserService);
exports.UserService = UserService;


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = exports.LocalAuthGuard = exports.JwtAuthGuard = void 0;
var jwt_guard_1 = __webpack_require__(44);
Object.defineProperty(exports, "JwtAuthGuard", ({ enumerable: true, get: function () { return jwt_guard_1.JwtAuthGuard; } }));
var local_guard_1 = __webpack_require__(46);
Object.defineProperty(exports, "LocalAuthGuard", ({ enumerable: true, get: function () { return local_guard_1.LocalAuthGuard; } }));
var roles_guard_1 = __webpack_require__(47);
Object.defineProperty(exports, "RolesGuard", ({ enumerable: true, get: function () { return roles_guard_1.RolesGuard; } }));


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(11);
const passport_1 = __webpack_require__(45);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
};
JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),
/* 45 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(11);
const passport_1 = __webpack_require__(45);
let LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
};
LocalAuthGuard = __decorate([
    (0, common_1.Injectable)()
], LocalAuthGuard);
exports.LocalAuthGuard = LocalAuthGuard;


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(3);
const graphql_1 = __webpack_require__(11);
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const roles = this.reflector.get('roles', ctx.getHandler());
        if (!roles) {
            return true;
        }
        const request = ctx.getContext().req;
        const user = request.user;
        return matchRoles(roles, user.role);
    }
};
RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);
exports.RolesGuard = RolesGuard;
const matchRoles = (roles, role) => {
    if (roles.includes(role)) {
        return true;
    }
    else {
        throw new common_1.UnauthorizedException('Permissionn denied');
    }
};


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersResponse = void 0;
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(11);
let UsersResponse = class UsersResponse {
};
__decorate([
    (0, graphql_1.Field)(() => [common_1.User]),
    __metadata("design:type", Array)
], UsersResponse.prototype, "entries", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UsersResponse.prototype, "total", void 0);
UsersResponse = __decorate([
    (0, graphql_1.ObjectType)()
], UsersResponse);
exports.UsersResponse = UsersResponse;


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserInput = void 0;
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(11);
let UpdateUserInput = class UpdateUserInput {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "firstname", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "lastname", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "bio", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "company", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "state", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "zipcode", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_1.Upload, { nullable: true }),
    __metadata("design:type", typeof (_a = typeof common_1.Upload !== "undefined" && common_1.Upload) === "function" ? _a : Object)
], UpdateUserInput.prototype, "profilePictureFile", void 0);
UpdateUserInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateUserInput);
exports.UpdateUserInput = UpdateUserInput;


/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChangePasswordInput = void 0;
const graphql_1 = __webpack_require__(11);
let ChangePasswordInput = class ChangePasswordInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ChangePasswordInput.prototype, "oldPassword", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ChangePasswordInput.prototype, "newPassword", void 0);
ChangePasswordInput = __decorate([
    (0, graphql_1.InputType)()
], ChangePasswordInput);
exports.ChangePasswordInput = ChangePasswordInput;


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const config_1 = __webpack_require__(7);
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(52);
const user_module_1 = __webpack_require__(40);
const auth_service_1 = __webpack_require__(53);
const auth_resolver_1 = __webpack_require__(54);
const user_service_1 = __webpack_require__(42);
const local_strategy_1 = __webpack_require__(58);
const jwt_strategy_1 = __webpack_require__(60);
const typeorm_1 = __webpack_require__(8);
const common_2 = __webpack_require__(5);
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([common_2.OTP]),
            user_module_1.UserModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => {
                    return {
                        secret: configService.get('JWT_SECRET'),
                        signOptions: {
                            expiresIn: `${configService.get('JWT_EXPIRES_IN')}d`,
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [
            auth_resolver_1.AuthResolver,
            auth_service_1.AuthService,
            user_service_1.UserService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            common_2.MailService,
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),
/* 52 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const config_1 = __webpack_require__(7);
const jwt_1 = __webpack_require__(52);
const common_1 = __webpack_require__(2);
const user_service_1 = __webpack_require__(42);
const common_2 = __webpack_require__(5);
const crypto = __webpack_require__(36);
const typeorm_1 = __webpack_require__(8);
const typeorm_2 = __webpack_require__(12);
let AuthService = class AuthService {
    constructor(otpRepository, configService, jwtService, userService, mailService) {
        this.otpRepository = otpRepository;
        this.configService = configService;
        this.jwtService = jwtService;
        this.userService = userService;
        this.mailService = mailService;
    }
    async generateJwt(user) {
        const tokenPayload = {
            userId: user.id,
            role: user.role,
        };
        const expires = new Date();
        expires.setHours(expires.getHours() + this.configService.get('JWT_EXPIRES_IN') * 24);
        const token = this.jwtService.sign(tokenPayload);
        return token;
    }
    async login(email, password) {
        const user = await this.validateUser(email, password);
        const token = await this.generateJwt(user);
        return {
            user,
            accessToken: token,
        };
    }
    async validateUser(email, password) {
        const user = await this.userService.findOne(email);
        if (!user) {
            throw new common_1.UnauthorizedException('User does not found');
        }
        const isMatched = user.isPasswordMatched(password);
        if (!isMatched) {
            throw new common_1.UnauthorizedException('Password does not matched');
        }
        return user;
    }
    async validateJwtUser(userId) {
        const user = await this.userService.getUserById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('Unauthorized');
        }
        return user;
    }
    async logout(user, response) {
        response.clearCookie('Authorization', { httpOnly: true });
    }
    async register(payload) {
        try {
            const user = await this.userService.createUser(payload);
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async forgot(email) {
        const user = await this.userService.findOne(email);
        if (!user) {
            throw new common_1.UnauthorizedException('User does not exists');
        }
        const otp = crypto.randomInt(100000, 999999);
        const exists = await this.otpRepository.findOne({
            where: { email },
        });
        if (exists) {
            await exists.remove();
        }
        await this.otpRepository.create({ otp, email }).save();
        this.mailService.sendMail({
            to: email,
            subject: `Forgot Password | ProGig`,
            html: `
      Dear User,
      <br/><br/>
      Please use this OTP to reset your password
      <br/><br/>
      <h1>${otp}</h1>
      <br/><br/>
      
      `,
        });
        return otp;
    }
    async validateOtp(otp, email) {
        const cond = { otp };
        if (email)
            cond.email = email;
        return this.otpRepository.findOne({ where: cond });
    }
    async resetPassword(otp, email, password) {
        const isValidOtp = await this.validateOtp(otp, email);
        if (isValidOtp) {
            const user = await this.userService.resetPassword(email, password);
            return user;
        }
        else {
            throw new common_1.BadRequestException('OTP invalid or expired');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(common_2.OTP)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _c : Object, typeof (_d = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _d : Object, typeof (_e = typeof common_2.MailService !== "undefined" && common_2.MailService) === "function" ? _e : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResolver = void 0;
const graphql_1 = __webpack_require__(11);
const auth_response_dto_1 = __webpack_require__(55);
const auth_service_1 = __webpack_require__(53);
const create_user_dto_1 = __webpack_require__(56);
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    async login(email, password) {
        return this.authService.login(email, password);
    }
    async register(payload) {
        const user = await this.authService.register(payload);
        return {
            message: 'Registration successful!',
            user,
        };
    }
    async forgotPassword(email) {
        const otp = await this.authService.forgot(email);
        return {
            message: `An OTP sent to your email ${email} successfully`,
            otp,
        };
    }
    async resetPassword(otp, password, email) {
        await this.authService.resetPassword(otp, email, password);
        return {
            message: 'Password reset successful!',
        };
    }
    async validateOTP(otp) {
        const exists = await this.authService.validateOtp(otp);
        if (exists) {
            return true;
        }
        else {
            return false;
        }
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => auth_response_dto_1.LoginResponse),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)(() => auth_response_dto_1.RegistrationResponse),
    __param(0, (0, graphql_1.Args)('payload')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_user_dto_1.CreateUserInput !== "undefined" && create_user_dto_1.CreateUserInput) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
__decorate([
    (0, graphql_1.Mutation)(() => auth_response_dto_1.ForgotPasswordResponse),
    __param(0, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "forgotPassword", null);
__decorate([
    (0, graphql_1.Mutation)(() => auth_response_dto_1.RegistrationResponse),
    __param(0, (0, graphql_1.Args)('otp', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('password')),
    __param(2, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "resetPassword", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('otp', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "validateOTP", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)('Auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthResolver);
exports.AuthResolver = AuthResolver;


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ForgotPasswordResponse = exports.RegistrationResponse = exports.LoginResponse = void 0;
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(11);
let LoginResponse = class LoginResponse {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginResponse.prototype, "accessToken", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_a = typeof common_1.User !== "undefined" && common_1.User) === "function" ? _a : Object)
], LoginResponse.prototype, "user", void 0);
LoginResponse = __decorate([
    (0, graphql_1.ObjectType)()
], LoginResponse);
exports.LoginResponse = LoginResponse;
let RegistrationResponse = class RegistrationResponse {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RegistrationResponse.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_b = typeof common_1.User !== "undefined" && common_1.User) === "function" ? _b : Object)
], RegistrationResponse.prototype, "user", void 0);
RegistrationResponse = __decorate([
    (0, graphql_1.ObjectType)()
], RegistrationResponse);
exports.RegistrationResponse = RegistrationResponse;
let ForgotPasswordResponse = class ForgotPasswordResponse {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ForgotPasswordResponse.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ForgotPasswordResponse.prototype, "otp", void 0);
ForgotPasswordResponse = __decorate([
    (0, graphql_1.ObjectType)()
], ForgotPasswordResponse);
exports.ForgotPasswordResponse = ForgotPasswordResponse;


/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserInput = void 0;
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(57);
let CreateUserInput = class CreateUserInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateUserInput.prototype, "firstname", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateUserInput.prototype, "lastname", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateUserInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], CreateUserInput.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_1.UserRole),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(common_1.UserRole),
    __metadata("design:type", typeof (_a = typeof common_1.UserRole !== "undefined" && common_1.UserRole) === "function" ? _a : Object)
], CreateUserInput.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "bio", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "company", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "phone", void 0);
CreateUserInput = __decorate([
    (0, graphql_1.InputType)()
], CreateUserInput);
exports.CreateUserInput = CreateUserInput;


/***/ }),
/* 57 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(45);
const passport_local_1 = __webpack_require__(59);
const auth_service_1 = __webpack_require__(53);
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super({ usernameField: 'email' });
        this.authService = authService;
    }
    async validate(email, password) {
        return this.authService.validateUser(email, password);
    }
};
LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),
/* 59 */
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const config_1 = __webpack_require__(7);
const passport_jwt_1 = __webpack_require__(61);
const passport_1 = __webpack_require__(45);
const common_1 = __webpack_require__(2);
const auth_service_1 = __webpack_require__(53);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(authService, configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET'),
        });
        this.authService = authService;
    }
    async validate(payload) {
        return this.authService.validateJwtUser(payload.userId);
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),
/* 61 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GigModule = void 0;
const common_1 = __webpack_require__(2);
const gig_service_1 = __webpack_require__(63);
const gig_resolver_1 = __webpack_require__(64);
const typeorm_1 = __webpack_require__(8);
const common_2 = __webpack_require__(5);
let GigModule = class GigModule {
};
GigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([common_2.Gig, common_2.Proposal, common_2.SavedGig, common_2.Contract, common_2.Content]),
        ],
        providers: [gig_resolver_1.GigResolver, gig_service_1.GigService, common_2.AzureFilesService],
    })
], GigModule);
exports.GigModule = GigModule;


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GigService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(8);
const typeorm_2 = __webpack_require__(12);
const common_2 = __webpack_require__(5);
const content_entity_1 = __webpack_require__(17);
let GigService = class GigService {
    constructor(gigRepository, proposalRepository, savedGigRepository, contractRepository, contentRepository, azureFileService) {
        this.gigRepository = gigRepository;
        this.proposalRepository = proposalRepository;
        this.savedGigRepository = savedGigRepository;
        this.contractRepository = contractRepository;
        this.contentRepository = contentRepository;
        this.azureFileService = azureFileService;
    }
    async create(_a, user) {
        var { images } = _a, payload = __rest(_a, ["images"]);
        const gig = await this.gigRepository
            .create(Object.assign(Object.assign({}, payload), { contractorId: user.id, images: [] }))
            .save();
        if (images.length > 0) {
            const attachments = [];
            for (const image of images) {
                const fileurl = await this.azureFileService.singleUpload(image);
                attachments.push(fileurl);
            }
            if (attachments.length > 0) {
                const contents = await this.contentRepository.insert(attachments.map((s) => ({ url: s, user_id: user.id })));
                gig.images = contents.identifiers;
                await gig.save();
            }
        }
        return gig;
    }
    async findAll(params) {
        const where = {};
        if (params.contractorId) {
            where['contractorId'] = params.contractorId;
        }
        if (params.searchText) {
            where['description'] = (0, typeorm_2.ILike)(`%${params.searchText}%`);
        }
        const [entries, total] = await this.gigRepository.findAndCount({
            where,
            skip: params.page ? (params.page - 1) * params.limit : 0,
            take: params.limit,
            relations: ['contractor', 'proposals'],
            order: { createdAt: 'DESC' },
        });
        return {
            entries: entries.map((e) => {
                e.noOfProposals = e.proposals.length;
                return e;
            }),
            total,
        };
    }
    async findOne(id, user) {
        const gig = await this.gigRepository.findOne({
            where: { id },
            relations: ['contractor', 'proposals', 'images'],
        });
        const isSaved = await this.savedGigRepository.findOne({
            where: {
                gigId: id,
                userId: user.id,
            },
        });
        gig.isSaved = !!isSaved;
        if (user.id !== gig.contractorId) {
            gig.proposals = gig.proposals.filter((p) => p.helperId === user.id);
        }
        gig.noOfProposals = gig.proposals.length;
        return gig;
    }
    update(_a) {
        var { id } = _a, payload = __rest(_a, ["id"]);
        return this.gigRepository.update(id, payload);
    }
    remove(id) {
        return this.gigRepository.delete(id);
    }
    async sendProposal(payload, user) {
        const gig = await this.gigRepository.findOne({
            where: {
                id: payload.gigId,
            },
            relations: ['proposals'],
        });
        if (gig.proposals.length >= gig.maxProposal) {
            throw new common_1.UnprocessableEntityException('Proposal limit exceed. You cannot send any proposal');
        }
        const isExists = await this.proposalRepository.findOne({
            where: {
                gigId: payload.gigId,
                helperId: user.id,
            },
        });
        if (isExists)
            throw new common_1.UnprocessableEntityException('You already sent propsal');
        return this.proposalRepository
            .create(Object.assign(Object.assign({}, payload), { helperId: user.id }))
            .save();
    }
    async withdrawProposal(id, user) {
        const proposal = await this.proposalRepository.findOne({
            where: {
                id,
                helperId: user.id,
            },
        });
        if (!proposal)
            throw new common_1.NotFoundException('Proposal does not exists');
        proposal.status = common_2.ProposalStatus.DELETED;
        await proposal.save();
        return proposal;
    }
    async acceptProposal(id, user) {
        const proposal = await this.proposalRepository.findOne({
            where: { id },
            relations: ['gig'],
        });
        if (proposal.gig.contractorId !== user.id) {
            throw new common_1.UnauthorizedException('Permission denied');
        }
        if (proposal.status === common_2.ProposalStatus.PENDING) {
            const contract = await this.contractRepository
                .create({
                gigId: proposal.gigId,
                proposal: proposal,
                helperId: proposal.helperId,
                contractorId: proposal.gig.contractorId,
                startDate: proposal.gig.startDate,
                endDate: proposal.gig.endDate,
            })
                .save();
            proposal.status = common_2.ProposalStatus.ACCEPTED;
            proposal.contract = contract;
            await proposal.save();
            return { contract, proposal };
        }
        else if (proposal.status === common_2.ProposalStatus.ACCEPTED) {
            throw new common_1.BadRequestException('Proposal already accepted');
        }
        else {
            throw new common_1.BadRequestException();
        }
    }
    async rejectProposal(id, user) {
        const proposal = await this.proposalRepository.findOne({
            where: { id },
            relations: ['gig'],
        });
        if (proposal.gig.contractorId !== user.id) {
            throw new common_1.UnauthorizedException('Permission denied');
        }
        if (proposal.status === common_2.ProposalStatus.PENDING) {
            proposal.status = common_2.ProposalStatus.REJECTED;
            await proposal.save();
            return proposal;
        }
        else if (proposal.status === common_2.ProposalStatus.ACCEPTED) {
            throw new common_1.BadRequestException('Proposal already accepted');
        }
        else {
            throw new common_1.BadRequestException();
        }
    }
    async getProposals(gigId, user) {
        const gig = await this.gigRepository.findOne({ where: { id: gigId } });
        const where = { gigId };
        if (gig.contractorId !== user.id)
            where['helperId'] = user.id;
        return this.proposalRepository.find({
            where,
        });
    }
    async getMyProposals({ helperId, page, limit, searchText, }) {
        const [entries, total] = await this.proposalRepository.findAndCount({
            where: {
                helperId,
                coverLetter: (0, typeorm_2.ILike)(`%${searchText}%`),
            },
            skip: page ? (page - 1) * limit : 0,
            take: limit,
            relations: ['gig', 'contract'],
        });
        return {
            entries,
            total,
        };
    }
    async saveUnsaveGig({ gigId, userId }) {
        const isExists = await this.savedGigRepository.findOne({
            where: { userId, gigId },
        });
        if (isExists) {
            await isExists.remove();
            return null;
        }
        const saved = await this.savedGigRepository
            .create({ userId, gigId })
            .save();
        return saved.id;
    }
    async savedGigs(params) {
        const [entries, total] = await this.savedGigRepository.findAndCount({
            where: {
                userId: params.userId,
            },
            skip: params.page ? (params.page - 1) * params.limit : 0,
            take: params.limit,
            relations: ['gig'],
        });
        return {
            entries: entries.map((e) => {
                return e.gig;
            }),
            total,
        };
    }
};
GigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(common_2.Gig)),
    __param(1, (0, typeorm_1.InjectRepository)(common_2.Proposal)),
    __param(2, (0, typeorm_1.InjectRepository)(common_2.SavedGig)),
    __param(3, (0, typeorm_1.InjectRepository)(common_2.Contract)),
    __param(4, (0, typeorm_1.InjectRepository)(content_entity_1.Content)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof common_2.AzureFilesService !== "undefined" && common_2.AzureFilesService) === "function" ? _f : Object])
], GigService);
exports.GigService = GigService;


/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GigResolver = void 0;
const graphql_1 = __webpack_require__(11);
const gig_service_1 = __webpack_require__(63);
const create_gig_dto_1 = __webpack_require__(65);
const update_gig_dto_1 = __webpack_require__(66);
const gigs_dto_1 = __webpack_require__(67);
const common_1 = __webpack_require__(2);
const common_2 = __webpack_require__(5);
const guards_1 = __webpack_require__(43);
const send_proposal_dto_1 = __webpack_require__(68);
const auth_decorator_1 = __webpack_require__(69);
const accept_proposal_dto_1 = __webpack_require__(70);
const get_proposals_dto_1 = __webpack_require__(71);
let GigResolver = class GigResolver {
    constructor(gigService) {
        this.gigService = gigService;
    }
    async createGig(payload, user) {
        return this.gigService.create(payload, user);
    }
    findAll(page, limit, searchText, contractorId) {
        return this.gigService.findAll({
            page,
            limit,
            searchText,
            contractorId,
        });
    }
    findAllMyGigs(user, page, limit, searchText) {
        return this.gigService.findAll({
            page,
            limit,
            searchText,
            contractorId: user.id,
        });
    }
    saveUnsaveGig(user, gigId) {
        return this.gigService.saveUnsaveGig({
            userId: user.id,
            gigId,
        });
    }
    savedGigs(user, page, limit, searchText) {
        return this.gigService.savedGigs({
            page,
            limit,
            searchText,
            userId: user.id,
        });
    }
    findOne(id, user) {
        return this.gigService.findOne(id, user);
    }
    updateGig(updateGigInput) {
        return this.gigService.update(updateGigInput);
    }
    removeGig(id) {
        return this.gigService.remove(id);
    }
    sendProposal(payload, user) {
        return this.gigService.sendProposal(payload, user);
    }
    acceptProposal(id, user) {
        return this.gigService.acceptProposal(id, user);
    }
    rejectProposal(id, user) {
        return this.gigService.rejectProposal(id, user);
    }
    getProposals(gigId, user) {
        return this.gigService.getProposals(gigId, user);
    }
    getMyProposals(user, page, limit, searchText) {
        return this.gigService.getMyProposals({
            helperId: user.id,
            page,
            limit,
            searchText,
        });
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => common_2.Gig),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('payload')),
    __param(1, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_gig_dto_1.CreateGigInput !== "undefined" && create_gig_dto_1.CreateGigInput) === "function" ? _b : Object, typeof (_c = typeof common_2.User !== "undefined" && common_2.User) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], GigResolver.prototype, "createGig", null);
__decorate([
    (0, graphql_1.Query)(() => gigs_dto_1.GigsResponse, { name: 'gigs' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('page', { nullable: true, type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('limit', { nullable: true, type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('searchText', { nullable: true })),
    __param(3, (0, graphql_1.Args)('contractorId', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], GigResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => gigs_dto_1.GigsResponse, { name: 'myGigs' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('page', { nullable: true, type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('limit', { nullable: true, type: () => graphql_1.Int })),
    __param(3, (0, graphql_1.Args)('searchText', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof common_2.User !== "undefined" && common_2.User) === "function" ? _d : Object, Number, Number, String]),
    __metadata("design:returntype", void 0)
], GigResolver.prototype, "findAllMyGigs", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_1.ID, { nullable: true }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('gigId', { nullable: true, type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof common_2.User !== "undefined" && common_2.User) === "function" ? _e : Object, String]),
    __metadata("design:returntype", void 0)
], GigResolver.prototype, "saveUnsaveGig", null);
__decorate([
    (0, graphql_1.Query)(() => gigs_dto_1.GigsResponse),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('page', { nullable: true, type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('limit', { nullable: true, type: () => graphql_1.Int })),
    __param(3, (0, graphql_1.Args)('searchText', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof common_2.User !== "undefined" && common_2.User) === "function" ? _f : Object, Number, Number, String]),
    __metadata("design:returntype", void 0)
], GigResolver.prototype, "savedGigs", null);
__decorate([
    (0, graphql_1.Query)(() => common_2.Gig, { name: 'gig', nullable: true }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_g = typeof common_2.User !== "undefined" && common_2.User) === "function" ? _g : Object]),
    __metadata("design:returntype", void 0)
], GigResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => common_2.Gig),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('payload')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof update_gig_dto_1.UpdateGigInput !== "undefined" && update_gig_dto_1.UpdateGigInput) === "function" ? _h : Object]),
    __metadata("design:returntype", void 0)
], GigResolver.prototype, "updateGig", null);
__decorate([
    (0, graphql_1.Mutation)(() => common_2.Gig),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GigResolver.prototype, "removeGig", null);
__decorate([
    (0, graphql_1.Mutation)(() => common_2.Proposal),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('payload')),
    __param(1, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof send_proposal_dto_1.SendProposalInput !== "undefined" && send_proposal_dto_1.SendProposalInput) === "function" ? _j : Object, typeof (_k = typeof common_2.User !== "undefined" && common_2.User) === "function" ? _k : Object]),
    __metadata("design:returntype", void 0)
], GigResolver.prototype, "sendProposal", null);
__decorate([
    (0, graphql_1.Mutation)(() => accept_proposal_dto_1.AcceptProposalResponse),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, auth_decorator_1.UseRoles)(common_2.UserRole.CONTRACTOR),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_l = typeof common_2.User !== "undefined" && common_2.User) === "function" ? _l : Object]),
    __metadata("design:returntype", void 0)
], GigResolver.prototype, "acceptProposal", null);
__decorate([
    (0, graphql_1.Mutation)(() => common_2.Proposal),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, auth_decorator_1.UseRoles)(common_2.UserRole.CONTRACTOR),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_m = typeof common_2.User !== "undefined" && common_2.User) === "function" ? _m : Object]),
    __metadata("design:returntype", void 0)
], GigResolver.prototype, "rejectProposal", null);
__decorate([
    (0, graphql_1.Query)(() => [common_2.Proposal], { name: 'proposals' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('gigId', { type: () => graphql_1.ID })),
    __param(1, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_o = typeof common_2.User !== "undefined" && common_2.User) === "function" ? _o : Object]),
    __metadata("design:returntype", void 0)
], GigResolver.prototype, "getProposals", null);
__decorate([
    (0, graphql_1.Query)(() => get_proposals_dto_1.ProposalsResponse, { name: 'myProposals' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('page', { nullable: true, type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('limit', { nullable: true, type: () => graphql_1.Int })),
    __param(3, (0, graphql_1.Args)('searchText', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof common_2.User !== "undefined" && common_2.User) === "function" ? _p : Object, Number, Number, String]),
    __metadata("design:returntype", void 0)
], GigResolver.prototype, "getMyProposals", null);
GigResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [typeof (_a = typeof gig_service_1.GigService !== "undefined" && gig_service_1.GigService) === "function" ? _a : Object])
], GigResolver);
exports.GigResolver = GigResolver;


/***/ }),
/* 65 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateGigInput = void 0;
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(11);
let CreateGigInput = class CreateGigInput {
};
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'Mandatory Field' }),
    __metadata("design:type", String)
], CreateGigInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'Mandatory Field' }),
    __metadata("design:type", String)
], CreateGigInput.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateGigInput.prototype, "budget", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { description: 'Mandatory Field' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreateGigInput.prototype, "deadline", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateGigInput.prototype, "requirements", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateGigInput.prototype, "paymentMethod", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateGigInput.prototype, "paymentType", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateGigInput.prototype, "location", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateGigInput.prototype, "jobType", void 0);
__decorate([
    (0, graphql_1.Field)(() => [common_1.Upload], { nullable: true }),
    __metadata("design:type", Array)
], CreateGigInput.prototype, "images", void 0);
CreateGigInput = __decorate([
    (0, graphql_1.InputType)()
], CreateGigInput);
exports.CreateGigInput = CreateGigInput;


/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateGigInput = void 0;
const graphql_1 = __webpack_require__(11);
let UpdateGigInput = class UpdateGigInput {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], UpdateGigInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'Mandatory Field' }),
    __metadata("design:type", String)
], UpdateGigInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'Mandatory Field' }),
    __metadata("design:type", String)
], UpdateGigInput.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], UpdateGigInput.prototype, "budget", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { description: 'Mandatory Field' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UpdateGigInput.prototype, "deadline", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateGigInput.prototype, "requirements", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateGigInput.prototype, "paymentMethod", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateGigInput.prototype, "location", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateGigInput.prototype, "jobType", void 0);
UpdateGigInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateGigInput);
exports.UpdateGigInput = UpdateGigInput;


/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GigsResponse = void 0;
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(11);
let GigsResponse = class GigsResponse {
};
__decorate([
    (0, graphql_1.Field)(() => [common_1.Gig]),
    __metadata("design:type", Array)
], GigsResponse.prototype, "entries", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], GigsResponse.prototype, "total", void 0);
GigsResponse = __decorate([
    (0, graphql_1.ObjectType)()
], GigsResponse);
exports.GigsResponse = GigsResponse;


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SendProposalInput = void 0;
const graphql_1 = __webpack_require__(11);
let SendProposalInput = class SendProposalInput {
};
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'Mandatory Field' }),
    __metadata("design:type", String)
], SendProposalInput.prototype, "coverLetter", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'Mandatory Field' }),
    __metadata("design:type", String)
], SendProposalInput.prototype, "gigId", void 0);
SendProposalInput = __decorate([
    (0, graphql_1.InputType)()
], SendProposalInput);
exports.SendProposalInput = SendProposalInput;


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.UseRoles = void 0;
const common_1 = __webpack_require__(2);
const UseRoles = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.UseRoles = UseRoles;
const Public = () => (0, common_1.SetMetadata)('IS_PUBLIC', true);
exports.Public = Public;


/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AcceptProposalResponse = void 0;
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(11);
let AcceptProposalResponse = class AcceptProposalResponse {
};
__decorate([
    (0, graphql_1.Field)(() => common_1.Proposal),
    __metadata("design:type", typeof (_a = typeof common_1.Proposal !== "undefined" && common_1.Proposal) === "function" ? _a : Object)
], AcceptProposalResponse.prototype, "proposal", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_1.Contract),
    __metadata("design:type", typeof (_b = typeof common_1.Contract !== "undefined" && common_1.Contract) === "function" ? _b : Object)
], AcceptProposalResponse.prototype, "contract", void 0);
AcceptProposalResponse = __decorate([
    (0, graphql_1.ObjectType)()
], AcceptProposalResponse);
exports.AcceptProposalResponse = AcceptProposalResponse;


/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetMyProposalDto = exports.ProposalsResponse = void 0;
const common_1 = __webpack_require__(5);
const default_dto_1 = __webpack_require__(72);
const graphql_1 = __webpack_require__(11);
let ProposalsResponse = class ProposalsResponse {
};
__decorate([
    (0, graphql_1.Field)(() => [common_1.Proposal]),
    __metadata("design:type", Array)
], ProposalsResponse.prototype, "entries", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ProposalsResponse.prototype, "total", void 0);
ProposalsResponse = __decorate([
    (0, graphql_1.ObjectType)()
], ProposalsResponse);
exports.ProposalsResponse = ProposalsResponse;
let GetMyProposalDto = class GetMyProposalDto extends default_dto_1.PaginationDto {
};
GetMyProposalDto = __decorate([
    (0, graphql_1.InputType)()
], GetMyProposalDto);
exports.GetMyProposalDto = GetMyProposalDto;


/***/ }),
/* 72 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaginationDto = void 0;
const graphql_1 = __webpack_require__(11);
let PaginationDto = class PaginationDto {
};
PaginationDto = __decorate([
    (0, graphql_1.InputType)()
], PaginationDto);
exports.PaginationDto = PaginationDto;


/***/ }),
/* 73 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectionModule = void 0;
const common_1 = __webpack_require__(2);
const connection_service_1 = __webpack_require__(74);
const connection_resolver_1 = __webpack_require__(76);
const typeorm_1 = __webpack_require__(8);
const common_2 = __webpack_require__(5);
const user_service_1 = __webpack_require__(42);
let ConnectionModule = class ConnectionModule {
};
ConnectionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([common_2.Connection, common_2.User])],
        providers: [connection_resolver_1.ConnectionResolver, connection_service_1.ConnectionService, user_service_1.UserService],
        exports: [typeorm_1.TypeOrmModule, connection_service_1.ConnectionService],
    })
], ConnectionModule);
exports.ConnectionModule = ConnectionModule;


/***/ }),
/* 74 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectionService = void 0;
const common_1 = __webpack_require__(2);
const common_2 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(12);
const typeorm_2 = __webpack_require__(8);
const connection_dto_1 = __webpack_require__(75);
let ConnectionService = class ConnectionService {
    constructor(connectionRepository) {
        this.connectionRepository = connectionRepository;
    }
    async findAll(params) {
        let where = {
            status: params.status,
        };
        if (params.connectionType === connection_dto_1.ConnectionType.FOLLOWER) {
            where['followingId'] = params.userId;
        }
        else if (params.connectionType === connection_dto_1.ConnectionType.FOLLOWING) {
            where['followerId'] = params.userId;
        }
        else {
            where = [
                { followingId: params.userId, status: params.status },
                { followerId: params.userId, status: params.status },
            ];
        }
        const [entries, total] = await this.connectionRepository.findAndCount({
            where,
            skip: params.page ? (params.page - 1) * params.limit : 0,
            take: params.limit,
            relations: ['following', 'follower'],
        });
        return {
            entries,
            total,
        };
    }
    async sendRequest({ followingId, followerId, }) {
        const request = await this.connectionRepository.findOne({
            where: {
                followingId,
                followerId,
            },
        });
        if (request) {
            if (request.status === common_2.ConnectionStatus.ACCEPTED) {
                throw new common_1.UnprocessableEntityException('You both already connected');
            }
            throw new common_1.UnprocessableEntityException('Connection request already exists');
        }
        return this.connectionRepository.create({ followingId, followerId }).save();
    }
    async acceptRequest(id) {
        const request = await this.connectionRepository.findOne({
            where: {
                id,
            },
        });
        if (request.status === common_2.ConnectionStatus.ACCEPTED) {
            throw new common_1.UnprocessableEntityException('Request already accepted');
        }
        if (!request) {
            throw new common_1.NotFoundException('Request does not exists');
        }
        request.status = common_2.ConnectionStatus.ACCEPTED;
        await request.save();
        return request;
    }
    async deleteRequest(id) {
        const request = await this.connectionRepository.findOne({
            where: {
                id,
            },
        });
        if (!request) {
            throw new common_1.NotFoundException('Request does not exists');
        }
        await request.remove();
        return 'Deleted successfully';
    }
    async isConnected(followerId, followingId) {
        return this.connectionRepository.findOne({
            where: [
                { followerId, followingId, status: common_2.ConnectionStatus.ACCEPTED },
                {
                    followerId: followingId,
                    followingId: followerId,
                    status: common_2.ConnectionStatus.ACCEPTED,
                },
            ],
        });
    }
};
ConnectionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(common_2.Connection)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object])
], ConnectionService);
exports.ConnectionService = ConnectionService;


/***/ }),
/* 75 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectionsResponse = exports.ConnectionType = void 0;
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(11);
var ConnectionType;
(function (ConnectionType) {
    ConnectionType["FOLLOWING"] = "FOLLOWING";
    ConnectionType["FOLLOWER"] = "FOLLOWER";
})(ConnectionType = exports.ConnectionType || (exports.ConnectionType = {}));
(0, graphql_1.registerEnumType)(ConnectionType, { name: 'ConnectionType' });
let ConnectionsResponse = class ConnectionsResponse {
};
__decorate([
    (0, graphql_1.Field)(() => [common_1.Connection]),
    __metadata("design:type", Array)
], ConnectionsResponse.prototype, "entries", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ConnectionsResponse.prototype, "total", void 0);
ConnectionsResponse = __decorate([
    (0, graphql_1.ObjectType)()
], ConnectionsResponse);
exports.ConnectionsResponse = ConnectionsResponse;


/***/ }),
/* 76 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectionResolver = void 0;
const graphql_1 = __webpack_require__(11);
const connection_service_1 = __webpack_require__(74);
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(2);
const connection_dto_1 = __webpack_require__(75);
const guards_1 = __webpack_require__(43);
let ConnectionResolver = class ConnectionResolver {
    constructor(connectionService) {
        this.connectionService = connectionService;
    }
    findAll(user, page, limit, searchText, status, connectionType) {
        return this.connectionService.findAll({
            page,
            limit,
            searchText,
            userId: user.id,
            status,
            connectionType,
        });
    }
    sendConnectionRequest(followingId, user) {
        return this.connectionService.sendRequest({
            followingId,
            followerId: user.id,
        });
    }
    acceptConnectionRequest(id) {
        return this.connectionService.acceptRequest(id);
    }
    deleteConnectionRequest(id) {
        return this.connectionService.deleteRequest(id);
    }
};
__decorate([
    (0, graphql_1.Query)(() => connection_dto_1.ConnectionsResponse, { name: 'connections' }),
    (0, common_2.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, common_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('page', { nullable: true, type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('limit', { nullable: true, type: () => graphql_1.Int })),
    __param(3, (0, graphql_1.Args)('searchText', { nullable: true })),
    __param(4, (0, graphql_1.Args)('status', { nullable: true, type: () => common_1.ConnectionStatus })),
    __param(5, (0, graphql_1.Args)('connectionType', { nullable: true, type: () => connection_dto_1.ConnectionType })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof common_1.User !== "undefined" && common_1.User) === "function" ? _b : Object, Number, Number, String, typeof (_c = typeof common_1.ConnectionStatus !== "undefined" && common_1.ConnectionStatus) === "function" ? _c : Object, typeof (_d = typeof connection_dto_1.ConnectionType !== "undefined" && connection_dto_1.ConnectionType) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], ConnectionResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Mutation)(() => common_1.Connection),
    (0, common_2.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('followingId', { type: () => graphql_1.ID })),
    __param(1, (0, common_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof common_1.User !== "undefined" && common_1.User) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], ConnectionResolver.prototype, "sendConnectionRequest", null);
__decorate([
    (0, graphql_1.Mutation)(() => common_1.Connection),
    (0, common_2.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConnectionResolver.prototype, "acceptConnectionRequest", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, common_2.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConnectionResolver.prototype, "deleteConnectionRequest", null);
ConnectionResolver = __decorate([
    (0, graphql_1.Resolver)(() => common_1.Connection),
    __metadata("design:paramtypes", [typeof (_a = typeof connection_service_1.ConnectionService !== "undefined" && connection_service_1.ConnectionService) === "function" ? _a : Object])
], ConnectionResolver);
exports.ConnectionResolver = ConnectionResolver;


/***/ }),
/* 77 */
/***/ ((module) => {

module.exports = require("joi");

/***/ }),
/* 78 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatModule = void 0;
const common_1 = __webpack_require__(2);
const chat_service_1 = __webpack_require__(79);
const chat_resolver_1 = __webpack_require__(80);
const typeorm_1 = __webpack_require__(8);
const common_2 = __webpack_require__(5);
const user_service_1 = __webpack_require__(42);
const user_module_1 = __webpack_require__(40);
const connection_service_1 = __webpack_require__(74);
const connection_module_1 = __webpack_require__(73);
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([common_2.Chat, common_2.Message]),
            user_module_1.UserModule,
            connection_module_1.ConnectionModule,
        ],
        providers: [
            chat_resolver_1.ChatResolver,
            chat_service_1.ChatService,
            user_service_1.UserService,
            connection_service_1.ConnectionService,
            common_2.Upload,
            common_2.AzureFilesService,
        ],
    })
], ChatModule);
exports.ChatModule = ChatModule;


/***/ }),
/* 79 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(8);
const common_2 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(12);
const user_service_1 = __webpack_require__(42);
const connection_service_1 = __webpack_require__(74);
let ChatService = class ChatService {
    constructor(chatRepository, messageRepository, userService, connectionService, azureFileService) {
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
        this.userService = userService;
        this.connectionService = connectionService;
        this.azureFileService = azureFileService;
    }
    async sendMessage(_a, user) {
        var { file } = _a, payload = __rest(_a, ["file"]);
        let chat = await this.chatRepository.findOne({
            where: [
                { senderId: user.id, receiverId: payload.receiverId },
                { senderId: payload.receiverId, receiverId: user.id },
            ],
            relations: ['sender', 'receiver'],
        });
        if (!chat) {
            const receiver = await this.userService.getUserById(payload.receiverId);
            chat = await this.chatRepository
                .create({ sender: user, receiver })
                .save();
        }
        else {
            if (chat.senderId === user.id) {
                const isConnected = await this.connectionService.isConnected(user.id, payload.receiverId);
                if (!isConnected) {
                    throw new common_1.NotAcceptableException('You cannot send another message before connecting with the user');
                }
            }
        }
        const message = await this.messageRepository
            .create({ message: payload.message, sender: user, chatId: chat.id })
            .save();
        if (file) {
            const fileurl = await this.azureFileService.singleUpload(file);
            message.attachment = fileurl;
            await message.save();
        }
        chat.lastMessage = message;
        await chat.save();
        const unread = await this.messageRepository.count({
            where: { chatId: chat.id, senderId: user.id, seen: false },
        });
        const findTotalUnseen = await this.findTotalUnseen(payload.receiverId);
        chat.unseen = unread;
        chat.totalUnseen = findTotalUnseen.unseen;
        return { message, chat };
    }
    async getChats(params) {
        const [entries, total] = await this.chatRepository.findAndCount({
            where: [{ senderId: params.userId }, { receiverId: params.userId }],
            skip: params.page ? (params.page - 1) * params.limit : 0,
            take: params.limit,
            relations: ['sender', 'receiver', 'lastMessage'],
            order: {
                updatedAt: 'DESC',
            },
        });
        return {
            entries,
            total,
        };
    }
    async getConversations({ limit, page, chatId, userId, participantId, }) {
        const where = {};
        if (chatId) {
            where.chatId = chatId;
        }
        else if (participantId) {
            const chat = await this.chatRepository.findOne({
                where: [
                    { senderId: userId, receiverId: participantId },
                    { senderId: participantId, receiverId: userId },
                ],
            });
            if (chat) {
                where.chatId = chat.id;
            }
        }
        else {
            return {
                entries: [],
                total: 0,
            };
        }
        const [entries, total] = await this.messageRepository.findAndCount({
            where,
            skip: page ? (page - 1) * limit : 0,
            take: limit,
            relations: ['sender'],
            order: { createdAt: 'DESC' },
        });
        return {
            entries,
            total,
        };
    }
    findOne(id) {
        return this.chatRepository.findOne({ where: { id } });
    }
    findTotalUnseen(userId) {
        return this.chatRepository
            .createQueryBuilder('chat')
            .where({ senderId: userId })
            .orWhere({ receiverId: userId })
            .loadRelationCountAndMap('chat.unseen', 'chat.conversations', 'message', (query) => query.andWhere(`message.seen = :seen`, { seen: false }))
            .getOne();
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(common_2.Chat)),
    __param(1, (0, typeorm_1.InjectRepository)(common_2.Message)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _c : Object, typeof (_d = typeof connection_service_1.ConnectionService !== "undefined" && connection_service_1.ConnectionService) === "function" ? _d : Object, typeof (_e = typeof common_2.AzureFilesService !== "undefined" && common_2.AzureFilesService) === "function" ? _e : Object])
], ChatService);
exports.ChatService = ChatService;


/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatResolver = void 0;
const graphql_1 = __webpack_require__(11);
const chat_service_1 = __webpack_require__(79);
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(2);
const guards_1 = __webpack_require__(43);
const create_chat_dto_1 = __webpack_require__(81);
const chat_dto_1 = __webpack_require__(82);
const message_dto_1 = __webpack_require__(83);
const graphql_subscriptions_1 = __webpack_require__(84);
const pubSub = new graphql_subscriptions_1.PubSub();
let ChatResolver = class ChatResolver {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async sendMessage(payload, user) {
        const { message, chat } = await this.chatService.sendMessage(payload, user);
        pubSub.publish('messageAdded', { messageAdded: message });
        pubSub.publish('chatAdded', { chatAdded: chat });
        return message;
    }
    findAllChat(user, page, limit, searchText) {
        return this.chatService.getChats({
            page,
            limit,
            searchText,
            userId: user.id,
        });
    }
    findAllConversations(user, chatId, participantId, page, limit, searchText) {
        return this.chatService.getConversations({
            page,
            limit,
            searchText,
            chatId,
            userId: user.id,
            participantId,
        });
    }
    messageAdded(chatId) {
        return pubSub.asyncIterator('messageAdded');
    }
    chatAdded(_userId) {
        return pubSub.asyncIterator('chatAdded');
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => common_1.Message),
    (0, common_2.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('payload')),
    __param(1, (0, common_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_chat_dto_1.CreateChatInput !== "undefined" && create_chat_dto_1.CreateChatInput) === "function" ? _b : Object, typeof (_c = typeof common_1.User !== "undefined" && common_1.User) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], ChatResolver.prototype, "sendMessage", null);
__decorate([
    (0, graphql_1.Query)(() => chat_dto_1.ChatsResponse, { name: 'chats' }),
    (0, common_2.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, common_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('page', { nullable: true, type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('limit', { nullable: true, type: () => graphql_1.Int })),
    __param(3, (0, graphql_1.Args)('searchText', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof common_1.User !== "undefined" && common_1.User) === "function" ? _d : Object, Number, Number, String]),
    __metadata("design:returntype", void 0)
], ChatResolver.prototype, "findAllChat", null);
__decorate([
    (0, graphql_1.Query)(() => message_dto_1.ConversationsResponse, { name: 'conversations' }),
    (0, common_2.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, common_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('chatId', { type: () => graphql_1.ID, nullable: true })),
    __param(2, (0, graphql_1.Args)('participantId', { type: () => graphql_1.ID, nullable: true })),
    __param(3, (0, graphql_1.Args)('page', { nullable: true, type: () => graphql_1.Int })),
    __param(4, (0, graphql_1.Args)('limit', { nullable: true, type: () => graphql_1.Int })),
    __param(5, (0, graphql_1.Args)('searchText', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof common_1.User !== "undefined" && common_1.User) === "function" ? _e : Object, String, String, Number, Number, String]),
    __metadata("design:returntype", void 0)
], ChatResolver.prototype, "findAllConversations", null);
__decorate([
    (0, graphql_1.Subscription)(() => common_1.Message, {
        filter: (payload, variables) => payload.messageAdded.chatId === variables.chatId,
    }),
    __param(0, (0, graphql_1.Args)('chatId', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatResolver.prototype, "messageAdded", null);
__decorate([
    (0, graphql_1.Subscription)(() => common_1.Chat, {
        filter: ({ chatAdded }, variables) => {
            Object.assign(chatAdded, {
                unseen: chatAdded.lastMessage.senderId !== variables.userId
                    ? chatAdded.unseen
                    : 0,
                totalUnseen: chatAdded.lastMessage.senderId !== variables.userId
                    ? chatAdded.totalUnseen
                    : 0,
            });
            return (chatAdded.receiverId === variables.userId ||
                chatAdded.senderId === variables.userId);
        },
    }),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatResolver.prototype, "chatAdded", null);
ChatResolver = __decorate([
    (0, graphql_1.Resolver)(() => common_1.Chat),
    __metadata("design:paramtypes", [typeof (_a = typeof chat_service_1.ChatService !== "undefined" && chat_service_1.ChatService) === "function" ? _a : Object])
], ChatResolver);
exports.ChatResolver = ChatResolver;


/***/ }),
/* 81 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateChatInput = void 0;
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(11);
let CreateChatInput = class CreateChatInput {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { description: 'Receiver ID (Optional)', nullable: true }),
    __metadata("design:type", String)
], CreateChatInput.prototype, "receiverId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateChatInput.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_1.Upload, { nullable: true }),
    __metadata("design:type", typeof (_a = typeof common_1.Upload !== "undefined" && common_1.Upload) === "function" ? _a : Object)
], CreateChatInput.prototype, "file", void 0);
CreateChatInput = __decorate([
    (0, graphql_1.InputType)()
], CreateChatInput);
exports.CreateChatInput = CreateChatInput;


/***/ }),
/* 82 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatsResponse = void 0;
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(11);
let ChatsResponse = class ChatsResponse {
};
__decorate([
    (0, graphql_1.Field)(() => [common_1.Chat]),
    __metadata("design:type", Array)
], ChatsResponse.prototype, "entries", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ChatsResponse.prototype, "total", void 0);
ChatsResponse = __decorate([
    (0, graphql_1.ObjectType)()
], ChatsResponse);
exports.ChatsResponse = ChatsResponse;


/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConversationsResponse = void 0;
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(11);
let ConversationsResponse = class ConversationsResponse {
};
__decorate([
    (0, graphql_1.Field)(() => [common_1.Message]),
    __metadata("design:type", Array)
], ConversationsResponse.prototype, "entries", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ConversationsResponse.prototype, "total", void 0);
ConversationsResponse = __decorate([
    (0, graphql_1.ObjectType)()
], ConversationsResponse);
exports.ConversationsResponse = ConversationsResponse;


/***/ }),
/* 84 */
/***/ ((module) => {

module.exports = require("graphql-subscriptions");

/***/ }),
/* 85 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractModule = void 0;
const common_1 = __webpack_require__(2);
const contract_service_1 = __webpack_require__(86);
const contract_resolver_1 = __webpack_require__(87);
const typeorm_1 = __webpack_require__(8);
const common_2 = __webpack_require__(5);
let ContractModule = class ContractModule {
};
ContractModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([common_2.Contract])],
        providers: [contract_resolver_1.ContractResolver, contract_service_1.ContractService],
        exports: [],
    })
], ContractModule);
exports.ContractModule = ContractModule;


/***/ }),
/* 86 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(8);
const common_2 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(12);
let ContractService = class ContractService {
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }
    async findAll(params) {
        const where = {};
        if (params.asContractor) {
            where['contractorId'] = params.userId;
        }
        else {
            where['helperId'] = params.userId;
        }
        const [entries, total] = await this.contractRepository.findAndCount({
            where,
            skip: params.page ? (params.page - 1) * params.limit : 0,
            take: params.limit,
            relations: ['gig', 'proposal', 'helper', 'contractor'],
        });
        return {
            entries,
            total,
        };
    }
    findOne(id) {
        return this.contractRepository.findOne({
            where: { id },
            relations: ['gig', 'proposal', 'helper', 'contractor'],
        });
    }
    update(_a) {
        var { id } = _a, payload = __rest(_a, ["id"]);
        return this.contractRepository.update(id, payload);
    }
    remove(id) {
        return this.contractRepository.delete(id);
    }
};
ContractService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(common_2.Contract)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ContractService);
exports.ContractService = ContractService;


/***/ }),
/* 87 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractResolver = void 0;
const graphql_1 = __webpack_require__(11);
const contract_service_1 = __webpack_require__(86);
const common_1 = __webpack_require__(5);
const get_contracts_dto_1 = __webpack_require__(88);
const common_2 = __webpack_require__(2);
const guards_1 = __webpack_require__(43);
const update_contract_input_1 = __webpack_require__(89);
const auth_decorator_1 = __webpack_require__(69);
let ContractResolver = class ContractResolver {
    constructor(contractService) {
        this.contractService = contractService;
    }
    findAll(user, page, limit, searchText, asContractor) {
        return this.contractService.findAll({
            page,
            limit,
            searchText,
            userId: user.id,
            asContractor,
        });
    }
    findOne(id) {
        return this.contractService.findOne(id);
    }
    contractUpdate(payload) {
        return this.contractService.update(payload);
    }
    contractRemove(id) {
        return this.contractService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Query)(() => get_contracts_dto_1.ContractsResponse, { name: 'contracts' }),
    (0, common_2.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, common_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('page', { nullable: true, type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('limit', { nullable: true, type: () => graphql_1.Int })),
    __param(3, (0, graphql_1.Args)('searchText', { nullable: true })),
    __param(4, (0, graphql_1.Args)('asContractor', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof common_1.User !== "undefined" && common_1.User) === "function" ? _b : Object, Number, Number, String, Boolean]),
    __metadata("design:returntype", void 0)
], ContractResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => common_1.Contract, { name: 'contract' }),
    (0, common_2.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContractResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => common_1.Contract),
    (0, common_2.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, auth_decorator_1.UseRoles)(common_1.UserRole.CONTRACTOR),
    __param(0, (0, graphql_1.Args)('payload')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof update_contract_input_1.UpdateContractInput !== "undefined" && update_contract_input_1.UpdateContractInput) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], ContractResolver.prototype, "contractUpdate", null);
__decorate([
    (0, graphql_1.Mutation)(() => common_1.Contract),
    (0, common_2.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, auth_decorator_1.UseRoles)(common_1.UserRole.CONTRACTOR),
    __param(0, (0, graphql_1.Args)('id', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContractResolver.prototype, "contractRemove", null);
ContractResolver = __decorate([
    (0, graphql_1.Resolver)(() => common_1.Contract),
    __metadata("design:paramtypes", [typeof (_a = typeof contract_service_1.ContractService !== "undefined" && contract_service_1.ContractService) === "function" ? _a : Object])
], ContractResolver);
exports.ContractResolver = ContractResolver;


/***/ }),
/* 88 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractsResponse = exports.GetContractsDto = void 0;
const common_1 = __webpack_require__(5);
const default_dto_1 = __webpack_require__(72);
const graphql_1 = __webpack_require__(11);
let GetContractsDto = class GetContractsDto extends default_dto_1.PaginationDto {
};
GetContractsDto = __decorate([
    (0, graphql_1.InputType)()
], GetContractsDto);
exports.GetContractsDto = GetContractsDto;
let ContractsResponse = class ContractsResponse {
};
__decorate([
    (0, graphql_1.Field)(() => [common_1.Contract]),
    __metadata("design:type", Array)
], ContractsResponse.prototype, "entries", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ContractsResponse.prototype, "total", void 0);
ContractsResponse = __decorate([
    (0, graphql_1.ObjectType)()
], ContractsResponse);
exports.ContractsResponse = ContractsResponse;


/***/ }),
/* 89 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateContractInput = void 0;
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(11);
let UpdateContractInput = class UpdateContractInput extends (0, graphql_1.PartialType)(common_1.Contract) {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], UpdateContractInput.prototype, "id", void 0);
UpdateContractInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateContractInput);
exports.UpdateContractInput = UpdateContractInput;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const cookieParser = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(3);
const app_module_1 = __webpack_require__(4);
const config_1 = __webpack_require__(7);
const graphql_upload_ts_1 = __webpack_require__(33);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(cookieParser());
    app.use((0, graphql_upload_ts_1.graphqlUploadExpress)({}));
    const configService = app.get(config_1.ConfigService);
    const logger = new common_1.Logger();
    const port = configService.get('PORT') || 3000;
    await app.listen(port);
    logger.verbose(`App running at port: ${port}`);
}
bootstrap();

})();

/******/ })()
;