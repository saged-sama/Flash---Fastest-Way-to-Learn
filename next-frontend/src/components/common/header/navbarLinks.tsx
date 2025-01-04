'use client';
import Link from "next/link";
import { useState } from "react";
import NavLink from "./navLink";

export default function NavbarLinks() {
  const [click, setClick] = useState(false);
    return (
        <ul
          className={`${click
            ? "absolute top-[7vh] left-0 w-full bg-orange-500 flex flex-col items-center py-4"
            : "flex space-x-10 items-center"
            }`}
          onClick={() => setClick(false)}
        >
            <NavLink href="/about">
                About Us
            </NavLink>
            <NavLink href="/course">
                Courses
            </NavLink>
            <NavLink href="/journal">
                Guideline
            </NavLink>
            <NavLink href="/subs/sessions">
                Live Sessions
            </NavLink>
        </ul>
    )
}