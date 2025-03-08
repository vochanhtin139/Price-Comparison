import { Helmet } from 'react-helmet-async'

import { CONFIG } from 'src/config-global'
import { ShopLinkView } from 'src/sections/shop-link/view'

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {`Shop crawler - ${CONFIG.appName}`}</title>
            </Helmet>

            <ShopLinkView />
        </>
    )
}
