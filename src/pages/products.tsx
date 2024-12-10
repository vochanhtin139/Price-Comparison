import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

// eslint-disable-next-line import/no-cycle
import { ProductsView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Products - ${CONFIG.appName}`}</title>
      </Helmet>

      <ProductsView />
    </>
  );
}
