export const wait = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export async function mockRequest<T>(handler: () => T | Promise<T>, ms = 350): Promise<T> {
  await wait(ms);
  return handler();
}
