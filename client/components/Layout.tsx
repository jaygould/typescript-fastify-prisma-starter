export default function Layout({ children }) {
  return (
    <>
      <header>
        <h1>Next.js, TypeScript, Fastify & Prisma starter</h1>
      </header>
      <main>{children}</main>
      <footer>By Jay Gould</footer>
    </>
  );
}
