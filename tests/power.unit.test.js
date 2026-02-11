import { describe, test, expect } from 'vitest';
import fs from 'fs';
import yaml from 'js-yaml';

/**
 * Unit Tests for Sonatype Guide Power
 * 
 * These tests validate specific content requirements and examples
 * from the design document.
 */

describe('Sonatype Guide Power - Unit Tests', () => {
  
  let powerMdContent;
  let frontmatter;
  let bodyContent;
  
  // Load POWER.md once for all tests
  beforeAll(() => {
    powerMdContent = fs.readFileSync('POWER.md', 'utf8');
    const frontmatterMatch = powerMdContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    expect(frontmatterMatch).toBeTruthy();
    
    frontmatter = yaml.load(frontmatterMatch[1]);
    bodyContent = frontmatterMatch[2];
  });
  
  describe('File Structure and Sections', () => {
    test('POWER.md contains frontmatter section', () => {
      expect(powerMdContent).toMatch(/^---\n[\s\S]*?\n---/);
    });
    
    test('POWER.md contains Getting Started section', () => {
      expect(bodyContent).toContain('## Getting Started');
    });
    
    test('POWER.md contains Available Tools section', () => {
      expect(bodyContent).toContain('## Available Tools');
    });
    
    test('POWER.md contains How Kiro Uses These Tools section', () => {
      expect(bodyContent).toContain('## How Kiro Uses These Tools');
    });
    
    test('POWER.md contains Common Workflows section', () => {
      expect(bodyContent).toContain('## Common Workflows');
    });
    
    test('POWER.md contains Supported Ecosystems section', () => {
      expect(bodyContent).toContain('## Supported Ecosystems');
    });
  });
  
  describe('Specific Configuration Values', () => {
    test('MCP endpoint is https://mcp.guide.sonatype.com/mcp', () => {
      expect(frontmatter.mcpServers).toBeDefined();
      expect(frontmatter.mcpServers.length).toBeGreaterThan(0);
      expect(frontmatter.mcpServers[0].endpoint).toBe('https://mcp.guide.sonatype.com/mcp');
    });
    
    test('authType is bearer', () => {
      expect(frontmatter.mcpServers[0].authType).toBe('bearer');
    });
    
    test('authEnvVar is SONATYPE_GUIDE_TOKEN', () => {
      expect(frontmatter.mcpServers[0].authEnvVar).toBe('SONATYPE_GUIDE_TOKEN');
    });
    
    test('power name is Sonatype Guide', () => {
      expect(frontmatter.name).toBe('Sonatype Guide');
    });
  });
  
  describe('Tool Documentation Completeness', () => {
    test('getComponentVersion tool is documented', () => {
      expect(bodyContent).toContain('### getComponentVersion');
      expect(bodyContent).toContain('**Purpose**');
      expect(bodyContent).toContain('**Parameters**');
      expect(bodyContent).toContain('**Returns**');
      expect(bodyContent).toContain('**When to use**');
    });
    
    test('getLatestComponentVersion tool is documented', () => {
      expect(bodyContent).toContain('### getLatestComponentVersion');
      expect(bodyContent).toContain('**Purpose**');
      expect(bodyContent).toContain('**Parameters**');
      expect(bodyContent).toContain('**Returns**');
      expect(bodyContent).toContain('**When to use**');
    });
    
    test('getRecommendedComponentVersions tool is documented', () => {
      expect(bodyContent).toContain('### getRecommendedComponentVersions');
      expect(bodyContent).toContain('**Purpose**');
      expect(bodyContent).toContain('**Parameters**');
      expect(bodyContent).toContain('**Returns**');
      expect(bodyContent).toContain('**When to use**');
    });
    
    test('Tool documentation includes component identifier examples', () => {
      expect(bodyContent).toContain('pkg:npm/');
      expect(bodyContent).toContain('pkg:maven/');
      expect(bodyContent).toContain('pkg:pypi/');
      expect(bodyContent).toContain('pkg:nuget/');
      expect(bodyContent).toContain('pkg:cargo/');
      expect(bodyContent).toContain('pkg:golang/');
    });
  });
  
  describe('Workflow Presence', () => {
    test('Workflow 1: Research specific version exists', () => {
      expect(bodyContent).toContain('### Workflow 1: Research a Specific Version Before Adoption');
      expect(bodyContent).toContain('**Scenario**');
      expect(bodyContent).toContain('**Steps**');
    });
    
    test('Workflow 2: Check for updates exists', () => {
      expect(bodyContent).toContain('### Workflow 2: Check for Available Updates');
      expect(bodyContent).toContain('**Scenario**');
      expect(bodyContent).toContain('**Steps**');
    });
    
    test('Workflow 3: Plan upgrades exists', () => {
      expect(bodyContent).toContain('### Workflow 3: Plan Dependency Upgrades');
      expect(bodyContent).toContain('**Scenario**');
      expect(bodyContent).toContain('**Steps**');
    });
    
    test('Workflow 4: Security evaluation exists', () => {
      expect(bodyContent).toContain('### Workflow 4: Evaluate Component Security and Compliance');
      expect(bodyContent).toContain('**Scenario**');
      expect(bodyContent).toContain('**Steps**');
    });
    
    test('Workflow 5: Validate before installing exists', () => {
      expect(bodyContent).toContain('### Workflow 5: Validate Before Installing New Dependencies');
      expect(bodyContent).toContain('**Scenario**');
      expect(bodyContent).toContain('**Steps**');
    });
  });
  
  describe('Troubleshooting Content', () => {
    test('Troubleshooting section exists', () => {
      expect(bodyContent).toContain('### Troubleshooting');
    });
    
    test('401 Unauthorized error is documented', () => {
      expect(bodyContent).toContain('401 Unauthorized');
    });
    
    test('Connection timeout error is documented', () => {
      expect(bodyContent).toContain('Connection Timeout');
    });
    
    test('Environment variable error is documented', () => {
      expect(bodyContent).toContain('Environment Variable Not Set');
    });
    
    test('Token regeneration instructions exist', () => {
      expect(bodyContent).toContain('https://guide.sonatype.com/settings/tokens');
    });
  });
  
  describe('Best Practices Documentation', () => {
    test('Best Practices section exists', () => {
      expect(bodyContent).toContain('### Best Practices');
    });
    
    test('Recommends validating before installing', () => {
      expect(bodyContent).toContain('Validate before installing');
    });
    
    test('Recommends starting with getRecommendedComponentVersions', () => {
      expect(bodyContent).toContain('Start with recommendations');
    });
    
    test('Recommends using getLatestComponentVersion for updates', () => {
      expect(bodyContent).toContain('Check for updates regularly');
    });
    
    test('Recommends using getComponentVersion for detailed analysis', () => {
      expect(bodyContent).toContain('Investigate before adopting');
    });
    
    test('Advises considering security and licensing', () => {
      expect(bodyContent).toContain('Consider the full picture');
      expect(bodyContent).toContain('security vulnerabilities');
      expect(bodyContent).toContain('license compatibility');
    });
  });
  
  describe('Onboarding Instructions', () => {
    test('Token acquisition instructions exist', () => {
      expect(bodyContent).toContain('### 1. Obtain Your Bearer Token');
      expect(bodyContent).toContain('https://guide.sonatype.com/settings/tokens');
    });
    
    test('Environment variable configuration instructions exist', () => {
      expect(bodyContent).toContain('### 2. Configure Kiro');
      expect(bodyContent).toContain('SONATYPE_GUIDE_TOKEN');
      expect(bodyContent).toContain('export');
    });
    
    test('Setup verification instructions exist', () => {
      expect(bodyContent).toContain('### 3. Verify Your Setup');
    });
  });
  
  describe('Automatic Security Validation', () => {
    test('Documents automatic security validation', () => {
      expect(bodyContent).toContain('Automatic Security Validation');
    });
    
    test('Mentions validation before package installation', () => {
      expect(bodyContent).toContain('Package Installation Requests');
    });
    
    test('Mentions validation during dependency upgrades', () => {
      expect(bodyContent).toContain('Dependency Upgrades');
    });
    
    test('Includes critical workflow for validation', () => {
      expect(bodyContent).toContain('Critical Workflow: Validate Dependencies Before Installation');
      expect(bodyContent).toContain('IMPORTANT');
    });
  });
  
  describe('YAML Parsing', () => {
    test('YAML frontmatter can be parsed successfully', () => {
      expect(frontmatter).toBeDefined();
      expect(typeof frontmatter).toBe('object');
    });
    
    test('Invalid YAML would throw error', () => {
      const invalidYaml = '---\nname: "test\ninvalid: yaml\n---';
      expect(() => {
        yaml.load(invalidYaml);
      }).toThrow();
    });
  });
  
  describe('Ecosystem Coverage', () => {
    test('Documents npm ecosystem', () => {
      expect(bodyContent).toContain('npm');
    });
    
    test('Documents Maven ecosystem', () => {
      expect(bodyContent).toContain('Maven');
    });
    
    test('Documents PyPI ecosystem', () => {
      expect(bodyContent).toContain('PyPI');
    });
    
    test('Documents NuGet ecosystem', () => {
      expect(bodyContent).toContain('NuGet');
    });
    
    test('Documents Cargo ecosystem', () => {
      expect(bodyContent).toContain('Cargo');
    });
    
    test('Documents CocoaPods ecosystem', () => {
      expect(bodyContent).toContain('CocoaPods');
    });
    
    test('Documents Composer ecosystem', () => {
      expect(bodyContent).toContain('Composer');
    });
    
    test('Documents Go modules ecosystem', () => {
      expect(bodyContent).toContain('Go modules');
    });
    
    test('Documents RubyGems ecosystem', () => {
      expect(bodyContent).toContain('RubyGems');
    });
  });
});
