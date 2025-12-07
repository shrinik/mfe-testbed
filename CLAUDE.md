# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a microfrontend (MFE) testbed using Cloudflare Workers. The architecture consists of:

- **shell/** - Shell application that hosts microfrontends
- **mfe-1/** - First microfrontend application

Both applications are Cloudflare Workers that serve static assets.

## Architecture

### Service Binding Integration

The shell application integrates microfrontends using Cloudflare Workers service bindings:

- `shell/wrangler.toml` defines a service binding named `MFE` that points to the `mfe-app` service
- `shell/index.js` forwards requests to the bound MFE service via `env.MFE.fetch(request)`
- The MFE is embedded in the shell via an iframe: `<iframe src="/mfe/index.html"></iframe>` in `shell/dist/index.html`

### Directory Structure

- **shell/dist/** - Shell's static assets (HTML with grid layout for header/sidebar/content)
- **mfe-1/dist/mfe/** - MFE's static assets (note the `/mfe` subdirectory matches the iframe src path)
- Both use Wrangler's `[assets]` configuration to serve static files

### Shell Layout

The shell uses CSS Grid with:
- Header (10% height, full width)
- Sidebar (10% width, 90% height)
- Content area (90% width, 90% height) - hosts the MFE iframe

## Development Commands

### Running the Shell Application
```bash
cd shell
npm run dev
```

### Running the MFE Application
```bash
cd mfe-1
npm run dev
```

### Running Both Together

To test the full integration with service bindings, you need to run both applications in separate terminals:

1. Terminal 1: Start the MFE: `cd mfe-1 && npm run dev`
2. Terminal 2: Start the shell: `cd shell && npm run dev`

The shell will use the service binding to communicate with the MFE worker.

## Key Configuration Files

- **wrangler.toml** - Cloudflare Workers configuration
  - `name` - Worker service name (must match service binding references)
  - `[assets]` - Static asset directory configuration
  - `services` - Service bindings (shell only)
- **index.js** - Worker entry point with `fetch()` handler

## Important Notes

- The `.wrangler` directory contains temporary build artifacts and should remain in `.gitignore`
- When modifying the shell layout, remember that fixed viewport units (vw/vh) on grid children caused scrollbars - prefer letting the grid container define dimensions
- Service binding names in `wrangler.toml` must match the service name of the bound worker
