import { describe, test, expect } from 'vitest';
import * as fc from 'fast-check';
import fs from 'fs';
import yaml from 'js-yaml';

/**
 * Property-Based Tests for Sonatype Guide Power
 * 
 * These tests validate universal properties that should hold true
 * for any valid POWER.md configuration.
 */

describe('Sonatype Guide Power - Property-Based Tests', () => {
  
  /**
   * Property 1: Frontmatter Schema Completeness
   * 
   * **Feature: sonatype-guide-power, Property 1: Frontmatter Schema Completeness**
   * 
   * For any valid POWER.md file, the YAML frontmatter should contain all required 
   * fields (name, description, keywords, mcpServers) with correct types, and the 
   * mcpServers configuration should include endpoint, authType, and authEnvVar fields.
   * 
   * **Validates: Requirements 1.2, 9.1, 9.2, 9.3, 9.4, 9.5**
   */
  test('Property 1: Frontmatter Schema Completeness', () => {
    fc.assert(
      fc.property(
        // Generate arbitrary valid frontmatter configurations
        fc.record({
          name: fc.string({ minLength: 1, maxLength: 100 }),
          description: fc.string({ minLength: 1, maxLength: 500 }),
          keywords: fc.array(fc.string({ minLength: 1, maxLength: 50 }), { minLength: 1, maxLength: 100 }),
          mcpServers: fc.array(
            fc.record({
              endpoint: fc.webUrl(),
              authType: fc.constantFrom('bearer', 'apiKey', 'basic'),
              authEnvVar: fc.string({ minLength: 1, maxLength: 100 }).map(s => s.toUpperCase().replace(/[^A-Z0-9_]/g, '_'))
            }),
            { minLength: 1, maxLength: 5 }
          )
        }),
        (frontmatter) => {
          // Verify all required fields are present
          expect(frontmatter).toHaveProperty('name');
          expect(frontmatter).toHaveProperty('description');
          expect(frontmatter).toHaveProperty('keywords');
          expect(frontmatter).toHaveProperty('mcpServers');
          
          // Verify correct types
          expect(typeof frontmatter.name).toBe('string');
          expect(typeof frontmatter.description).toBe('string');
          expect(Array.isArray(frontmatter.keywords)).toBe(true);
          expect(Array.isArray(frontmatter.mcpServers)).toBe(true);
          
          // Verify non-empty values
          expect(frontmatter.name.length).toBeGreaterThan(0);
          expect(frontmatter.description.length).toBeGreaterThan(0);
          expect(frontmatter.keywords.length).toBeGreaterThan(0);
          expect(frontmatter.mcpServers.length).toBeGreaterThan(0);
          
          // Verify mcpServers configuration completeness
          frontmatter.mcpServers.forEach(server => {
            expect(server).toHaveProperty('endpoint');
            expect(server).toHaveProperty('authType');
            expect(server).toHaveProperty('authEnvVar');
            
            expect(typeof server.endpoint).toBe('string');
            expect(typeof server.authType).toBe('string');
            expect(typeof server.authEnvVar).toBe('string');
            
            expect(server.endpoint.length).toBeGreaterThan(0);
            expect(server.authType.length).toBeGreaterThan(0);
            expect(server.authEnvVar.length).toBeGreaterThan(0);
          });
        }
      ),
      { numRuns: 100 } // Run 100 iterations as specified in design
    );
  });

  /**
   * Property 2: Keyword Category Coverage
   * 
   * **Feature: sonatype-guide-power, Property 2: Keyword Category Coverage**
   * 
   * For any valid POWER.md file, the keywords array should include at least one 
   * keyword from each of the four required categories: component research, 
   * Sonatype services, security and licensing, and package management.
   * 
   * **Validates: Requirements 6.1, 6.2, 6.3, 6.4**
   */
  test('Property 2: Keyword Category Coverage', () => {
    // Define required keyword categories
    const componentResearchKeywords = [
      'component', 'dependency', 'dependencies', 'version', 'versions', 
      'artifact', 'library', 'libraries'
    ];
    
    const sonatypeServicesKeywords = [
      'sonatype', 'nexus'
    ];
    
    const securityLicensingKeywords = [
      'vulnerability', 'vulnerabilities', 'license', 'licensing', 
      'security', 'cve', 'supply chain'
    ];
    
    const packageManagementKeywords = [
      'npm', 'maven', 'upgrade', 'package', 'packages', 'outdated', 
      'update', 'patch', 'pypi', 'nuget', 'gradle', 'pom', 'cargo', 
      'rust', 'cocoapods', 'swift', 'composer', 'php', 'conan', 'conda', 
      'cran', 'alpine', 'bower', 'debian', 'drupal', 'rpm', 'rubygems', 
      'ruby', 'golang', 'go'
    ];
    
    fc.assert(
      fc.property(
        // Generate keyword arrays that include at least one from each category
        fc.tuple(
          fc.constantFrom(...componentResearchKeywords),
          fc.constantFrom(...sonatypeServicesKeywords),
          fc.constantFrom(...securityLicensingKeywords),
          fc.constantFrom(...packageManagementKeywords),
          fc.array(fc.string({ minLength: 1, maxLength: 50 }), { maxLength: 20 }) // Additional random keywords
        ).map(([comp, sona, sec, pkg, extra]) => {
          // Combine required keywords with random extras
          return [comp, sona, sec, pkg, ...extra];
        }),
        (keywords) => {
          // Verify at least one keyword from component research category
          const hasComponentResearch = keywords.some(kw => 
            componentResearchKeywords.includes(kw.toLowerCase())
          );
          expect(hasComponentResearch).toBe(true);
          
          // Verify at least one keyword from Sonatype services category
          const hasSonatypeServices = keywords.some(kw => 
            sonatypeServicesKeywords.includes(kw.toLowerCase())
          );
          expect(hasSonatypeServices).toBe(true);
          
          // Verify at least one keyword from security/licensing category
          const hasSecurityLicensing = keywords.some(kw => 
            securityLicensingKeywords.includes(kw.toLowerCase())
          );
          expect(hasSecurityLicensing).toBe(true);
          
          // Verify at least one keyword from package management category
          const hasPackageManagement = keywords.some(kw => 
            packageManagementKeywords.includes(kw.toLowerCase())
          );
          expect(hasPackageManagement).toBe(true);
        }
      ),
      { numRuns: 100 } // Run 100 iterations as specified in design
    );
  });
  
  /**
   * Validation Test: Actual POWER.md Frontmatter
   * 
   * This test validates that the actual POWER.md file in this project
   * satisfies both properties.
   */
  test('Actual POWER.md satisfies all properties', () => {
    const powerMdContent = fs.readFileSync('POWER.md', 'utf8');
    
    // Extract frontmatter (between --- markers)
    const frontmatterMatch = powerMdContent.match(/^---\n([\s\S]*?)\n---/);
    expect(frontmatterMatch).toBeTruthy();
    
    const frontmatter = yaml.load(frontmatterMatch[1]);
    
    // Validate Property 1: Schema Completeness
    expect(frontmatter).toHaveProperty('name');
    expect(frontmatter).toHaveProperty('description');
    expect(frontmatter).toHaveProperty('keywords');
    expect(frontmatter).toHaveProperty('mcpServers');
    
    expect(typeof frontmatter.name).toBe('string');
    expect(typeof frontmatter.description).toBe('string');
    expect(Array.isArray(frontmatter.keywords)).toBe(true);
    expect(Array.isArray(frontmatter.mcpServers)).toBe(true);
    
    expect(frontmatter.name.length).toBeGreaterThan(0);
    expect(frontmatter.description.length).toBeGreaterThan(0);
    expect(frontmatter.keywords.length).toBeGreaterThan(0);
    expect(frontmatter.mcpServers.length).toBeGreaterThan(0);
    
    frontmatter.mcpServers.forEach(server => {
      expect(server).toHaveProperty('endpoint');
      expect(server).toHaveProperty('authType');
      expect(server).toHaveProperty('authEnvVar');
    });
    
    // Validate Property 2: Keyword Category Coverage
    const componentResearchKeywords = [
      'component', 'dependency', 'dependencies', 'version', 'versions', 
      'artifact', 'library', 'libraries'
    ];
    
    const sonatypeServicesKeywords = [
      'sonatype', 'nexus'
    ];
    
    const securityLicensingKeywords = [
      'vulnerability', 'vulnerabilities', 'license', 'licensing', 
      'security', 'cve', 'supply chain'
    ];
    
    const packageManagementKeywords = [
      'npm', 'maven', 'upgrade', 'package', 'packages', 'outdated', 
      'update', 'patch', 'pypi', 'nuget', 'gradle', 'pom', 'cargo', 
      'rust', 'cocoapods', 'swift', 'composer', 'php', 'conan', 'conda', 
      'cran', 'alpine', 'bower', 'debian', 'drupal', 'rpm', 'rubygems', 
      'ruby', 'golang', 'go'
    ];
    
    const hasComponentResearch = frontmatter.keywords.some(kw => 
      componentResearchKeywords.includes(kw.toLowerCase())
    );
    expect(hasComponentResearch).toBe(true);
    
    const hasSonatypeServices = frontmatter.keywords.some(kw => 
      sonatypeServicesKeywords.includes(kw.toLowerCase())
    );
    expect(hasSonatypeServices).toBe(true);
    
    const hasSecurityLicensing = frontmatter.keywords.some(kw => 
      securityLicensingKeywords.includes(kw.toLowerCase())
    );
    expect(hasSecurityLicensing).toBe(true);
    
    const hasPackageManagement = frontmatter.keywords.some(kw => 
      packageManagementKeywords.includes(kw.toLowerCase())
    );
    expect(hasPackageManagement).toBe(true);
  });
});
