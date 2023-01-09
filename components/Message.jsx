export default function Message({children, username, avatar, description}) {
  return (
    <div className="bg-white p-8 border-b-2 rounded-lg">
      <div className="flex items-center gap-2">
        <img src={avatar} className="w-10 rounded-full" alt="avatar"/>
        <h2 className="font-bold">{username}</h2>
      </div>
      <div className="py-4">
        <span>{description}</span>
      </div>
      {children}
    </div>
  )
}
