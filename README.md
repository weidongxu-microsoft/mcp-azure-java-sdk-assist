# MCP Server in JavaScript

A Model Context Protocol (MCP) server implementation using JavaScript and the official MCP SDK.

## Overview

This project demonstrates how to build an MCP server that can provide tools and resources to AI assistants. The Model Context Protocol enables secure, standardized connections between AI applications and external data sources.

## Features

This MCP server includes the following tools:

- **azure-java-sdk-code-samples-mcp-server** - Get readme.md for Azure Java SDK, which includes introduction, key concepts, and code samples

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

## Installation

1. Clone or download this project
2. Install dependencies:

```bash
npm install
```

## Usage

### Running the Server

Start the MCP server:

```bash
npm start
```

For development with debugging:

```bash
npm run dev
```

Or press **F5** in VS Code to start debugging.

### Connecting to AI Assistants

This MCP server can be connected to various AI assistants that support the Model Context Protocol:

1. **Claude Desktop** - See `MCP_CONFIG.md` for configuration details
2. **Continue.dev** - VS Code extension that supports MCP
3. **Other MCP clients** - Any client that supports stdio transport

### Testing the Server

Run the validation script to ensure everything is working:

```bash
node validate.js
```

### Available VS Code Tasks

- **Run MCP Server** - Starts the server normally
- **Debug MCP Server** - Starts with Node.js inspector for debugging

## Development

### Project Structure

```
├── index.js                     # Main MCP server implementation
├── package.json                 # Project configuration
├── .github/
│   └── copilot-instructions.md  # Copilot customization
└── README.md                    # This file
```

### Adding New Tools

To add a new tool:

1. Add the tool definition in the `ListToolsRequestSchema` handler
2. Implement the tool logic in the `CallToolRequestSchema` handler
3. Include proper input validation and error handling

### Error Handling

The server uses `McpError` for proper error responses:

- `ErrorCode.InvalidRequest` - For invalid parameters
- `ErrorCode.MethodNotFound` - For unknown tools
- `ErrorCode.InternalError` - For unexpected errors

## MCP Protocol

This server implements the Model Context Protocol specification. For more information about MCP:

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification](https://spec.modelcontextprotocol.io/)

## License

ISC License
