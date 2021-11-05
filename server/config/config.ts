export interface Config {
    port: string;
    coinCapURI: string;
}

export const initConfig = (): Config => {
    return { port: "8080", coinCapURI: "https://api.coincap.io/v2/" };
};