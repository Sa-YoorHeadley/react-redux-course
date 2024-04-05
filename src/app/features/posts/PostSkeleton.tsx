import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostsExcerpt() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 items-center">
        <Skeleton className="w-full h-12" />
        <CardDescription>
          <Skeleton className="h-6 flex-grow" />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Skeleton className="h-4 flex-grow mt-4" />
      </CardContent>
      <CardFooter className="flex gap-4">
        <Skeleton className="w-16 h-8" />
        <Skeleton className="w-16 h-8" />
        <Skeleton className="w-16 h-8" />
        <Skeleton className="w-16 h-8" />
        <Skeleton className="w-16 h-8" />
      </CardFooter>
    </Card>
  );
}
