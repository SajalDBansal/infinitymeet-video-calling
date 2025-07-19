"use client";
import { Button } from "components/ui/button"
import { useMeetingStore } from "hooks/useMeetingStore";
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation";

export const MeetingHead = () => {
    const meetingData = useMeetingStore((state) => state.metadata);
    const router = useRouter();

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            UPCOMING: { color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', text: 'Upcoming' },
            LIVE: { color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400', text: 'Live' },
            COMPLETED: { color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400', text: 'Completed' }
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.UPCOMING;

        return (
            <span className={`px-3 py-1 text-sm rounded-full ${config.color}`}>
                {config.text}
            </span>
        );
    };

    return (
        <div className="mb-8">
            <div className="flex items-center mb-4">
                <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="mr-4"
                >
                    <ArrowLeft size={16} />
                    Back
                </Button>
                <div className="flex items-center space-x-3">
                    <h1 className="text-3xl font-bold ">
                        {meetingData?.title}
                    </h1>
                    {getStatusBadge(meetingData?.status || 'UPCOMING')}
                </div>
            </div>

            {meetingData?.description && (
                <p className="opacity-80 max-w-3xl">
                    {meetingData?.description}
                </p>
            )}
        </div>
    )
}