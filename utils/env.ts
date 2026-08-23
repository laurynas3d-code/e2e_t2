export type Environment = 'uat-eshop' | 'test-eshop' | 'test2-eshop';

export function getCurrentEnv(): string {
  return process.env.ENV ?? 'uat-eshop';
}

export function resolveByEnv<T>(map: Record<Environment, T>): T {
  const env = getCurrentEnv();
  if (env in map) return map[env as Environment];
  throw new Error(`No value configured for environment: "${env}"`);
}