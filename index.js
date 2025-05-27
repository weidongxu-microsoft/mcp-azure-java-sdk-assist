#!/usr/bin/env node

/**
 * MCP Server Example
 * A basic Model Context Protocol server implementation in JavaScript
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import fetch from "node-fetch";

class McpServer {
  constructor() {
    this.server = new Server(
      {
        name: "azure-java-sdk-code-samples-mcp-server",
        version: "0.1.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "azure_java_sdk_code_samples",
            description: "Get code samples for Azure Java SDK, the package name usually starts with 'azure-'",
            inputSchema: {
              type: "object",
              properties: {
                package: {
                  type: "string",
                  description: "package name of the Azure SDK, for example: 'azure-ai-inference'",
                },
              },
              required: ["package"],
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "azure_java_sdk_code_samples":
            const { package: packageName } = args;
            if (!packageName) {
              throw new McpError(
                ErrorCode.InvalidRequest,
                "Package name is required"
              );
            }
            const groupId = "com.azure";
            const groupPath = groupId.replace(/\./g, "/");
            const artifactId = packageName;
            
            // Get latest version
            const artifactUrl = "https://repo1.maven.org/maven2/" + groupPath + "/" + artifactId;
            let response = await fetch(artifactUrl + "/maven-metadata.xml");
            const listData = await response.text();
            
            // Extract version from <latest>version</latest> tag
            const versionRegex = /<latest>(.*?)<\/latest>/;
            const versionMatch = listData.match(versionRegex);
            const latestVersion = versionMatch[1];

            // Get the readme.md of the SDK
            const readmeUrl = artifactUrl + "/" + latestVersion + "/" + artifactId + "-" + latestVersion + "-readme.md";
            response = await fetch(readmeUrl);
            const readmeData = await response.text();

            return {
              content: [
                {
                  type: "text",
                  text: readmeData,
                },
              ],
            };

          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Unknown tool: ${name}`
            );
        }
      } catch (error) {
        if (error instanceof McpError) {
          throw error;
        }
        throw new McpError(
          ErrorCode.InternalError,
          `Error executing tool ${name}: ${error.message}`
        );
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("MCP Server running on stdio");
  }
}

// Start the server
const server = new McpServer();
server.run().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
