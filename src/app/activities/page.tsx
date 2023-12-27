import Activities from "@/components/activities"
import SearchBar from "@/components/search-bar"

export default function Home() {
  return (
    <div className="mx-4">
      <div className="mx-auto py-10">
        <SearchBar />
      </div>
      <Activities />
    </div>
  )
}
