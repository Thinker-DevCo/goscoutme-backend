import { MetadataKeys } from "./metadata.keys";

const Controller = (basePath: string, version?: string): ClassDecorator => {
  return (target) => {
      Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
      if (version) {
          Reflect.defineMetadata(MetadataKeys.VERSION, version, target);
      }
  };
};

export default Controller