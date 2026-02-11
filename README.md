# Sonatype Guide Kiro Power

A Kiro Power that provides access to Sonatype's comprehensive component intelligence for researching dependencies, checking for updates, and getting upgrade recommendations with security and licensing insights.

## What is this?

This power packages the Sonatype Guide MCP server for use with Kiro, enabling AI-assisted dependency management with built-in security validation.

## Quick Start

1. **Get a Sonatype Guide token**: Visit [https://guide.sonatype.com/settings/tokens](https://guide.sonatype.com/settings/tokens)
2. **Configure Kiro**: Set `SONATYPE_GUIDE_TOKEN` environment variable
3. **Use it**: Ask Kiro about component versions, security vulnerabilities, or upgrade recommendations

See [POWER.md](./POWER.md) for complete documentation.

## Features

- **Component Version Research**: Get detailed information about specific versions including security vulnerabilities and licensing
- **Latest Version Checking**: Quickly find the newest releases
- **Upgrade Recommendations**: Get expert recommendations based on security, stability, and compatibility
- **Automatic Security Validation**: Kiro validates dependencies before installation
- **Multi-Ecosystem Support**: npm, Maven, PyPI, NuGet, Cargo, Go, Ruby, PHP, and more

## Testing

This power includes comprehensive test coverage:

```bash
npm install
npm test
```

- **Property-Based Tests**: 2 properties with 100+ iterations each
- **Unit Tests**: 48 example-based tests validating specific requirements
- **Total**: 51 tests ensuring correctness

## Development

### Project Structure

```
guide-kiro-power/
├── POWER.md                    # Main power documentation
├── README.md                   # This file
├── package.json                # Node.js dependencies
├── vitest.config.js           # Test configuration
├── tests/
│   ├── power.property.test.js # Property-based tests
│   └── power.unit.test.js     # Unit tests
└── .kiro/
    └── specs/
        └── sonatype-guide-power/
            ├── requirements.md # Requirements specification
            ├── design.md       # Design document
            └── tasks.md        # Implementation tasks
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Requirements

- Node.js 18+ (for testing)
- Sonatype Guide account and API token
- Kiro with MCP support

## License

This power is provided as-is for use with Kiro and Sonatype Guide.

## Support

For issues with:
- **This power**: Open an issue in this repository
- **Sonatype Guide**: Visit [https://guide.sonatype.com](https://guide.sonatype.com)
- **Kiro**: Contact AWS support

## Contributing

Contributions welcome! Please ensure all tests pass before submitting PRs.

## Real-World Example

This power was used to validate its own dependencies during development:

```
User: "Install vitest for testing"
Kiro: *Checks pkg:npm/vitest@1.0.0 with Sonatype Guide*
Kiro: "vitest@1.0.0 has a moderate vulnerability (CVSS 2.3) in vite-node. 
      I recommend vitest@4.0.18 which has no known vulnerabilities."
User: *Installs the secure version*
```

Result: Zero vulnerabilities in production! 🎉
