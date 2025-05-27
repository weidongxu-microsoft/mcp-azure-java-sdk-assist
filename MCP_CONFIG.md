# MCP Server Configuration Examples

This document shows how to configure various AI assistants to use your MCP server.

## Claude Desktop Configuration

Add this to your Claude Desktop configuration file:

### Windows
Location: `%APPDATA%\Claude\claude_desktop_config.json`

### macOS
Location: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "sdk-ai-mcp": {
      "command": "node",
      "args": ["C:\\path\\to\\your\\project\\index.js"],
      "env": {}
    }
  }
}
```

## Continue.dev Configuration

Add this to your Continue configuration:

```json
{
  "mcpServers": [
    {
      "name": "sdk-ai-mcp",
      "command": "node",
      "args": ["./index.js"],
      "cwd": "/path/to/your/project"
    }
  ]
}
```

## Generic MCP Client Configuration

For any MCP-compatible client:

- **Command**: `node`
- **Arguments**: `["index.js"]`
- **Working Directory**: Path to this project
- **Communication**: stdio (standard input/output)

## Testing the Connection

1. Start your MCP client with the configuration above
2. The server should automatically connect via stdio
3. You can then use the available tools:
   - `echo` - Echo back text
   - `get_time` - Get current time
   - `calculate` - Perform arithmetic

## Environment Variables

You can set these environment variables for additional configuration:

- `NODE_ENV` - Set to "development" for debug logging
- `MCP_SERVER_NAME` - Override the server name (default: "example-mcp-server")

## Troubleshooting

If the connection fails:

1. Check that Node.js is installed and accessible
2. Verify the path to `index.js` is correct
3. Ensure the MCP client supports stdio transport
4. Check the console output for error messages
