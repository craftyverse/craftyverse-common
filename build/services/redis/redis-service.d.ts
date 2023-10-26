import Redis from "ioredis";
export declare const redisClient: {
    getClient: (config?: {
        host: string;
        port: number;
        password: string;
    } | undefined) => Redis;
    get: (key: string) => Promise<string | null>;
    set: (key: string, value: any) => void;
    ping: () => Promise<void>;
    quit: () => Promise<"OK">;
    remove: (key: string) => Promise<number>;
};
