import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

interface DataCardProps {
    value: number;
    label: string;
    format?: boolean;
}

export const DataCard = ({
    value,
    label,
    format
}: DataCardProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {format? formatPrice(value) : value}
                </div>
            </CardContent>
        </Card>
    )
}