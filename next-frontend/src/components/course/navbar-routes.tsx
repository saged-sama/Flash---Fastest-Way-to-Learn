"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter;

  const isTeacherPage = pathname?.startsWith("/course/teacher");
  const isPlayerPage = pathname?.startsWith("/course/courses");
  const isSearchPage = pathname?.startsWith("/course/search");

  return (
    <>
    {isSearchPage && (
        <div className="hidden md:block">
            <SearchInput />
        </div>
    )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isPlayerPage ? (
          <Link href="/course">
            <Button size="sm" variant="ghost" className="font-bold">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : (
          <Link href="/course/teacher/courses">
            <Button size="sm" variant="ghost" className="font-bold">
              Teacher Mode
            </Button>
          </Link>
        )}
      </div>
    </>
  );
};
