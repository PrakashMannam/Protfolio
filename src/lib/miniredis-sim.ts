// In-browser SIMULATION of MiniRedis (github.com/PrakashMannam/mini-redis-java).
// Mirrors the server's command router: PING, SET [EX], GET, DEL, EXISTS, KEYS,
// with replies shown the way redis-cli renders the server's RESP responses.
// Browsers cannot open raw TCP sockets, so this never talks to the Java server.

export type SimResult = { output: string; ok: boolean };

export function createMiniRedisSim() {
  const store = new Map<string, string>();
  const expiry = new Map<string, number>();
  const err = (m: string): SimResult => ({ output: `(error) ERR ${m}`, ok: false });

  function alive(key: string) {
    const at = expiry.get(key);
    if (at !== undefined && Date.now() > at) {
      store.delete(key);
      expiry.delete(key);
    }
    return store.has(key);
  }

  function execute(line: string): SimResult {
    const parts = line.trim().split(/\s+/).filter(Boolean);
    const cmd = parts[0]?.toUpperCase();
    if (!cmd) return { output: "", ok: true };
    switch (cmd) {
      case "PING":
        return { output: "PONG", ok: true };
      case "SET": {
        if (parts.length < 3) return err("wrong number of arguments for 'SET'");
        store.set(parts[1]!, parts[2]!);
        if (parts.length === 5 && parts[3]!.toUpperCase() === "EX") {
          const s = Number.parseInt(parts[4]!, 10);
          if (Number.isNaN(s)) return err("value is not an integer");
          expiry.set(parts[1]!, Date.now() + s * 1000);
        }
        return { output: "OK", ok: true };
      }
      case "GET":
        if (parts.length < 2) return err("wrong number of arguments for 'GET'");
        return { output: alive(parts[1]!) ? `"${store.get(parts[1]!)}"` : "(nil)", ok: true };
      case "DEL":
        if (parts.length < 2) return err("wrong number of arguments for 'DEL'");
        return { output: `(integer) ${store.delete(parts[1]!) ? 1 : 0}`, ok: true };
      case "EXISTS":
        if (parts.length < 2) return err("wrong number of arguments for 'EXISTS'");
        return { output: `(integer) ${alive(parts[1]!) ? 1 : 0}`, ok: true };
      case "KEYS": {
        const keys = [...store.keys()].filter(alive);
        return { output: keys.length ? keys.map((k, i) => `${i + 1}) "${k}"`).join("\n") : "(empty array)", ok: true };
      }
      default:
        return err(`unknown command '${cmd}'`);
    }
  }

  return { execute };
}
