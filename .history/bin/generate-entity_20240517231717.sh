#!/bin/bash

# Check if module name is provided
if [[ -z $1 ]]; then
  echo "Error: Module name not provided."
  exit 1
fi

# Assign the module name from the first argument
module_name=$1

# Convert the module name to PascalCase for class names
class_name=$(echo "$module_name" | sed 's/\b\(\\w\)/\u\1/g')

# Convert the first letter of the module name to uppercase
module_name_capitalized=$(echo "$module_name" | sed 's/\b\(.\)/\u\1/g')

# Define the folder where the files will be created
use_cases_folder="./src/useCases/$module_name_capitalized"

# Create the folder
mkdir -p "$use_cases_folder"

# Define file paths
controller_file="$use_cases_folder/${module_name_capitalized}.controller.ts"
service_file="$use_cases_folder/${module_name_capitalized}.service.ts"
route_file="$use_cases_folder/${module_name_capitalized}.route.ts"
dto_folder="$use_cases_folder/dto"
create_dto_file="$dto_folder/Create${class_name}.dto.ts"
update_dto_file="$dto_folder/Update${class_name}.dto.ts"
dto_index_file="$dto_folder/index.ts"

# Create the files
touch "$controller_file"
touch "$service_file"
touch "$route_file"
mkdir -p "$dto_folder"
touch "$create_dto_file"
touch "$update_dto_file"
touch "$dto_index_file"

# Populate controller file with full CRUD implementation
cat > "$controller_file" <<EOF
import { Controller, Post, Get, Put, Delete } from "../../decorators";
import { Request, Response } from "express";
import { Create${class_name}Dto, Update${class_name}Dto } from "./dto";

@Controller('/$module_name_capitalized', '1')
export class ${class_name}Controller {
  @Post("")
  async handleCreate${class_name}(request: Request<{}, {}, Create${class_name}Dto>, response: Response) {
    // Handle creation of a new resource
    return response.json({ message: "Create ${class_name}" });
  }

  @Get("")
  async handleRead${class_name}(request: Request, response: Response) {
    // Handle reading a resource
    return response.json({ message: "Read ${class_name}" });
  }

  @Put("/:id")
  async handleUpdate${class_name}(request: Request<{id: string}, {}, Update${class_name}Dto>, response: Response) {
    // Handle updating a resource by ID
    return response.json({ message: "Update ${class_name}" });
  }

  @Delete("/:id")
  async handleDelete${class_name}(request: Request<{id: string}>, response: Response) {
    // Handle deleting a resource by ID
    return response.json({ message: "Delete ${class_name}" });
  }
}
EOF

# Populate service file
cat > "$service_file" <<EOF
class ${class_name}UseCase {
  async executeCreate${class_name}() {
    // Implement the create use case logic here
  }

  async executeRead${class_name}() {
    // Implement the read use case logic here
  }

  async executeUpdate${class_name}() {
    // Implement the update use case logic here
  }

  async executeDelete${class_name}() {
    // Implement the delete use case logic here
  }
}

export { ${class_name}UseCase };
EOF

# Populate route file
cat > "$route_file" <<EOF
import { Route } from "../../decorators/module.decorator";
import { ${class_name}Controller } from "./${module_name_capitalized}.controller";

@Route([${class_name}Controller])
export class ${class_name}Routes {
  // Add route logic here if needed
}
EOF

# Populate create DTO file
cat > "$create_dto_file" <<EOF
import { IsNotEmpty, IsString } from 'class-validator';

export class Create${class_name}Dto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // Add other properties as needed
}
EOF

# Populate update DTO file
cat > "$update_dto_file" <<EOF
import { Create${class_name}Dto } from "./Create${class_name}.dto";

type Create${class_name}DtoPartial = Partial<Create${class_name}Dto>
export class Update${class_name}Dto implements Create${class_name}DtoPartial {}
EOF

# Populate DTO index file
cat > "$dto_index_file" <<EOF
import { Create${class_name}Dto } from "./Create${class_name}.dto";
import { Update${class_name}Dto } from "./Update${class_name}.dto";

export { Create${class_name}Dto, Update${class_name}Dto }
EOF

echo "Files for module '${module_name_capitalized}' have been generated successfully in the '${use_cases_folder}' folder."