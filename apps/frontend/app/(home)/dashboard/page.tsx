import Actions from "./_components/Actions";
import Greet from "./_components/Greet";
import Previous from "./_components/Previous";
import Stats from "./_components/Stats";
import Upcoming from "./_components/Upcoming";

export default function Dashboard() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Greet />
            <Actions />
            <Upcoming />
            <Previous />
            <Stats />
        </div>
    )
}