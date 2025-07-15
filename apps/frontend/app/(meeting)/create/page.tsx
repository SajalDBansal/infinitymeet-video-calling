import { Button } from "components/ui/button";
import { Card } from "components/ui/card";
import { Calendar, Plus } from "lucide-react";
import Link from "next/link";

export default function Create() {
    return (
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center pb-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold ">Create a Meeting</h2>
                    <p className="mt-2 opacity-80">
                        Schedule a new meeting or start instantly
                    </p>
                </div>

                <Card className="backdrop-blur-lg p-8">
                    <Link href="#" className="mx-auto">
                        <Button
                            variant="outline"
                            className="p-5"
                        >
                            <Plus size={16} />
                            Start an Instant Meeting
                        </Button>
                    </Link>

                    <Link href="/schedule" className="mx-auto">
                        <Button
                            variant="outline"
                            className="p-5"
                        >
                            <Calendar size={16} />
                            Schedule a Meeting
                        </Button>
                    </Link>

                </Card>
            </div>
        </div>
    )
}