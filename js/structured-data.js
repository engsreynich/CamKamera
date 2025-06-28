// Structured Data for Camera Shop Website
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "ENG SREYNICH Camera Shop",
  "description": "Professional Camera Shop - Premium cameras, lenses, and accessories from Canon, Nikon, Sony, Sigma, and Lumix. Best prices and expert service.",
  "url": "https://your-domain.com",
  "logo": "https://your-domain.com/img/logo.png",
  "image": "https://your-domain.com/img/background.jpg",
  "telephone": "+1 (555) 123-4567",
  "email": "info@camerashop.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Photography Street",
    "addressLocality": "Camera City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "openingHours": [
    "Mo-Fr 09:00-18:00",
    "Sa 10:00-16:00"
  ],
  "priceRange": "$$$",
  "paymentAccepted": ["Cash", "Credit Card", "PayPal"],
  "currenciesAccepted": "USD",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Camera Equipment",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Professional Cameras",
          "description": "High-end digital cameras from leading brands"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Camera Lenses",
          "description": "Professional camera lenses for all photography needs"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Camera Accessories",
          "description": "Essential accessories for professional photography"
        }
      }
    ]
  },
  "sameAs": [
    "https://www.facebook.com/EngSreynichh",
    "https://www.instagram.com/camerashop",
    "https://www.twitter.com/camerashop"
  ]
};

// Product structured data examples
const productStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Canon EOS R6 Mark II Body",
    "image": "https://your-domain.com/canon/EOS R6 Mark II Body.webp",
    "description": "Professional mirrorless camera with advanced features",
    "brand": {
      "@type": "Brand",
      "name": "Canon"
    },
    "offers": {
      "@type": "Offer",
      "price": "1999.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "ENG SREYNICH Camera Shop"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Sony Alpha 7R V",
    "image": "https://your-domain.com/sony/Alpha 7R V Full-frame Mirrorless Interchangeable Lens Camera.webp",
    "description": "Full-frame mirrorless camera with exceptional image quality",
    "brand": {
      "@type": "Brand",
      "name": "Sony"
    },
    "offers": {
      "@type": "Offer",
      "price": "3399.99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "ENG SREYNICH Camera Shop"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "89"
    }
  }
];

// Breadcrumb structured data
const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://your-domain.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://your-domain.com/#products"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Brands",
      "item": "https://your-domain.com/#brands"
    }
  ]
};

// Organization structured data
const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ENG SREYNICH Camera Shop",
  "alternateName": "Camera Shop",
  "url": "https://your-domain.com",
  "logo": "https://your-domain.com/img/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567",
    "contactType": "customer service",
    "availableLanguage": ["English"]
  },
  "sameAs": [
    "https://www.facebook.com/EngSreynichh",
    "https://www.instagram.com/camerashop",
    "https://www.twitter.com/camerashop"
  ]
};

// Function to inject structured data into the page
function injectStructuredData() {
  // Main store data
  const storeScript = document.createElement('script');
  storeScript.type = 'application/ld+json';
  storeScript.textContent = JSON.stringify(structuredData);
  document.head.appendChild(storeScript);
  
  // Organization data
  const orgScript = document.createElement('script');
  orgScript.type = 'application/ld+json';
  orgScript.textContent = JSON.stringify(organizationStructuredData);
  document.head.appendChild(orgScript);
  
  // Breadcrumb data
  const breadcrumbScript = document.createElement('script');
  breadcrumbScript.type = 'application/ld+json';
  breadcrumbScript.textContent = JSON.stringify(breadcrumbStructuredData);
  document.head.appendChild(breadcrumbScript);
  
  // Product data (for featured products)
  productStructuredData.forEach(product => {
    const productScript = document.createElement('script');
    productScript.type = 'application/ld+json';
    productScript.textContent = JSON.stringify(product);
    document.head.appendChild(productScript);
  });
}

// Initialize structured data when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectStructuredData);
} else {
  injectStructuredData();
}

