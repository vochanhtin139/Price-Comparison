import { Helmet } from 'react-helmet-async'

import { CONFIG } from 'src/config-global'
import ConfigCrawler from 'src/sections/config-crawler'

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {`Product crawler - ${CONFIG.appName}`}</title>
            </Helmet>

            <ConfigCrawler />
        </>
    )
}
