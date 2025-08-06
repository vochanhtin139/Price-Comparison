import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OverviewAnalyticsView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Dashboard - ${CONFIG.appName}`}</title>
        <meta name="description" content="PriceWise" />
        <meta name="keywords" content="react,material" />
      </Helmet>

      <OverviewAnalyticsView />
    </>
  );
}
