import Image from 'next/image'

import previewImg from '../assets/mobile-preview.png'
import avataresImg from '../assets/avatares.png'
import logoSvg from '../assets/logo.svg'
import checkSvg from '../assets/check-icon.svg'

type HomeProps = {
  usersCount: number
  poolsCount: number
  guessesCount: number
}

export default function Home(props: HomeProps) {
  const { guessesCount, poolsCount, usersCount } = props

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center">
      <main className="max-w-[489px]">
        <Image src={logoSvg} alt="NLW Copa" />
        <h1 className="text-5xl text-white font-bold leading-tight mt-14">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>
        <div className="mt-10 flex items-center gap-2">
          <Image src={avataresImg} alt="avatares de usuários que já utilizam o app" />
          <strong className="text-gray-100 text-lg">
            <span className="text-ignite-500">+{usersCount}</span> pessoas já estão usando
          </strong>
        </div>
        <form className="mt-10 flex gap-2">
          <input
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-ignite-500 text-sm"
          />
          <button
            className="bg-yellow-500 text-gray-900 uppercase font-bold text-sm px-4 py-2 rounded hover:bg-yellow-600 transition duration-200"
            type="submit"
          >
            criar meu bolão
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-300 max-w-[400px] leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar para convidar
          outras pessoas 🚀
        </p>
        <div className="mt-10 pt-10 flex justify-between border-t border-gray-600">
          <div className="flex items-center gap-6">
            <Image src={checkSvg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{poolsCount}</span>
              <span className="text-sm text-gray-100">Bolões criados</span>
            </div>
          </div>
          <div className="border-r border-gray-600" />
          <div className="flex items-center gap-6">
            <Image src={checkSvg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{guessesCount}</span>
              <span className="text-sm text-gray-100">Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image
        src={previewImg}
        alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa"
        quality={100}
      />
    </div>
  )
}
export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count')
  const { count } = await response.json()

  return {
    props: {
      usersCount: count,
      poolsCount: count,
      guessesCount: count,
    },
  }
}
