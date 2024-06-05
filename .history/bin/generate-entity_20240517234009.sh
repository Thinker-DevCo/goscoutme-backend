#!/bin/bash

# Check if module name is provided
if [[ -z $1 ]]; then
  echo "Error: Module name not provided."
  exit 1
fi

# Assign the module name from the first argument
module_name=$1

# Convert the module name to PascalCase for class names
class_name=$(echo "$module_name" | sed -r 's/(^|-)(\w)/\U\2/g')

# Convert the first letter of the module name to uppercase
module_name_capitalized=$(echo "${module_name:0:1}" | tr '[:lower:]' '[:upper:]')$(echo "${module_name:1}" | tr '[:upper:]' '[:lower:]')

# Define the folder where the files will be created
use_cases_folder="./src/useCases/$module_name_capitalized"

# Create the folder
mkdir -p "$use_cases_folder"

# Define file paths
controller_file="$use_cases_folder/${class_name}.controller.ts"
service_file="$use_cases_folder/${class_name}.service.ts"
route_file="$use_cases_folder/${class_name}.route.ts"
dto_folder="$use_cases_folder/dto"
create_dto_file="$dto_folder/Create${module_name_capitalized}.dto.ts"
update_dto_file="$dto_folder/Update${module_name_capitalized}.dto.ts"
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
import { Create${module_name_capitalized}Dto, Update${module_name_capitalized}Dto } from "./dto";

@Controller('/$class_name', '1')
export class ${module_name_capitalized}Controller {
  @Post("")
  async handleCreate${class_name}(request: Request<{}, {}, Create${module_name_capitalized}Dto>, response: Response) {
    // Handle creation of a new resource
    return response.json({ message: "Create ${class_name}" });
  }

  @Get("")
  async handleRead${module_name_capitalized}(request: Request, response: Response) {
    // Handle reading a resource
    return response.json({ message: "Read ${class_name}" });
  }

  @Put("/:id")
  async handleUpdate${module_name_capitalized}(request: Request<{id: string}, {}, Update${module_name_capitalized}Dto>, response: Response) {
    // Handle updating a resource by ID
    return response.json({ message: "Update ${class_name}" });
  }

  @Delete("/:id")
  async handleDelete${module_name_capitalized}(request: Request<{id: string}>, response: Response) {
    // Handle deleting a resource by ID
    return response.json({ message: "Delete ${class_name}" });
  }
}
EOF

# Populate service file
cat > "$service_file" <<EOF
class ${module_name_capitalized}UseCase {
  async executeCreate${module_name_capitalized}() {
    // Implement the create use case logic here
  }

  async executeRead${module_name_capitalized}() {
    // Implement the read use case logic here
  }

  async executeUpdate${module_name_capitalized}() {
    // Implement the update use case logic here
  }

  async executeDelete${module_name_capitalized}() {
    // Implement the delete use case logic here
  }
}

export { ${module_name_capitalized}UseCase };
EOF

# Populate route file
cat > "$route_file" <<EOF
import { Route } from "../../decorators/module.decorator";
import { ${module_name_capitalized}Controller } from "./${class_name}.controller";

@Route([${class_name}Controller])
export class ${module_name_capitalized}Routes {
  // Add route logic here if needed
}
EOF

# Populate create DTO file
cat > "$create_dto_file" <<EOF
import { IsNotEmpty, IsString } from 'class-validator';

export class Create${module_name_capitalized}Dto {

  // Add other properties as needed
}
EOF

# Populate update DTO file
cat > "$update_dto_file" <<EOF
import { Create${module_name_capitalized}Dto } from "./Create${module_name_capitalized}.dto";

type Create${module_name_capitalized}DtoPartial = Partial<Create${module_name_capitalized}Dto>
export class Update${module_name_capitalized}Dto implements Create${module_name_capitalized}DtoPartial {}
EOF

# Populate DTO index file
cat > "$dto_index_file" <<EOF
import { Create${module_name_capitalized}Dto } from "./Create${module_name_capitalized}.dto";
import { Update${module_name_capitalized}Dto } from "./Update${module_name_capitalized}.dto";

export { Create${module_name_capitalized}Dto, Update${module_name_capitalized}Dto }
EOF

echo "Files for module '${module_name_capitalized}' have been generated successfully in the '${use_cases_folder}' folder."
