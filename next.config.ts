import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Standard Next.js server build for Vercel (no `output: 'export'`).
  // Disable auto-generated agent files (AGENTS.md / CLAUDE.md) so the
  // hand-written CLAUDE.md in this repo is the source of truth.
  agentRules: false,
}

export default nextConfig
