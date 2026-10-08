// In-browser SIMULATION of MiniRedis commands (PING, SET, GET).
// Browsers cannot open raw TCP sockets, so this does not talk to the real
// Java server. To go live, replace `execute` with a call to an HTTP adapter
// that forwards commands to the MiniRedis TCP server.

export type SimResult = { output: string; ok: boolean };

export function createMiniRedisSim() {
  const store = new Map<string, string>();

  function execute(line: string): SimResult {
    const parts = line.trim().split(/\s+/).filter(Boolean);
    const cmd = parts[0]?.toUpperCase();
    if (!cmd) return { output: "", ok: true };
    switch (cmd) {
      case "PING":
        return { output: parts[1] ?? "+PONG", ok: true };
      case "SET":
        if (parts.length < 3) return { output: "-ERR wrong number of arguments for 'set'", ok: false };
        store.set(parts[1]!, parts.slice(2).join(" "));
        return { output: "+OK", ok: true };
      case "GET":
        if (parts.length !== 2) return { output: "-ERR wrong number of arguments for 'get'", ok: false };
        return { output: store.get(parts[1]!) ?? "(nil)", ok: true };
      default:
        return { output: `-ERR unknown command '${parts[0]}' (try PING, SET, GET)`, ok: false };
    }
  }

  return { execute };
}
