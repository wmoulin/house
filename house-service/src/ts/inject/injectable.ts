import "reflect-metadata";
import { Injector, INJECT_METADATA_KEY } from "./injector";
import { Class, AbstractClass } from "./typescript-helper";

declare var Reflect: any;

/**
 * Decorateur de classe pour l'enregistrer dans l'injecteur que si les côté correspond et permet d'injecter
 * des valeurs dans le constructeur
 * @param  key {any} clé de stockage
 * */
export function injectable(key:Class<any> | AbstractClass<any> | string, scope:Scope=Scope.VALUE) {
    return function <T extends {new(...args:any[]):{}}>(constructor:T) {
        let injectParameters: {index: number, type: any}[] = Reflect.getOwnMetadata(INJECT_METADATA_KEY, constructor);
        let newConstructor = constructor;
        if (injectParameters) {
            newConstructor = class extends constructor {
                constructor(...args:any[]) {
                    injectParameters.forEach((injectParameter) => {
                        args[injectParameter.index] =  Injector.getRegistered(injectParameter.type || args[injectParameter.index]);
                    });
                    super(...args);
                }
            };
        } 
        
        if (key) {
            Injector.register(key, newConstructor, scope );
        }

        return newConstructor;
    }
};

export enum Scope {
    PROTOTYPE,
    SINGLETON,
    VALUE
};