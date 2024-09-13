export interface Listeners {
    Register: () => void;
    Unregister: () => void;

    [key: string]: any;
};