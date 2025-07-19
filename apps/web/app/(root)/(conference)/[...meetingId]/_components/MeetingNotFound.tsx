"use client";
import { Button } from "components/ui/button"
import { Card } from "components/ui/card"
import { useRouter } from "next/navigation"

export const MeetingNotFound = () => {
    const router = useRouter();
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Card className="p-12 text-center">
                <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">Meeting Not Found</h2>
                <p className="text-light-text dark:text-dark-text opacity-80 mb-6">
                    The meeting you're trying to join doesn't exist.
                </p>
                <Button variant="default" onClick={() => { router.push('/dashboard') }}>
                    Back to Dashboard
                </Button>
            </Card>
        </div>
    )
}