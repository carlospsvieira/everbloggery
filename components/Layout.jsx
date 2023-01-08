import Nav from "./Nav"

export default function Layouts({ children }) {
  return (
    <div className="mx-6 md:max-w-2xl md:mx-auto">
      <Nav />
      <main>{children}</main>
    </div>
  )
}
