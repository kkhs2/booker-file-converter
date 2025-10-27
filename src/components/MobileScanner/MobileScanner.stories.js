/**
 * Storybook configuration for the MobileScanner component
 * This defines how the MobileScanner component will appear in Storybook and what controls/options are available.
 */

// Import the component
import { DefaultArgs as DefaultProductArgs } from '../ProductCard/ProductCard.stories';
import MobileScanner from './MobileScanner';
import { useState, useEffect } from 'preact/hooks';

// Define the story configuration
export default {
  // The title under which the MobileScanner component will appear in Storybook's navigation
  title: 'Components/Mobile Scanner',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    title: {
      control: 'text',
      description: 'Title displayed in the scanner header',
      defaultValue: 'Mobile Scanner',
    },
    onclose: {
      action: 'closed',
      description: 'Function called when the scanner is closed',
    },
    results: {
      control: 'array',
      description: 'Array of product results to display in the scanner',
      defaultValue: [],
    },
    loading: {
      control: 'boolean',
      description: 'Indicates if the scanner is in a loading state',
      defaultValue: false,
    },
    children: {
      control: 'text',
      description: 'Content to display within the scanner',
      defaultValue: '<div>scandit component</div>',
    },

    classname: {
      control: 'text',
      description: 'Additional CSS classes to apply to the component',
      defaultValue: '',
    },
  },

  // Added to override default story height if needed for this component
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
    docs: {
      description: {
        component: `
# MobileScanner Component

MobileScanner component for scanning products on mobile devices.

## Custom Events

### closeMobileSearch Event

The MobileScanner component automatically dispatches a custom event when mounted to close any open mobile search interfaces.

**Event Details:**
- **Event Name:** \`closeMobileSearch\`
- **Event Type:** CustomEvent
- **Detail Object:** \`{ source: 'MobileScanner' }\`
- **Trigger:** Component mount (useEffect with empty dependency array)

**Usage:**
\`\`\`javascript
// Listen for the event in other components
useEffect(() => {
  const handleCloseMobileSearch = (event) => {
    if (event.detail?.source === 'MobileScanner') {
      // Close mobile search interface
      setIsSearchOpen(false);
    }
  };

  document.addEventListener('closeMobileSearch', handleCloseMobileSearch);
  
  return () => {
    document.removeEventListener('closeMobileSearch', handleCloseMobileSearch);
  };
}, []);
\`\`\`

**Purpose:** This event ensures that when the MobileScanner is opened, any existing mobile search overlay is automatically closed to prevent UI conflicts and provide a better user experience.

## Props

See the controls below for all available props and their descriptions.
          `,
      },

      height: '100vh', // Set the height of the story to full viewport height
    },
  },
};

/**
 * Default story.
 * Demonstrates basic usage with default settings.
 */

export const Default = () => (
  <MobileScanner
    title="Sheffield Booker"
    onclose={() => console.log('Scanner closed')}
    results={[]}
    loading={false}
    hidebottompanel={true}
  >
    <div className="tw:flex tw:w-full tw:justify-center tw:bg-gray-100 tw:pt-40">
      scandit component
    </div>
  </MobileScanner>
);

/**
 * Loading state story.
 * Demonstrates the loading state of the MobileScanner component.
 */
export const Loading = () => (
  <MobileScanner
    title="Sheffield Booker"
    onclose={() => console.log('Scanner closed')}
    results={[]}
    loading={true}
  >
    <div className="tw:flex tw:w-full tw:justify-center tw:bg-gray-100 tw:pt-40">
      scandit component
    </div>
  </MobileScanner>
);

/**
 * No results story.
 * Demonstrates the MobileScanner component with no results.
 */
export const NoResults = () => (
  <MobileScanner
    title="Sheffield Booker"
    onclose={() => console.log('Scanner closed')}
    results={[]}
    loading={false}
  >
    <div className="tw:flex tw:w-full tw:justify-center tw:bg-gray-100 tw:pt-40">
      scandit component
    </div>
  </MobileScanner>
);

/**
 * Results story.
 * Demonstrates the MobileScanner component with mock results.
 */
export const Results = () => (
  <MobileScanner
    title="Sheffield Booker"
    onclose={() => console.log('Scanner closed')}
    results={
      // Mock data for demonstration purposes
      Array(5)
        .fill()
        .map((_) => ({
          ...DefaultProductArgs,
          offer: null,
          tags: null,
          butchersnote: null,
          storageinfo: null,
          deliveryinfo: null,
          dietaryinfo: null,
        }))
    }
    loading={false}
  >
    <div className="tw:flex tw:w-full tw:justify-center tw:bg-gray-100 tw:pt-40">
      scandit component
    </div>
  </MobileScanner>
);

/**
 * Results story.
 * Demonstrates the MobileScanner component with mock results.
 */
export const OneResult = () => (
  <MobileScanner
    title="Sheffield Booker"
    onclose={() => console.log('Scanner closed')}
    results={
      // Mock data for demonstration purposes
      Array(1)
        .fill()
        .map((_) => ({
          ...DefaultProductArgs,
          offer: null,
          tags: null,
          butchersnote: null,
          storageinfo: null,
          deliveryinfo: null,
          dietaryinfo: null,
        }))
    }
    loading={false}
  >
    <div className="tw:flex tw:w-full tw:justify-center tw:bg-gray-100 tw:pt-40">
      scandit component
    </div>
  </MobileScanner>
);

