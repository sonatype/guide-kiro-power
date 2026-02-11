---
name: "Sonatype Guide"
description: "Research component versions, check for latest releases, and get upgrade recommendations"
keywords: ["sonatype", "component", "dependency", "dependencies", "version", "versions", "security", "vulnerability", "vulnerabilities", "license", "licensing", "npm", "maven", "upgrade", "nexus", "package", "packages", "supply chain", "cve", "outdated", "update", "patch", "artifact", "library", "libraries", "pypi", "nuget", "gradle", "pom", "cargo", "rust", "cocoapods", "swift", "composer", "php", "conan", "conda", "cran", "alpine", "bower", "debian", "drupal", "rpm", "rubygems", "ruby", "golang", "go"]
mcpServers:
  - endpoint: "https://mcp.guide.sonatype.com/mcp"
    authType: "bearer"
    authEnvVar: "SONATYPE_GUIDE_TOKEN"
---

# Sonatype Guide Power

Access Sonatype's comprehensive component intelligence to research dependencies, check for updates, and get upgrade recommendations with security and licensing insights.

## Getting Started

### 1. Obtain Your Bearer Token

To use the Sonatype Guide power, you'll need a bearer token from Sonatype Guide:

1. Visit [https://guide.sonatype.com/settings/tokens](https://guide.sonatype.com/settings/tokens)
2. Sign in to your Sonatype Guide account (or create one if needed)
3. Generate a new API token
4. Copy the token value

### 2. Configure Kiro

Set the `SONATYPE_GUIDE_TOKEN` environment variable with your bearer token:

```bash
export SONATYPE_GUIDE_TOKEN="your-token-here"
```

For permanent configuration, add this to your shell profile (`~/.zshrc`, `~/.bashrc`, etc.).

### 3. Verify Your Setup

Test the connection with a simple query:

```
Ask Kiro: "What's the latest version of lodash?"
```

If configured correctly, Kiro will use the Sonatype Guide power to retrieve the latest version information.

### Troubleshooting

**401 Unauthorized Error**
- Your token may be invalid or expired
- Regenerate a new token at [https://guide.sonatype.com/settings/tokens](https://guide.sonatype.com/settings/tokens)
- Ensure the `SONATYPE_GUIDE_TOKEN` environment variable is set correctly

**Connection Timeout**
- Verify you can access https://mcp.guide.sonatype.com/mcp
- Check your network connectivity
- Ensure no firewall is blocking the connection

**Environment Variable Not Set**
- Verify the variable is exported: `echo $SONATYPE_GUIDE_TOKEN`
- Restart your terminal or IDE after setting the variable
- Check that the variable name is exactly `SONATYPE_GUIDE_TOKEN`

## Available Tools

### getComponentVersion

Retrieves detailed information about a specific component version.

**Purpose**: Get comprehensive data about a particular version including security vulnerabilities, licensing information, and metadata.

**Parameters**:
- Component identifier (e.g., `pkg:npm/lodash@4.17.21`, `pkg:maven/org.springframework/spring-core@5.3.20`)

**Returns**:
- Version details (release date, metadata)
- Security vulnerabilities (CVEs, severity levels, fixed versions)
- License information (SPDX identifiers, license text URLs)
- Component metadata (description, homepage, repository)

**When to use**:
- Evaluating a specific version before adopting it in your project
- Conducting security audits on current dependencies
- Investigating known vulnerabilities in a particular version
- Checking license compatibility for a specific version

**Example component identifiers**:
- npm: `pkg:npm/react@18.2.0`
- Maven: `pkg:maven/com.google.guava/guava@31.1-jre`
- PyPI: `pkg:pypi/django@4.2.0`
- NuGet: `pkg:nuget/Newtonsoft.Json@13.0.3`
- Cargo: `pkg:cargo/serde@1.0.160`
- Go: `pkg:golang/github.com/gin-gonic/gin@v1.9.0`

### getLatestComponentVersion

Retrieves information about the most recent version of a component.

**Purpose**: Quickly check what the latest available version is and its status.

**Parameters**:
- Component identifier without version (e.g., `pkg:npm/lodash`, `pkg:maven/org.springframework/spring-core`)

**Returns**:
- Latest version number
- Release date
- Security status
- License information

**When to use**:
- Checking if updates are available for your current dependencies
- Finding the newest version when adding a new dependency
- Monitoring for new releases of critical components
- Quick version checks during development

### getRecommendedComponentVersions

Provides Sonatype's curated recommendations for component versions.

**Purpose**: Get expert recommendations based on security, stability, and compatibility analysis.

**Parameters**:
- Component identifier without version (e.g., `pkg:npm/lodash`, `pkg:maven/org.springframework/spring-core`)

**Returns**:
- List of recommended versions with rationale
- Security scores for each recommended version
- Stability assessments
- Compatibility notes
- Reasons why each version is recommended

**When to use**:
- Planning dependency upgrades across your project
- Selecting versions for new projects
- Balancing security, stability, and compatibility needs
- Making informed decisions about which version to adopt

## How Kiro Uses These Tools

### Tool Selection Guidance

Kiro will automatically select the appropriate tool based on your query:

- **Before installing packages**: Uses `getRecommendedComponentVersions` or `getComponentVersion` to validate security before suggesting installation
- **For specific version research**: Uses `getComponentVersion` when you ask about a particular version
- **For update checks**: Uses `getLatestComponentVersion` when you ask "what's the latest version"
- **For upgrade planning**: Uses `getRecommendedComponentVersions` when you need guidance on which version to use

### Automatic Security Validation

**Kiro should proactively validate component security in these scenarios:**

1. **Package Installation Requests**: When a user asks to install a package, check for vulnerabilities first
2. **Dependency Upgrades**: When upgrading packages, validate the target version is secure
3. **Package.json Reviews**: When reviewing or modifying dependency files, scan for known vulnerabilities
4. **Build Failures**: When npm/pip/maven reports vulnerabilities, use Sonatype Guide to find secure alternatives

### Best Practices

1. **Validate before installing**: Before adding any new dependency or upgrading, always check for security vulnerabilities and licensing issues using Sonatype Guide
2. **Start with recommendations**: When planning upgrades, ask for recommended versions first to get expert guidance
3. **Check for updates regularly**: Use latest version checks to stay informed about new releases
4. **Investigate before adopting**: Use specific version research to understand security and licensing implications
5. **Consider the full picture**: Pay attention to security vulnerabilities, license compatibility, and stability when making decisions

### Critical Workflow: Validate Dependencies Before Installation

**IMPORTANT**: Kiro should ALWAYS validate component security before recommending or installing any package.

**When to validate**:
- Before suggesting a package to install
- Before upgrading an existing dependency
- When a user asks to add a new dependency
- When reviewing package.json or requirements.txt changes

**How to validate**:
1. Use `getComponentVersion` or `getRecommendedComponentVersions` to check the specific version
2. Review security vulnerabilities (CVEs, severity levels)
3. Check license compatibility
4. Only proceed with installation if no critical/high vulnerabilities exist, or inform the user of the risks

**Example**:
```
User: "Install vitest for testing"
Kiro: First checks pkg:npm/vitest@1.0.0 with Sonatype Guide
Kiro: Finds moderate vulnerability in vite-node dependency
Kiro: Recommends vitest@4.0.18 instead (vulnerability-free version)
User: Installs the secure version
```

## Common Workflows

### Workflow 1: Research a Specific Version Before Adoption

**Scenario**: You're considering upgrading to a specific version and want to understand its security and licensing status.

**Steps**:
1. Ask Kiro: "What are the security vulnerabilities in lodash version 4.17.21?"
2. Kiro uses `getComponentVersion` with `pkg:npm/lodash@4.17.21`
3. Review the security vulnerabilities, CVE details, and severity levels
4. Check the license information for compatibility with your project
5. Make an informed decision based on the complete picture

### Workflow 2: Check for Available Updates

**Scenario**: You want to know if there's a newer version of a dependency you're currently using.

**Steps**:
1. Ask Kiro: "What's the latest version of react?"
2. Kiro uses `getLatestComponentVersion` with `pkg:npm/react`
3. Compare the latest version with your current version
4. Review the release date and security status
5. Decide whether to upgrade based on the information

### Workflow 3: Plan Dependency Upgrades

**Scenario**: You're planning to upgrade multiple dependencies and want expert recommendations.

**Steps**:
1. Ask Kiro: "What versions of spring-core does Sonatype recommend?"
2. Kiro uses `getRecommendedComponentVersions` with `pkg:maven/org.springframework/spring-core`
3. Review the recommended versions with their rationales
4. Consider security scores, stability assessments, and compatibility notes
5. Select the version that best fits your project's needs
6. Use `getComponentVersion` to get detailed information about your chosen version

### Workflow 4: Evaluate Component Security and Compliance

**Scenario**: You need to audit your dependencies for security vulnerabilities and license compliance.

**Steps**:
1. For each dependency, ask Kiro: "What are the security issues in [component]@[version]?"
2. Kiro uses `getComponentVersion` for each dependency
3. Document all vulnerabilities, CVEs, and severity levels
4. Review license information for compliance with your organization's policies
5. Use `getRecommendedComponentVersions` to find secure alternatives if needed
6. Create an upgrade plan prioritizing high-severity vulnerabilities

### Workflow 5: Validate Before Installing New Dependencies

**Scenario**: You want to add a new package to your project and need to ensure it's secure.

**Steps**:
1. Ask Kiro: "What's the recommended version of [package-name]?"
2. Kiro uses `getRecommendedComponentVersions` to get secure, stable versions
3. Review the security scores and vulnerability information
4. If vulnerabilities exist, Kiro suggests the latest secure version
5. Check license compatibility with your project
6. Install the validated, secure version

**Real Example**:
```
User: "I need to install vitest for testing"
Kiro: Checks pkg:npm/vitest with getRecommendedComponentVersions
Kiro: "vitest@1.0.0 has a moderate vulnerability (CVSS 2.3) in vite-node dependency. 
      I recommend vitest@4.0.18 which has no known vulnerabilities."
User: Installs the secure version
```

## Supported Ecosystems

Sonatype Guide supports components from these package ecosystems:

- **JavaScript/Node.js**: npm packages
- **Java**: Maven (Central Repository), Gradle
- **Python**: PyPI packages
- **C#/.NET**: NuGet packages
- **Rust**: Cargo crates
- **Swift/Objective-C**: CocoaPods
- **PHP**: Composer packages
- **C/C++**: Conan packages
- **Data Science**: Conda packages
- **R**: CRAN packages
- **Ruby**: RubyGems
- **Go**: Go modules
- **Linux**: Alpine, Debian, RPM packages
- **Web**: Bower packages
- **CMS**: Drupal modules

Use the appropriate package URL format for your ecosystem (e.g., `pkg:npm/`, `pkg:maven/`, `pkg:pypi/`).
