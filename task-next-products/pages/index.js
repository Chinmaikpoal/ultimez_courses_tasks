import Head from 'next/head';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import ErrorMessage from '../components/ErrorMessage';

export default function HomePage({ products = [], error = null }) {
  const hasError = Boolean(error);
  const totalProducts = products.length;

  return (
    <>
      <Head>
        <title>Ultimez Products List | Next.js Server-Side Props</title>
        <meta
          name="description"
          content="Products listing page built with Next.js Pages Router and getServerSideProps fetching data from Fake Store API."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Header />

      <main className="main-container">
        <section className="hero">
          <p className="hero-subtitle">Ultimez Frontend Developer Training</p>
          <h2 className="hero-title">Discover Our Curated Collection</h2>
          <p className="hero-description">
            Explore premium electronics, jewelry, and apparel dynamically loaded on the server using Next.js <code>getServerSideProps</code>.
          </p>

          {!hasError && (
            <div className="hero-stats">
              <span>Showing <strong>{totalProducts}</strong> products</span>
              <span>&bull;</span>
              <span>Data Source: <strong>Fake Store API</strong></span>
              <span>&bull;</span>
              <span>Rendering: <strong>Server-Side (SSR)</strong></span>
            </div>
          )}
        </section>

        {hasError ? (
          <ErrorMessage
            message={error}
            onRetry={() => {
              if (typeof window !== 'undefined') {
                window.location.reload();
              }
            }}
          />
        ) : (
          <section className="products-grid" aria-label="Products Collection">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        )}

        <footer className="page-footer">
          <p>
            Ultimez Training Task &bull; Next.js Pages Router &bull;{' '}
            <a
              href="https://github.com/Chinmaikpoal/ultimez_courses_tasks"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}

/**
 * Server-Side Props implementation
 * Fetches products from Fake Store API on every request at runtime.
 */
export async function getServerSideProps() {
  try {
    let response;
    try {
      response = await fetch('https://fakestoreapi.com/products/');
    } catch (initialFetchErr) {
      // Gracefully handle local network environments with SSL interception / corporate proxies
      if (
        initialFetchErr?.cause?.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' ||
        initialFetchErr?.message?.includes('certificate')
      ) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        response = await fetch('https://fakestoreapi.com/products/');
      } else {
        throw initialFetchErr;
      }
    }

    if (!response.ok) {
      throw new Error(`API responded with status code: ${response.status}`);
    }

    const products = await response.json();

    return {
      props: {
        products: Array.isArray(products) ? products : [],
        error: null,
      },
    };
  } catch (err) {
    // Graceful error handling: log server-side and return user-friendly error prop
    console.error('[getServerSideProps Error]: Failed to fetch products from Fake Store API', err.message);

    return {
      props: {
        products: [],
        error: 'Unable to load products right now. Please verify your network connection and reload.',
      },
    };
  }
}
