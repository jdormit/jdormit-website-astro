import type { AstroIntegration } from "astro";

export default function cljs(): AstroIntegration {
  return {
    name: 'clojurescript-integration',
    hooks: {
      'astro:server:start': async () => {
        const { spawn } = await import('child_process');
        const nrepl = spawn('clojure', ['-M:nrepl',], { stdio: 'inherit' });

        process.on('SIGTERM', () => nrepl.kill());
        process.on('exit', () => nrepl.kill());
      },
      'astro:build:start': async () => {
        const { execSync } = await import('child_process');
        try {
          execSync('clojure -M -m figwheel.main -O advanced -bo dev', { stdio: 'inherit' });
        } catch (error) {
          console.error('ClojureScript compilation failed:', error);
          throw error;
        }
      }
    }
  }
}
