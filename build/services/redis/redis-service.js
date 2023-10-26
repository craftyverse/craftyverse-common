"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
exports.redisClient = (() => {
    let client;
    const getClient = (config) => {
        if (!client) {
            client = new ioredis_1.default({
                host: (config === null || config === void 0 ? void 0 : config.host) ? config.host : "craftyverse-location-redis-cache",
                port: (config === null || config === void 0 ? void 0 : config.port) ? config.port : 6379,
                password: (config === null || config === void 0 ? void 0 : config.password)
                    ? config.password
                    : process.env.REDIS_PASSWORD,
            });
        }
        return client;
    };
    const set = (key, value) => {
        const client = getClient();
        client.set(key, JSON.stringify(value));
    };
    const get = (key) => __awaiter(void 0, void 0, void 0, function* () {
        const client = getClient();
        const value = yield client.get(key);
        return value;
    });
    const ping = () => __awaiter(void 0, void 0, void 0, function* () {
        const client = getClient();
        try {
            const result = yield client.ping();
            if (result === "PONG") {
                console.log("Connected to Redis");
            }
            else {
                console.log("Failed to connect to Redis");
            }
        }
        catch (err) {
            console.log("Failed to connect to Redis");
        }
    });
    const quit = () => __awaiter(void 0, void 0, void 0, function* () {
        const client = getClient();
        return yield client.quit();
    });
    const remove = (key) => {
        const client = getClient();
        return client.del(key);
    };
    return {
        getClient,
        get,
        set,
        ping,
        quit,
        remove,
    };
})();
