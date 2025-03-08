import { Helmet } from 'react-helmet-async'

import { CONFIG } from 'src/config-global'
import { ProductLinkView } from 'src/sections/product-link/view'

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {`Product crawler - ${CONFIG.appName}`}</title>
            </Helmet>

            <ProductLinkView />
        </>
    )
}
