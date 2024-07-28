import { useEffect, useRef, useState } from "react"
import { formatDuration } from "../utils/formatDuration"
import { formatTimeAgo } from "../utils/formatTimeAgo"
import moment from "moment"

const VIEWS_FORMAT = Intl.NumberFormat(undefined, {notation: "compact"})

    export function VideoGridItem(item) {

        const { id, snippet={}, contentDetails={}, statistics = {} } = item.data;
        const { title, channelId, channelTitle, publishedAt, thumbnails={} } = snippet;
        const { medium = {} } = thumbnails;
        const { duration } = contentDetails;
        const { viewCount } = statistics;

        const [isPlaying, setIsPlaying] = useState(false)
        const videoRef = useRef<HTMLVideoElement>()

        useEffect(() => {
            if(videoRef.current == null) return
            if(isPlaying) {
                videoRef.current.currentTime = 0
                videoRef.current.play()
            } else [
                videoRef.current.pause()
            ]
        }, [isPlaying])

    return (
        <div className="flex flex-col gap-2" 
            onMouseEnter = {() => setIsPlaying(true)} 
            onMouseLeave = {() => setIsPlaying(false)}>

            <a href={`https://youtube.com/watch?v=${id}`} className="relative aspect-video">
                <img src={medium.url}  
                    className={`bloxk w-full h-full object-cover rounded-xl transition-[border-radius] duration-200 ${isPlaying ? "rounded-none" : "rounded-xl" }`} />
                
                <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-.5 rounded">
                    {formatDuration(moment.duration(duration).asSeconds())}
                </div>

                <video src={`https://youtube.com/watch?v=${id}`}
                    className={`block h-full object-cover absolute inset-0  transition-opacity duration-200 delay-200 ${isPlaying ? "opacity-100" : "opacity-0"  }`}
                    ref={videoRef} 
                    muted 
                    playsInline />
            </a>

            <div className="flex gap-2">
                <a href={`/@${channelId}`}>
                    {/* <img src={channel.profileUrl} className="w-12 h-12 rounded-full" /> */}
                </a>
                <div className="flex flex-col">
                    <a href={`/watch?v=${id}`} className="font-bold">
                        { title }
                    </a>
                    <a href={`/@${channelId}`} className="text-secondary-text text-sm">
                        { channelTitle }
                    </a>
                    <div className="text-secondary-text text-sm">
                        { VIEWS_FORMAT.format(viewCount) } Views • {formatTimeAgo(publishedAt)}
                    </div>
                </div>
            </div>
        </div>
    )
}