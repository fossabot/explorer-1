import Activities from "@/components/activities"
import SearchBar from "@/components/search-bar"

export default function ActivitiesPage() {
  return (
    <>
      <div className="mx-auto py-10">
        <SearchBar />
      </div>
      <Activities />
    </>
  )
}
