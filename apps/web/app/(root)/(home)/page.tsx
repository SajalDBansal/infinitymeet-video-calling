import { Experience } from "./_components/Experience";
import { Features } from "./_components/Features";
import { Hero } from "./_components/Hero";
import { Trust } from "./_components/Trust";

export default function Home() {
    return (
        <div>
            <Hero />
            <Features />
            <Experience />
            <Trust />
        </div>
    )
}