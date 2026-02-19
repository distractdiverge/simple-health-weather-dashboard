#!/usr/bin/env node

/**
 * Generate build information for Netlify deployments
 * Runs during build and creates build-info.json
 */

const fs = require('fs');
const path = require('path');

// Read Netlify environment variables
const deployId = process.env.DEPLOY_ID || 'dev-local';
const context = process.env.CONTEXT || 'development';
const commitRef = process.env.COMMIT_REF || '';

// Format context for display
function formatContext(ctx) {
  const contextMap = {
    'production': 'Production',
    'deploy-preview': 'Preview',
    'branch-deploy': 'Branch',
    'development': 'Development'
  };
  return contextMap[ctx] || ctx;
}

// Create build info object
const buildInfo = {
  deployId: deployId.substring(0, 7), // First 7 characters
  context: formatContext(context),
  timestamp: new Date().toISOString(),
  commitRef: commitRef.substring(0, 7)
};

// Write to file
const outputPath = path.join(__dirname, 'build-info.json');
fs.writeFileSync(outputPath, JSON.stringify(buildInfo, null, 2));

console.log('✓ Build info generated:', buildInfo);
