<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# MCP Server Project Instructions

This is a Model Context Protocol (MCP) server project built with JavaScript. The MCP allows AI assistants to securely access external resources and tools.

## Key Guidelines:

- Use ES modules syntax (import/export) as this project is configured with `"type": "module"`
- Follow the MCP protocol specifications when implementing new tools or handlers
- All tools should have proper input validation and error handling
- Use the `@modelcontextprotocol/sdk` for MCP-related functionality
- Tool responses should include proper content formatting with type and text fields
- Handle errors using McpError with appropriate error codes

## Resources:

You can find more info and examples at https://modelcontextprotocol.io/llms-full.txt

## Project Structure:

- `index.js` - Main MCP server implementation
- `package.json` - Project configuration with ES modules support
- Tools are defined in the ListToolsRequestSchema handler
- Tool execution logic is in the CallToolRequestSchema handler
