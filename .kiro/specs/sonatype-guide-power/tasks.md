# Implementation Tasks: Sonatype Guide Kiro Power

## Task 1: Create POWER.md File Structure

Create the main POWER.md file with the complete frontmatter configuration.

**Subtasks:**
- [x] 1.1 Create POWER.md file in the power directory
- [x] 1.2 Add YAML frontmatter with name, description, and keywords
- [x] 1.3 Add mcpServers configuration with endpoint, authType, and authEnvVar
- [x] 1.4 Validate YAML syntax and schema completeness

**Acceptance Criteria:**
- POWER.md file exists with valid YAML frontmatter
- Frontmatter includes all required fields: name, description, keywords, mcpServers
- MCP server endpoint is https://mcp.guide.sonatype.com/mcp
- Authentication is configured as bearer token with SONATYPE_GUIDE_TOKEN env var
- Keywords include all ecosystem-specific terms (npm, maven, pypi, nuget, cargo, cocoapods, composer, conan, conda, cran, alpine, bower, debian, drupal, rpm, rubygems, golang, etc.)

**Validates Requirements:** 1.1, 1.2, 2.1, 2.2, 2.3, 6.1, 6.2, 6.3, 6.4, 9.1, 9.2, 9.3, 9.4, 9.5

---

## Task 2: Write Onboarding Instructions

Add comprehensive onboarding section to POWER.md explaining setup and verification.

**Subtasks:**
- [x] 2.1 Write token acquisition instructions with link to https://guide.sonatype.com/settings/tokens
- [x] 2.2 Write environment variable configuration instructions
- [x] 2.3 Write setup verification instructions with test query
- [x] 2.4 Write troubleshooting section for common authentication errors

**Acceptance Criteria:**
- Onboarding section explains how to obtain bearer token from Sonatype Guide
- Instructions explain how to configure SONATYPE_GUIDE_TOKEN environment variable
- Verification steps include a simple test query to confirm setup
- Troubleshooting covers invalid token, missing token, and connection errors
- Instructions explain how to regenerate tokens if authentication fails

**Validates Requirements:** 1.3, 1.4, 2.4, 8.1, 8.2, 8.3, 8.4

---

## Task 3: Document MCP Tools

Add detailed documentation for all three Sonatype Guide MCP tools.

**Subtasks:**
- [x] 3.1 Document getComponentVersion tool with purpose, parameters, returns, and use cases
- [x] 3.2 Document getLatestComponentVersion tool with purpose, parameters, returns, and use cases
- [x] 3.3 Document getRecommendedComponentVersions tool with purpose, parameters, returns, and use cases
- [x] 3.4 Add examples of component identifiers for different ecosystems

**Acceptance Criteria:**
- getComponentVersion documentation explains it retrieves detailed version information
- getComponentVersion documentation lists security vulnerabilities, licensing, and metadata in returns
- getLatestComponentVersion documentation explains it retrieves the most recent version
- getRecommendedComponentVersions documentation explains recommendations are based on security, stability, and compatibility
- Each tool includes examples of when to use it
- Documentation includes examples of valid component identifiers (e.g., pkg:npm/lodash, pkg:maven/org.springframework/spring-core)

**Validates Requirements:** 1.5, 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 5.1, 5.2, 5.3, 5.4

---

## Task 4: Write Steering Instructions

Add steering instructions to guide Kiro's tool selection and usage patterns.

**Subtasks:**
- [x] 4.1 Write tool selection guidance explaining when to use each tool
- [x] 4.2 Write best practices for using getRecommendedComponentVersions for upgrade decisions
- [x] 4.3 Write best practices for using getLatestComponentVersion to check for updates
- [x] 4.4 Write best practices for using getComponentVersion for detailed analysis
- [x] 4.5 Add guidance to consider security vulnerabilities and licensing in decisions

**Acceptance Criteria:**
- Steering instructions clearly explain when to use each of the three tools
- Instructions recommend starting with getRecommendedComponentVersions for upgrade decisions
- Instructions recommend using getLatestComponentVersion to check for updates
- Instructions recommend using getComponentVersion when detailed analysis is needed
- Instructions advise considering security vulnerabilities and licensing information

**Validates Requirements:** 10.1, 10.2, 10.3, 10.4

---

## Task 5: Add Workflow Examples

Add practical workflow examples for common use cases.

