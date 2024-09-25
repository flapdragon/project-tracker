import { useEffect } from "react"
import { useSelector } from "react-redux"

// TODO: Make actual dashbaord not random card

const Dashboard = () => {
  const isLoggedIn = useSelector((state) => {
    console.log(state)
    return state.auth.isLoggedIn
})

  useEffect(() => {
    console.log(isLoggedIn)
  }, [isLoggedIn])


  return (
    <div className="flex flex-col rounded-2xl w-96 bg-[#ffffff] shadow-xl">
      <figure className="flex justify-center items-center rounded-2xl">
          <img src="https://tailwind-generator.b-cdn.net/images/card-generator/tailwind-card-generator-card-preview.png" alt="Card Preview" className="rounded-t-2xl" />
      </figure>
      <div className="flex flex-col p-8">
          <div className="text-2xl font-bold   text-[#374151] pb-6">Dashboard</div>
          <div className=" text-lg text-[#374151]">Do stuff</div>
          <div className="flex justify-end pt-6">
              <button className="bg-[#7e22ce] text-[#ffffff]  font-bold text-base  p-3 rounded-lg hover:bg-purple-800 active:scale-95 transition-transform transform">Try it out!</button>
          </div>
      </div>
  </div>
  )
}

export default Dashboard
