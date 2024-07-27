// import { useState } from "react"
// import { CategoryPills } from "./components/CategoryPills"
// import { categories, videos } from "./data/home"
import { PageHeader } from "./layouts/PageHeader"
import { VideoGridItem } from "./components/VideoGridItem"
import { videos } from "./data/home"

export default function App() {

  // const [selectedCategory, setSelectedCategory] = useState(categories[0])

  return <div className="max-h-screen flex flex-col justify-center">

    <PageHeader />

    <div className="grid gap-4 grid-cols-4  max-w-[1200px]">
      {videos.map(video => (
          <VideoGridItem key={video.id} {...video}/>
      ))}
    </div>

  </div>
  
}
