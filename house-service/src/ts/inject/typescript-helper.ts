export type Class<T> = {
    new(...args): T;
};

export type AbstractClass<T> = Function & { prototype: T };