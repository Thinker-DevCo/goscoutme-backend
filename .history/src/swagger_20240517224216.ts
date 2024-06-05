import * as fs from 'fs';
import * as path from 'path';
import { SwaggerObject } from 'swagger-ui-dist';
import { MetadataKeys } from './decorators/metadata.keys';
import { IRouter } from './decorators/types';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { getFromContainer } from 'class-validator';

import 'reflect-metadata';

const swaggerInfo = {
  openapi: '3.0.0',
  info: {
    title: 'Your API',
    version: '1.0.0',
    description: 'Your API description',
  },
  servers: [
    {
      url: 'http://localhost:8000',
    },
  ],
};

function extractMetadata() {
  const metadata = [];

  // Import your controller classes
  const controllerClasses = [
    // Import your controller classes here
    require('./useCases/Files/files.controller').FilesController,
    require('./useCases/prompts/prompts.controller').promptsController,
    require('./useCases/user/user.controller').UserController,
    require('./useCases/workflow/workflow.controller').WorkflowController,
  ];

  controllerClasses.forEach((controllerClass) => {
    const basePath = Reflect.getMetadata(MetadataKeys.BASE_PATH, controllerClass) || '';
    const version = Reflect.getMetadata(MetadataKeys.VERSION, controllerClass) || '';
    const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass) || [];

    routers.forEach(({ method, path, handlerName,requestBodyDto,responseBodyDto  }) => {
      const processedPath = path.startsWith('/') ? path : `/${path}`;
      const routePath = version ? `/api/v${version}${basePath}${processedPath}` : `${basePath}${processedPath}`;

      metadata.push({
        method,
        path: routePath,
        handlerName,
        requestBodyDto,
        responseBodyDto,
        controller: controllerClass.name,
        // Add other relevant metadata here
      });
    });
  });

  return metadata;
}
function generateSwaggerDocs(metadata) {
  const swaggerDoc: SwaggerObject = { ...swaggerInfo, paths: {} };

  metadata.forEach((route) => {
    const pathItem = {
      [route.method.toLowerCase()]: {
        summary: `${route.method} ${route.path}`,
        description: `${route.controller}.${route.handlerName}`,
        requestBody: route.requestBodyDto
          ? {
              description: 'Request body',
              required: true,
              content: {
                'application/json': {
                  schema: classValidatorToJSONSchema(route.requestBodyDto)
                },
              },
            }
          : {},
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: classValidatorToJSONSchema(route.responseBodyDto)
              },
            },
          },
        },
      },
    };
    const modelName = route.controller.replace('Controller', '').toUpperCase();
    swaggerDoc.paths[`${modelName}:${route.handlerName}`] = pathItem;
  });

  return swaggerDoc;
}
function generateSwaggerFile() {
  const metadata = extractMetadata();
  const swaggerDoc = generateSwaggerDocs(metadata);

  const swaggerFilePath = path.join(__dirname, 'swagger.json');
  fs.writeFileSync(swaggerFilePath, JSON.stringify(swaggerDoc, null, 2));
  console.log(`Swagger documentation generated at ${swaggerFilePath}`);
}

function classValidatorToJSONSchema(classType: any) {
  if(!classType) return null
  const metadatas = getFromContainer(classType) || [];

  // Convert class-validator decorators to JSON schema
  const schemas = validationMetadatasToSchemas(metadatas);

  // Get the schema for the class
  const schema = schemas[classType.name];

  return schema;
}




generateSwaggerFile();