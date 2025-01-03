import { IconBadge } from "@/components/course/icon-badge";
import { Icon, LucideIcon } from "lucide-react";

interface InfoCardProps {
    numberOfItems: number;
    variant?: "default" | "success";
    label: string;
    icon: LucideIcon
}

export const InfoCard = ({
    icon: Icon,
    label,
    numberOfItems,
    variant
}: InfoCardProps) => {
    return (
        <div className="border rounded-md flex items-center gap-x-2 p-3">
            <IconBadge
                variant={variant}
                size="default"
                icon={Icon}
            />
            <div>
                <p className="font-bold">
                    {label}
                </p>
                <p className="text-gray-500 text-sm">
                    {numberOfItems} {numberOfItems == 1? "course" : "courses"}
                </p>
            </div>
        </div>
    )
}
