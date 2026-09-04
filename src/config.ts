/**
 * Loads and validates agents-radar configuration from config.yml.
 * Falls back to built-in defaults if the file is missing or a section is absent.
 */

import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type { RepoConfig } from "./github.ts";

// ---------------------------------------------------------------------------
// Schema types
// ---------------------------------------------------------------------------

interface RawRepoEntry {
  id: string;
  repo: string;
  name: string;
  paginated?: boolean;
}

interface RawConfig {
  /** Primary focus project (preferred key). */
  hermes?: RawRepoEntry;
  /** Legacy alias for hermes. */
  openclaw?: RawRepoEntry;
  openclaw_peers?: RawRepoEntry[];
  hermes_peers?: RawRepoEntry[];
  embedded_ai_repos?: RawRepoEntry[];
}

export interface RadarConfig {
  /** Primary focus project (Hermes Agent). */
  hermes: RepoConfig;
  /** Peer projects compared alongside Hermes. */
  hermesPeers: RepoConfig[];
  embeddedAiRepos: RepoConfig[];
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const DEFAULT_HERMES: RepoConfig = {
  id: "hermes",
  repo: "nousresearch/hermes-agent",
  name: "Hermes Agent",
  paginated: true,
};

const DEFAULT_HERMES_PEERS: RepoConfig[] = [
  { id: "openclaw", repo: "openclaw/openclaw", name: "OpenClaw", paginated: true },
  { id: "nanobot", repo: "HKUDS/nanobot", name: "NanoBot" },
  { id: "zeroclaw", repo: "zeroclaw-labs/zeroclaw", name: "Zeroclaw" },
  { id: "picoclaw", repo: "sipeed/picoclaw", name: "PicoClaw" },
  { id: "nanoclaw", repo: "qwibitai/nanoclaw", name: "NanoClaw" },
  { id: "nullclaw", repo: "nullclaw/nullclaw", name: "NullClaw" },
  { id: "ironclaw", repo: "nearai/ironclaw", name: "IronClaw" },
  { id: "qwenpaw", repo: "agentscope-ai/QwenPaw", name: "Qwen-Paw" },
];

const DEFAULT_EMBEDDED_AI_REPOS: RepoConfig[] = [
  { id: "orangepi-5", repo: "orangepi-xunlong/orangepi-build", name: "Orange Pi Build System" },
  { id: "rknn-toolkit", repo: "airockchip/rknn-toolkit2", name: "RKNN Toolkit 2" },
  { id: "rknn-model-zoo", repo: "airockchip/rknn_model_zoo", name: "RKNN Model Zoo" },
  { id: "rockchip-mpp", repo: "rockchip-linux/mpp", name: "Media Process Platform (MPP) module" },
];

// ---------------------------------------------------------------------------
// Loader
// ---------------------------------------------------------------------------

function toRepoConfig(e: RawRepoEntry): RepoConfig {
  return { id: e.id, repo: e.repo, name: e.name, ...(e.paginated ? { paginated: true } : {}) };
}

export function loadConfig(configPath = "config.yml"): RadarConfig {
  const resolved = path.resolve(configPath);

  if (!fs.existsSync(resolved)) {
    console.log(`[config] ${configPath} not found — using built-in defaults.`);
    return {
      hermes: DEFAULT_HERMES,
      hermesPeers: DEFAULT_HERMES_PEERS,
      embeddedAiRepos: DEFAULT_EMBEDDED_AI_REPOS,
    };
  }

  const raw = yaml.load(fs.readFileSync(resolved, "utf-8")) as RawConfig;

  const primaryRaw = raw?.hermes ?? raw?.openclaw;
  const hermes =
    primaryRaw?.id && primaryRaw.repo ? toRepoConfig(primaryRaw) : DEFAULT_HERMES;

  const peersRaw = raw?.hermes_peers ?? raw?.openclaw_peers;
  const hermesPeers =
    Array.isArray(peersRaw) && peersRaw.length > 0
      ? peersRaw.map(toRepoConfig)
      : DEFAULT_HERMES_PEERS;

  const embeddedAiRepos =
    Array.isArray(raw?.embedded_ai_repos) && raw.embedded_ai_repos.length > 0
      ? raw.embedded_ai_repos.map(toRepoConfig)
      : DEFAULT_EMBEDDED_AI_REPOS;

  console.log(
    `[config] Loaded from ${configPath}: primary=${hermes.name} (${hermes.repo}), ` +
      `${hermesPeers.length} peers, ${embeddedAiRepos.length} embedded AI repos`,
  );

  return { hermes, hermesPeers, embeddedAiRepos };
}
