
import { PageHeader } from "./layouts/PageHeader"
import { VideoGridItem } from "./components/VideoGridItem"
import { videos } from "./data/home"
import { useEffect, useState } from "react"
import cors from "./cors"

export default function App() {

  const [category, setCategory] = useState(0)

  const [data, setData] = useState([])


  const fetchData = async () => {
    const api_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=0&key=${process.env.API_KEY}`
    await fetch(api_url)
      .then(response => response.json())
      .then(data=>setData(data.items));
  }

  useEffect(() => {
    fetchData();
  },[category]);  

  return <div className="max-h-screen flex flex-col justify-center">

    <PageHeader />

    <div className="overflow-x-hidden px-8 pb-4">
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {data.map((item, index) => (
          <VideoGridItem key={index} data={item} />
        ))}
      </div>
    </div>

  </div>
  
}
