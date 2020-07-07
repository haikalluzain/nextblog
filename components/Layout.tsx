import Head from 'next/head'
import Navbar from 'components/Navbar'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => (
    <>
        <Head>
            <title>Blog App</title>
        </Head>
        <Navbar />
        {children}
    </>
)

export default Layout