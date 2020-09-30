export declare const projectRoot: string;
export declare const watchFolders: string[];
export declare namespace resolver {
    export const blacklistRE: any;
    export const extraNodeModules: {};
}
export declare namespace transformer {
    export function getTransformOptions(): Promise<{
        transform: {
            experimentalImportSupport: boolean;
            inlineRequires: boolean;
        };
    }>;
}
