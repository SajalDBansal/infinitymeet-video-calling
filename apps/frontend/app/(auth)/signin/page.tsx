import { Authpage } from "../_components/Authpage";
import { Hero } from "../_components/Hero";

export default function SignIn() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 flex-1 overflow-hidden h-[calc(100vh-4rem)]">
            <div className="hidden md:block">
                {/* <Quote /> */}
                <Hero />
            </div>
            <div>
                <Authpage />
            </div>
        </div>
    )
}