export class ObjectHelper {
  public static deleteUndefinedProperties(object: any): any {
    if (typeof object !== 'object') return object;
    Object.getOwnPropertyNames(object).forEach(key => {
      if (object[key] === undefined) {
        delete object[key];
      }
    });
    return object;
  }

  public static empty(object: any): boolean {
    if (typeof object !== 'object') return true;
    return !(Object.getOwnPropertyNames(object)?.length > 0 ?? false);
  }
}
