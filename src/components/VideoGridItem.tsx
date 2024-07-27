import { useEffect, useRef, useState } from "react"
import { formatDuration } from "../utils/formatDuration"
import { formatTimeAgo } from "../utils/formatTimeAgo"

type VideoGridItemProps = {
    id:string
    title:string
    channel:{
        id: string
        name: string
        profileUrl:string
    },
    views: number
    postedAt: Date
    duration: number
    thumbnailUrl: string
    videoUrl: string
}

const VIEWS_FORMAT = Intl.NumberFormat(undefined, {notation: "compact"})

export function VideoGridItem(
    {id, title, channel, views, postedAt, duration, thumbnailUrl, videoUrl}: VideoGridItemProps) {

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

            <a href={`/watch?v=${id}`} className="relative aspect-video">
                <img src={thumbnailUrl}  
                    className={`bloxk w-full h-full object-cover rounded-xl 
                        transition-[border-radius] duration-200 
                        ${isPlaying ? "rounded-none" : "rounded-xl" }`} />
                
                <div className="absolute bottom-1 right-1 bg-secondary-dark 
                        text-secondary text-sm px-.5 rounded">
                    {formatDuration(duration)}
                </div>

                <video 
                    className={`block h-full object-cover absolute inset-0 
                            transition-opacity duration-200 delay-200
                            ${isPlaying ? "opacity-100" : "opacity-0"  }`}
                    ref={videoRef} 
                    muted 
                    playsInline 
                    src={videoUrl} />
            </a>

            <div className="flex gap-2">
                <a href={`/@${channel.id}`}>
                    <img src={channel.profileUrl} className="w-12 h-12 rounded-full" />
                </a>
                <div className="flex flex-col">
                    <a href={`/watch?v=${id}`} className="font-bold">
                        {title}
                    </a>
                    <a href={`/@${channel.id}`} className="text-secondary-text text-sm">
                        {channel.name}
                    </a>
                    <div className="text-secondary-text text-sm">
                        { VIEWS_FORMAT.format(views) } Views • {formatTimeAgo(postedAt)}
                    </div>
                </div>
            </div>
        </div>
    )
}