**Subtasks:**
- [x] 5.1 Write workflow for researching a specific component version before adoption
- [x] 5.2 Write workflow for checking if a component has updates available
- [x] 5.3 Write workflow for planning dependency upgrades with recommendations
- [x] 5.4 Write workflow for evaluating component security and compliance

**Acceptance Criteria:**
- Workflow for researching specific versions includes step-by-step instructions
- Workflow for checking updates includes step-by-step instructions
- Workflow for planning upgrades includes step-by-step instructions
- Workflow for security evaluation includes step-by-step instructions
- Each workflow specifies which tools to use and in what order

**Validates Requirements:** 7.1, 7.2, 7.3, 7.4

---

## Task 6: Write Property-Based Tests

Write property-based tests to validate POWER.md correctness properties.

**Subtasks:**
- [x] 6.1 Set up property-based testing framework
- [x] 6.2 Write Property 1 test: Frontmatter Schema Completeness
- [x] 6.3 Write Property 2 test: Keyword Category Coverage
- [x] 6.4 Configure tests to run minimum 100 iterations

**Acceptance Criteria:**
- Property test framework is configured and runnable
- Property 1 test validates all required frontmatter fields are present and correctly typed
- Property 1 test validates mcpServers configuration is complete
- Property 2 test validates at least one keyword from each required category exists
- Property 2 test validates categories: component research, Sonatype services, security/licensing, package management
- Each property test runs minimum 100 iterations
- Tests include proper tags: **Feature: sonatype-guide-power, Property {number}: {property_text}**

**Validates Design:** Property 1, Property 2

---

## Task 7: Write Unit Tests

Write example-based unit tests for specific content validation.

**Subtasks:**
- [x] 7.1 Write tests for POWER.md file structure and sections
- [x] 7.2 Write tests for specific configuration values
- [x] 7.3 Write tests for tool documentation completeness
- [x] 7.4 Write tests for workflow presence
- [x] 7.5 Write tests for troubleshooting content
- [x] 7.6 Write tests for YAML parsing

**Acceptance Criteria:**
- Tests verify POWER.md contains frontmatter, onboarding, steering, and workflow sections
- Tests verify MCP endpoint is https://mcp.guide.sonatype.com/mcp
- Tests verify authType is "bearer"
- Tests verify all three tools (getComponentVersion, getLatestComponentVersion, getRecommendedComponentVersions) are documented
- Tests verify all four workflows are present
- Tests verify troubleshooting section exists
- Tests verify YAML frontmatter can be parsed successfully
- Tests verify invalid YAML produces appropriate error messages

**Validates Design:** Example-Based Tests section

---

## Task 8: Create Integration Tests (Optional)

Create optional integration tests that verify actual MCP server connectivity.

**Subtasks:**
- [ ]* 8.1 Create integration test configuration requiring valid token
- [ ]* 8.2 Write test for successful authentication with valid token
- [ ]* 8.3 Write test for each tool with sample component identifiers
- [ ]* 8.4 Write test for error handling with invalid credentials

**Acceptance Criteria:**
- Integration tests require explicit configuration to run
- Integration tests skip if SONATYPE_GUIDE_TOKEN is not configured
- Tests verify successful connection to https://mcp.guide.sonatype.com/mcp
- Tests verify each tool can be invoked with sample queries
- Tests verify appropriate error messages for authentication failures
- Tests do not run as part of standard test suite (require opt-in)

**Validates Design:** Integration Testing section

---

## Task 9: Documentation Review and Validation

Review and validate all documentation for completeness and accuracy.

**Subtasks:**
- [x] 9.1 Review POWER.md against all requirements
- [x] 9.2 Validate all links and URLs are correct
- [x] 9.3 Validate all code examples and component identifiers
- [x] 9.4 Run all tests to ensure they pass
- [x] 9.5 Create README or usage guide if needed

**Acceptance Criteria:**
- All requirements from requirements.md are addressed in POWER.md
- All URLs are valid and accessible
- All component identifier examples use correct format
- All property tests pass with 100+ iterations
- All unit tests pass
- Documentation is clear, accurate, and actionable

**Validates Requirements:** All requirements

---

## Notes

- This is a documentation-only power - no custom code or MCP server implementation required
- The MCP server is hosted by Sonatype and accessed via the configured endpoint
- Focus on clear, actionable documentation that helps users set up and use the power effectively
- Property-based tests ensure the POWER.md structure is always valid
- Unit tests ensure specific content requirements are met
