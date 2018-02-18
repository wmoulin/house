import "reflect-metadata";
import { Injector, INJECT_METADATA_KEY } from "./injector";
import { Class, AbstractClass } from "./typescript-helper";

declare var Reflect: any;

/**
 * Decorateur de paramètre pour l'injecter suivant le côté où le code est ecécuté
 * @param  key {any} clé de stockage
 * @param  side {Side} complément de clé correspondant au côté d'exécution (Client ou Serveur)
 * */
export function inject(key:Class<any> | AbstractClass<any> | string) {
    return function(target: Object, propertyKey: string | symbol, parameterIndex: number) {
        let injectParameters: {index: number, type: any}[] = Reflect.getOwnMetadata(INJECT_METADATA_KEY, target, propertyKey) || [];
        injectParameters.push({index: parameterIndex, type: key});
        Reflect.defineMetadata(INJECT_METADATA_KEY, injectParameters, target, propertyKey);
    };
};


