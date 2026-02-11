# Requirements Document

## Introduction

The Sonatype Guide Kiro Power packages the Sonatype Guide MCP server to help developers research component versions, check for latest releases, and get upgrade recommendations. This power enables on-demand access to Sonatype's comprehensive component intelligence without overloading the MCP context.

## Glossary

- **Power**: A package containing an MCP server, documentation (POWER.md), and optional steering files that can be activated on-demand in Kiro
- **MCP_Server**: Model Context Protocol server that provides tools for AI assistants
- **Sonatype_Guide**: Sonatype's service providing component intelligence, security data, and licensing information
- **Component**: A software dependency or library (e.g., npm package, Maven artifact)
- **Bearer_Token**: Authentication token generated from Sonatype Guide settings
- **Frontmatter**: YAML metadata at the beginning of POWER.md defining power configuration
- **Steering_Instructions**: Guidelines that direct how Kiro should use the power's tools

## Requirements

### Requirement 1: Power Documentation Structure

**User Story:** As a Kiro user, I want comprehensive documentation for the Sonatype Guide power, so that I can understand how to set it up and use it effectively.

#### Acceptance Criteria

1. THE Power SHALL include a POWER.md file with frontmatter, onboarding instructions, and steering instructions
2. WHEN the POWER.md file is created, THE Power SHALL include frontmatter with name, description, keywords, and MCP server configuration
3. THE Power SHALL include onboarding instructions that explain how to obtain a Bearer_Token from https://guide.sonatype.com/settings/tokens
4. THE Power SHALL include onboarding instructions that explain how to verify the setup is working correctly
5. THE Power SHALL include steering instructions that describe when and how to use each of the three tools

### Requirement 2: MCP Server Configuration

**User Story:** As a Kiro user, I want the power to automatically configure the Sonatype Guide MCP server, so that I don't have to manually set up the connection.

#### Acceptance Criteria

1. THE Power SHALL configure the MCP_Server endpoint as https://mcp.guide.sonatype.com/mcp
2. THE Power SHALL specify that authentication requires a Bearer_Token in the authorization header
3. THE Power SHALL include configuration that allows Kiro to auto-register the MCP_Server
4. THE Power SHALL document that users must provide their own Bearer_Token for authentication

### Requirement 3: Tool Documentation - Get Component Version

**User Story:** As a developer, I want to understand how to use the getComponentVersion tool, so that I can research specific component versions.

#### Acceptance Criteria

1. THE Power SHALL document the getComponentVersion tool with its purpose and parameters
2. THE Power SHALL explain that getComponentVersion retrieves detailed information about a specific component version
3. THE Power SHALL document that getComponentVersion returns security vulnerabilities, licensing information, and metadata
4. THE Power SHALL provide examples of when to use getComponentVersion (e.g., evaluating a specific version before adoption)

### Requirement 4: Tool Documentation - Get Latest Component Version

**User Story:** As a developer, I want to understand how to use the getLatestComponentVersion tool, so that I can check for the newest releases.

#### Acceptance Criteria

1. THE Power SHALL document the getLatestComponentVersion tool with its purpose and parameters
2. THE Power SHALL explain that getLatestComponentVersion retrieves information about the most recent version of a component
3. THE Power SHALL provide examples of when to use getLatestComponentVersion (e.g., checking if updates are available)

### Requirement 5: Tool Documentation - Get Recommended Component Versions

**User Story:** As a developer, I want to understand how to use the getRecommendedComponentVersions tool, so that I can make informed upgrade decisions.

#### Acceptance Criteria

1. THE Power SHALL document the getRecommendedComponentVersions tool with its purpose and parameters
2. THE Power SHALL explain that getRecommendedComponentVersions provides Sonatype's recommended versions for upgrades or new installations
3. THE Power SHALL document that recommendations are based on security, stability, and compatibility data
4. THE Power SHALL provide examples of when to use getRecommendedComponentVersions (e.g., planning dependency upgrades)

### Requirement 6: Power Activation Keywords

**User Story:** As a Kiro user, I want the power to activate automatically when I mention relevant topics, so that I don't have to manually enable it.

#### Acceptance Criteria

1. THE Power SHALL include keywords related to component research (e.g., "component", "dependency", "dependencies", "version", "versions", "artifact", "library", "libraries")
2. THE Power SHALL include keywords related to Sonatype services (e.g., "sonatype", "nexus")
3. THE Power SHALL include keywords related to security and licensing (e.g., "vulnerability", "vulnerabilities", "license", "licensing", "security", "cve", "supply chain")
4. THE Power SHALL include keywords related to package management (e.g., "npm", "maven", "upgrade", "package", "packages", "outdated", "update", "patch", "pypi", "nuget", "gradle", "pom", "cargo", "rust", "cocoapods", "swift", "composer", "php", "conan", "conda", "cran", "alpine", "bower", "debian", "drupal", "rpm", "rubygems", "ruby", "golang", "go")

### Requirement 7: Workflow Guidance

**User Story:** As a developer, I want clear workflows for common tasks, so that I can efficiently use the power for my use cases.

#### Acceptance Criteria

1. THE Power SHALL provide a workflow for researching a specific component version before adoption
2. THE Power SHALL provide a workflow for checking if a component has updates available
3. THE Power SHALL provide a workflow for planning dependency upgrades with recommendations
4. THE Power SHALL provide a workflow for evaluating component security and compliance

### Requirement 8: Setup Verification

**User Story:** As a Kiro user, I want to verify that my setup is working correctly, so that I can troubleshoot authentication issues.

#### Acceptance Criteria

1. THE Power SHALL include instructions for testing the connection with a simple query
2. THE Power SHALL document common authentication errors and their solutions
3. THE Power SHALL explain how to regenerate a Bearer_Token if authentication fails
4. WHEN authentication fails, THE Power SHALL guide users to check their token configuration

### Requirement 9: Power Metadata

**User Story:** As a power creator, I want complete metadata in the frontmatter, so that the power can be properly registered and discovered in Kiro.

#### Acceptance Criteria

1. THE Power SHALL include a descriptive name in the frontmatter
2. THE Power SHALL include a clear description explaining the power's purpose
3. THE Power SHALL include relevant keywords for power activation
4. THE Power SHALL include the complete MCP server configuration in the frontmatter
5. THE Power SHALL follow the Kiro power frontmatter schema

### Requirement 10: Best Practices and Guidelines

**User Story:** As a developer, I want best practices for using the Sonatype Guide tools, so that I can use them effectively and efficiently.

#### Acceptance Criteria

1. THE Power SHALL recommend starting with getRecommendedComponentVersions for upgrade decisions
2. THE Power SHALL recommend using getLatestComponentVersion to check for updates
3. THE Power SHALL recommend using getComponentVersion when detailed analysis of a specific version is needed
4. THE Power SHALL advise users to consider security vulnerabilities and licensing in their decisions
