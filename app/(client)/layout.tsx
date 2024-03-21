type Props = {
    children: React.ReactNode
}

export default function layout({children}: Props) {
  return (
    <section>
        <div>
            Client and Staff routes
        </div>
        <div>{children}</div>
    </section>
  )
}