/**
 * Product list with out of stock item story.
 * Demonstrates the MobileScanner component with a list of products where one is out of stock.
 */
export const ProductListWithOutOfStock = () => (
  <MobileScanner
    title="Sheffield Booker"
    onclose={() => console.log('Scanner closed')}
    results={
      // Mock data with mixed availability
      [
        {
          ...DefaultProductArgs,
          name: 'Fresh Salmon Fillet',
          price: 8.99,
          availability: {
            status: 'inStock',
          },
          offer: null,
          tags: ['fresh'],
          butchersnote: null,
          storageinfo: 'chilled',
          deliveryinfo: 'chilled-delivery',
          dietaryinfo: null,
        },
        {
          ...DefaultProductArgs,
          name: 'Organic Free Range Chicken Breast',
          price: 12.5,

          availability: {
            status: 'outOfStock',
            outofstocknotice: 'Out of stock in all stores',
            alternativeaction: () => console.log('View alternatives clicked'),
            alternativelabel: 'View alternative products',
          },
          offer: null,
          tags: null,
          butchersnote: null,
          storageinfo: 'chilled',
          deliveryinfo: 'chilled-delivery',
          dietaryinfo: null,
        },
        {
          ...DefaultProductArgs,
          name: 'Premium Beef Mince',
          price: 6.75,
          availability: {
            status: 'inStock',
          },
          offer: {
            label: 'Special Offer',
            date: 'until 30th Sep',
            prevText: 'Was £7.50',
            discountText: 'Save £0.75',
          },
          tags: ['premium'],
          butchersnote: null,
          storageinfo: 'chilled',
          deliveryinfo: 'chilled-delivery',
          dietaryinfo: null,
        },
        {
          ...DefaultProductArgs,
          name: 'Fresh Cod Fillets',
          price: 9.25,
          availability: {
            status: 'lowStock',
          },
          offer: null,
          tags: ['fresh', 'sustainable'],
          butchersnote: null,
          storageinfo: 'chilled',
          deliveryinfo: 'chilled-delivery',
          dietaryinfo: null,
        },
      ]
    }
    loading={false}
  >
    <div className="tw:flex tw:w-full tw:justify-center tw:bg-gray-100 tw:pt-40">
      scandit component
    </div>
  </MobileScanner>
);

/**
 * Custom Event Demo story.
 * Demonstrates the closeMobileSearch custom event functionality.
 * This story shows how the MobileScanner automatically dispatches
 * a custom event when mounted to close mobile search interfaces.
 */
export const CustomEventDemo = () => {
  // Mock function to simulate mobile search state
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Listen for the custom event
  useEffect(() => {
    const handleCloseMobileSearch = (event) => {
      if (event.detail?.source === 'MobileScanner') {
        console.log('📱 closeMobileSearch event received:', event.detail);
        setMobileSearchOpen(false);
      }
    };

    document.addEventListener('closeMobileSearch', handleCloseMobileSearch);

    return () => {
      document.removeEventListener(
        'closeMobileSearch',
        handleCloseMobileSearch,
      );
    };
  }, []);

  return (
    <div className="tw:relative tw:h-screen tw:w-full">
      {/* Mock Mobile Search Overlay */}
      {mobileSearchOpen && (
        <div className="tw:bg-opacity-50 tw:absolute tw:inset-0 tw:z-50 tw:flex tw:items-center tw:justify-center tw:bg-blue-500">
          <div className="tw:rounded-lg tw:bg-white tw:p-6 tw:text-center">
            <h3 className="tw:mb-2 tw:text-lg tw:font-bold">
              Mobile Search Open
            </h3>
            <p className="tw:mb-4">
              This simulates an open mobile search interface
            </p>
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="tw:rounded tw:bg-red-500 tw:px-4 tw:py-2 tw:text-white"
            >
              Close Search
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <div className="tw:absolute tw:top-4 tw:left-4 tw:z-40">
        <button
          onClick={() => setMobileSearchOpen(true)}
          className="tw:mb-2 tw:rounded tw:bg-green-500 tw:px-4 tw:py-2 tw:text-white"
        >
          Open Mobile Search
        </button>
        <div className="tw:text-sm tw:text-gray-600">
          Status: {mobileSearchOpen ? 'Open' : 'Closed'}
        </div>
      </div>

      {/* MobileScanner Component */}
      <MobileScanner
        title="Event Demo Scanner"
        onclose={() => console.log('Scanner closed')}
        results={[]}
        loading={false}
        hidebottompanel={true}
      >
        <div className="tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center tw:bg-gray-100">
          <div className="tw:text-center">
            <h2 className="tw:mb-4 tw:text-xl tw:font-bold">
              MobileScanner Active
            </h2>
            <p className="tw:mb-4">
              Check the console to see the custom event being dispatched
            </p>
            <p className="tw:text-sm tw:text-gray-600">
              When this component mounted, it automatically dispatched a
              'closeMobileSearch' event
            </p>
          </div>
        </div>
      </MobileScanner>
    </div>
  );
};
