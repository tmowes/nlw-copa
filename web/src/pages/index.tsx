type HomeProps = {
  count: number
}

export default function Home(props: HomeProps) {
  const { count } = props

  return (
    <div>
      <h1>Contagem: {count}</h1>
    </div>
  )
}
export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count')
  const { count } = await response.json()

  return { props: { count } }
}
