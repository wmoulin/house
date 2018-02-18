import { Class, AbstractClass } from "./typescript-helper";
import { Scope } from "./injectable";
import * as _ from "lodash";

const ID_NAME = "__injectId__";

export const INJECT_METADATA_KEY = "injectParameters";

export class Injector {

    private static registry: {[key: string]: any} = {};

    /**
     * Retourne la classe enregistrée pour une clé donnée
     * @param  key {any} clé de stockage
     * @returns La valeur stockée
     * */
    static getRegistered(key:Class<any> | AbstractClass<any> | string): any {

        let id = key;
        
        if (!_.isString(key)) {
            id = key[ID_NAME];
        }
        
        return Injector.registry[id as string] && Injector.registry[id as string]
    }defineProperty

    /**
     * Suppression la classe enregistrée pour une clé donnée
     * @param  key {any} clé de stockage
     * */
    static removeRegistered<T>(key:Class<any> | AbstractClass<any> | string): void {
        let id = key;
        
        if (!_.isString(key)) {
            id = key[ID_NAME];
        }

        if (!id) {
            throw new Error("No explicit id passed or on key !");
        }
        
        delete Injector.registry[id as string];
    }

    /**
     * Enregistre une classe suivant une clé
     * @param  key {any} clé de stockageutils
     * @returns La valeur stockée
     * */
    static register(key:Class<any> | AbstractClass<any> | string, value: any, scope:Scope=Scope.VALUE) {
        
        let id = key;
        
        if (!_.isString(key)) {
            id = key[ID_NAME];
        }

        if (!id) {
            id = key[ID_NAME] = _.uniqueId();
        }
        
        let registered = Injector.registry[id as string] && Injector.registry[id as string];
        if (registered) {
            throw new Error("Injected value allreay define for this key !");
        }

        registered = Injector.registry[id as string];
        if (!registered) {
            Injector.registry[id as string] = {};
        }
        try {
            switch(scope) {
                case Scope.VALUE:
                    Injector.registry[id as string] = value;
                    break;
                case Scope.SINGLETON:
                    Injector.registry[id as string] = new value();
                    break;
                case Scope.PROTOTYPE:
                    console.log("3", new value());
                    Object.defineProperty(Injector.registry, id as string, {
                        get : () => { return new value(); }, configurable: true})
                    break;
            }
        } catch (e) {
            throw new Error("Error on save value to inject");
        }
    }

}