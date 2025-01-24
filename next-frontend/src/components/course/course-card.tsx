import Link from "next/link";
import Image from "next/image";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { CourseProgress } from "./course-progress";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number | null;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/course/courses/${id}`} className="bg-white min-w-40">
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-bold group-hover:text-orange-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            {chaptersLength != null &&
              <div className="flex items-center gap-x-1 text-slate-500">
                <IconBadge variant="default" size="sm" icon={BookOpen} />
                <span>
                  {chaptersLength} {chaptersLength === 1 ? "chapter" : "chapters"}
                </span>
              </div>
            }
          </div>
          {progress != null ? (
            <CourseProgress
                variant={progress == 100? "success" : "default"}
                value={progress!}
                size={"sm"}
            />
          ) : (
            <p className="text-md md:text-start font-bold text-slate-700">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
