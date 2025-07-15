"use client";
import { Button } from "components/ui/button";
import { Card } from "components/ui/card";
import { useRouter } from "next/navigation";

export default function MeetingNotFound() {
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="p-12 text-center flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-2">Meeting Not Found</h2>
                <p className="opacity-80 mb-4">
                    The meeting you're looking for doesn't exist or has been removed.
                </p>
                <Button
                    variant="default"
                    onClick={() => router.back()}
                >
                    Back to Dashboard
                </Button>
            </Card>
        </div>
    )
}