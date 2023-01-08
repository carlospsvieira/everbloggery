export default function Message({children, username, avatar, description}) {
  return (
    <div className="bg-white p-8 border-b-2 rounded-lg">
      <div className="flex items-center">
        <img src={avatar} className="w-10 rounded-full" alt="avatar"/>
        <h2>user</h2>
      </div>
      <div>
        <span>Description</span>
      </div>
      {children}
    </div>
  )
}
