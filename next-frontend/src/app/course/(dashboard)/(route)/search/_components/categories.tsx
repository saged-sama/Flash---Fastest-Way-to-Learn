"use client"

interface CategoriesProps {
    items: Category[]
}

import {
    FcMultipleDevices,
    FcAutomotive,
    FcSalesPerformance,
    FcBiotech,
    FcMindMap,
    FcAndroidOs,
    FcReddit,
    FcNumericalSorting12,
    FcMusic,
    FcScatterPlot,
    FcClapperboard,
    FcGlobe,
    FcBiomass
} from "react-icons/fc"
import { IconType } from "react-icons"
import { CategoryItem } from "./categotry-item";
import { Category } from "@/app/course/models/model";

const iconMap: Record<Category["name"], IconType> = {
    "Computer Science": FcMultipleDevices,
    "Physics": FcAutomotive,
    "Statistics": FcSalesPerformance,
    "Biology": FcBiotech,
    "Chemisty": FcBiomass,
    "App Developement": FcAndroidOs,
    "Artificial Intelligence": FcReddit,
    "Mathematics": FcNumericalSorting12,
    "Music": FcMusic,
    "Art": FcClapperboard,
    "Machine Learning": FcScatterPlot,
    "Science": FcMindMap,
    "Web Developement": FcGlobe
}

export const Categories = ({
    items
}: CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-scroll scrollbar-hide pb-2 px-1 py-2">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    )
}

