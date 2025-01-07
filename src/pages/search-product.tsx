import { Helmet } from 'react-helmet-async'

import { CONFIG } from 'src/config-global'

// eslint-disable-next-line import/no-cycle
import { SearchProductView } from 'src/sections/search-product/view'

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {`Search products - ${CONFIG.appName}`}</title>
            </Helmet>

            <SearchProductView />
        </>
    )
}
