"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryProps {
  label: string;
  value?: string;
  icon?: IconType;
}

export const CategoryItem = ({ label, value, icon: Icon }: CategoryProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId == value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };

  return (
    <Button
        onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-slate-700 transition",
        isSelected && "border-orange-700 bg-orange-200/20 text-orange-800"
      )}
      
      type="button"
      variant="ghost"
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </Button>
  );
};
