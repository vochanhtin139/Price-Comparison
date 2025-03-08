import { Helmet } from 'react-helmet-async'

import { CONFIG } from 'src/config-global'
import { CategoryLinkView } from 'src/sections/category-link/view'

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {`Category crawler - ${CONFIG.appName}`}</title>
            </Helmet>

            <CategoryLinkView />
        </>
    )
}
