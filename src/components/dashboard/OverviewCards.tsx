// D:\yeamin student\Programming hero level 2\Assignment6\ParcelGo\src\components\dashboard\OverviewCards.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Package,
  CheckCircle,
  Truck,
  Clock,
  XCircle,
} from "lucide-react";

interface Stat {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

interface OverviewCardsProps {
  stats: Stat[];
  isLoading: boolean;
}

const icons: Record<string, React.ReactNode> = {
  "Total Parcels": <Package className="h-5 w-5 text-indigo-500" />,
  Delivered: <CheckCircle className="h-5 w-5 text-green-500" />,
  "In Transit": <Truck className="h-5 w-5 text-blue-500" />,
  Requested: <Clock className="h-5 w-5 text-yellow-500" />,
  Cancelled: <XCircle className="h-5 w-5 text-red-500" />,
};

const OverviewCard: React.FC<Stat> = ({ title, value, description }) => {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icons[title]}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

const OverviewCards: React.FC<OverviewCardsProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card
            key={index}
            className="rounded-2xl shadow-sm"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-1/3 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <OverviewCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default OverviewCards;
