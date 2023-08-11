import '@styles/global.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: 'Promptopia',
    description: 'A place to find writing prompts',
    image: '/assets/images/logo.svg',
}
const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <head>
                <link rel='icon' href='/assets/images/logo.svg' />
                <meta property='og:image' content={metadata.image} />
            </head>
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className='app'>
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout
