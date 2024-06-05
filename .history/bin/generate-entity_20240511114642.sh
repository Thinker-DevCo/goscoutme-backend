#!/bin/bash

# Check if module name is provided
if [[ -z $1 ]]; then
    echo "Error: Module name not provided."
    exit 1
fi

# Assign the module name from the first argument
module_name=$1

# Convert the module name to PascalCase for class names
class_name=$(echo "$module_name" | sed 's/\b\(\w\)/\u\1/g')

# Define the folder where the files will be created
use_cases_folder="./src/useCases/$module_name"

# Create the folder
mkdir -p "$use_cases_folder"

# Define file paths
controller_file="$use_cases_folder/$module_name.controller.ts"
service_file="$use_cases_folder/$module_name.service.ts"
route_file="$use_cases_folder/$module_name.route.ts"

# Create the files
touch "$controller_file"
touch "$service_file"
touch "$route_file"

# Populate controller file with full CRUD implementation
cat > "$controller_file" <<EOF
import { Controller, Post, Get, Put, Delete } from "../../decorators";
import { Request, Response } from "express";

@Controller('/$module_name', '1')
export class ${class_name}Controller {
  @Post("")
  async handleCreate${class_name}(request: Request, response: Response) {
    // Handle creation of a new resource
    return response.json({ message: "Create ${class_name}" });
  }

  @Get("")
  async handleRead${class_name}(request: Request, response: Response) {
    // Handle reading a resource
    return response.json({ message: "Read ${class_name}" });
  }

  @Put("/:id")
  async handleUpdate${class_name}(request: Request, response: Response) {
    // Handle updating a resource by ID
    return response.json({ message: "Update ${class_name}" });
  }

  @Delete("/:id")
  async handleDelete${class_name}(request: Request, response: Response) {
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
import { ${class_name}Controller } from "./${module_name}.controller";

@Route([${class_name}Controller])
export class ${class_name}Routes {
  // Add route logic here if needed
}
EOF

echo "Files for module '$module_name' have been generated successfully in the '$use_cases_folder' folder."
