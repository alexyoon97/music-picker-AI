import { MoodFinderAI } from "@/components/functions/moodFinder";
import { MusicGenres } from "@/components/functions/musicGenres";

const Home = () => {
    return(
        <div>
            <MoodFinderAI/>
            <MusicGenres/>
        </div>
    )
}

export default Home;