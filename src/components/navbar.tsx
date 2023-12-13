"use client";

import Image from "next/image";
import NavLink from "./link";
import Logo from "./logo";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { GanttChart, Library, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import NavbarRecipes from "./navbar-recipes";

export default function Navbar() {
  const { data, status } = useSession();

  return (
    <div className="absolute z-20 w-full border-b-2 border-black bg-white text-black">
      <nav className="relative z-20 mx-auto flex h-20 w-full max-w-screen-2xl items-center justify-between font-bold">
        <Logo></Logo>

        <NavigationMenu.Root className="relative left-0 top-0 !z-20 flex h-full">
          <NavigationMenu.List className="center relative !z-20 m-0 flex h-full items-center gap-8 bg-white">
            <NavLink href="/">Home.</NavLink>
            <NavbarRecipes></NavbarRecipes>
            <NavLink
              variant="button"
              className=" border-2 px-4 py-2"
              href="/recipes/create"
            >
              Add your recipe
            </NavLink>
            <div className="h-2 w-2 rounded-full bg-black"></div>
            {status === "authenticated" ? (
              <div className="flex items-center gap-4">
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger className="text-xl hover:underline">
                    <Link href="/account/overview" prefetch={false}>
                      {data.user.name}
                    </Link>
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute right-0 top-0 z-0">
                    <div className="flex w-auto flex-col gap-2 rounded-b-lg border-2 border-t-0 border-black bg-white p-4 pt-0">
                      <NavigationMenu.Link
                        href="/account/overview"
                        className="flex items-center gap-3 p-2"
                      >
                        <GanttChart
                          size={24}
                          className="stroke-yellow-700"
                        ></GanttChart>
                        Overview
                      </NavigationMenu.Link>
                      <NavigationMenu.Link
                        href="/account/recipes?sortBy=latest"
                        className="flex items-center gap-3 p-2"
                      >
                        <Library
                          size={24}
                          className="stroke-yellow-700"
                        ></Library>
                        Your Recipes
                      </NavigationMenu.Link>
                      <NavigationMenu.Link
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex cursor-pointer items-center gap-3 rounded-md bg-red-100 p-2 hover:bg-red-200"
                      >
                        <LogOut size={24} className="stroke-red-500"></LogOut>
                        Log out
                      </NavigationMenu.Link>
                    </div>
                    {/* <div className="grid w-[500px] grid-cols-3 gap-x-4 rounded-b-lg border-2 border-t-0 border-black p-4 shadow-md">
                      <div className="row-span-2 flex items-center justify-center rounded-md border-2 bg-gray-200">
                        <Image
                          src="/featured/symbol2.svg"
                          alt="symbol2"
                          width={64}
                          height={64}
                        ></Image>
                      </div>{" "}
                    </div> */}
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
                <Image
                  src={data.user.image ?? ""}
                  alt="avatar-img"
                  width={48}
                  height={48}
                  className="rounded-full"
                ></Image>
              </div>
            ) : (
              <NavLink
                variant="button"
                href="/auth/login"
                className="bg-yellow-500"
              >
                Sign in / up
              </NavLink>
            )}
          </NavigationMenu.List>

          <div className="absolute left-0 top-[74px] !-z-10 w-full">
            <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut absolute left-0 top-0 -z-10 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] transition-[width,_height] duration-300" />
          </div>
        </NavigationMenu.Root>
      </nav>
    </div>
  );
}
