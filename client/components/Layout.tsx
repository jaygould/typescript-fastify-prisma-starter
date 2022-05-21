import Link from "next/link";
import { FC, PropsWithChildren, ReactComponentElement } from "react";

type Props = {
  children: JSX.Element;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <header className="bg-lime-800">
        <div className="container py-10">
          <h1 className="text-center text-2xl text-white">
            Next.js, TypeScript, Fastify & Prisma starter
          </h1>
        </div>
      </header>
      <main className="container py-10 mb-auto">{children}</main>
      <footer className="w-full bg-orange-700">
        <div className="container py-10">
          <div className="flex items-center gap-2">
            <Link href="https://jaygould.co.uk/2022-05-08-typescript-fastify-prisma-starter-with-docker/">
              <a className="text-white underline">By Jay Gould</a>
            </Link>
            <Link href="https://github.com/jaygould/typescript-fastify-prisma-starter/">
              <a className="text-white underline">GitHub</a>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
