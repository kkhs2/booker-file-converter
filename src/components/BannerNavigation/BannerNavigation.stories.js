/**
 * Storybook configuration for the BannerNavigation component
 * This defines how the BannerNavigation component will appear in Storybook and what controls/options are available.
 */

// Imports
import BannerNavigation from './BannerNavigation';
import Icons from '../Icons/Icons';
import MenuCard from '../MenuCard/MenuCard';

// Define the story configuration
export default {
  // The title under which the BannerNavigation component will appear in Storybook's navigation
  title: 'Sections/Banner Navigation',

  // The component to display in the story
  component: BannerNavigation,

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    // Search term
    searchterm: {
      control: 'text',
      description: 'The search term used (for single search)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Item count
    itemcount: {
      control: 'number',
      description: 'The number of items found in the search',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },

    // Title
    title: {
      control: 'text',
      description: 'Title to display when using children (optional)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Children
    children: {
      control: { type: null },
      description: 'Custom content to display in the header',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },

    // Mobile image
    mobileimage: {
      control: 'text',
      description: 'URL for the mobile magnifier image',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Desktop image
    desktopimage: {
      control: 'text',
      description: 'URL for the desktop magnifier image',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Icon
    icon: {
      control: { type: null },
      description: 'Custom icon component to display instead of default',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },

    // Additional classes
    classname: {
      control: 'text',
      description: 'Additional classes to add to the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Suggestions
    suggestions: {
      control: 'object',
      description:
        'Optional list of alternative search suggestions. Accepts an array of strings or objects { label, href? }',
      table: {
        type: { summary: 'Array<string | { label: string, href?: string }>' },
        defaultValue: { summary: '[]' },
      },
    },
  },

  parameters: {
    layout: 'padded',
    docs: {
      source: {
        transform: (source, storyContext) => {
          // Get the story args
          const { args } = storyContext;
          if (!args) return source;

          // Convert args to JSX props string
          const props = Object.entries(args)
            .map(([key, value]) => {
              // Handle special cases
              if (typeof value === 'boolean') {
                return value ? key : null;
              }
              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<BannerNavigation\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
This component displays a banner navigation. It is used to display a search result term and a count of items found. It can also display custom content passed as children.

### Usage
- Use for displaying search results headers
- Can show either a single search term with result count or custom content passed as children
- Supports an optional title when using children
- Supports an optional custom icon or image

### Design Figma References
- [Banner Navigation UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=5359-80793&m=dev)
`,
      },
    },
  },
};

/**
 * Search Results with Image story.
 * Demonstrates the component with a single search term and an image.
 */
export const SearchResults = {
  args: {
    searchterm: 'milk chocolate',
    itemcount: 1002,
    mobileimage: './images/search-results-header/chocolate-mobile.png',
    desktopimage: './images/search-results-header/chocolate.png',
  },
};

/**
 * Search Results Without Image story.
 * Demonstrates the component without an image.
 */
export const SearchResultsWithoutImage = {
  args: {
    searchterm: 'milk chocolate',
    itemcount: 1002,
  },
};

/**
 * Search Results with suggestions.
 * Demonstrates the component with the optional "Did you mean" section.
 */
export const SearchResultsWithSuggestions = {
  args: {
    searchterm: 'milc choclte',
    itemcount: 2,
    suggestions: [
      { label: 'milk chocolate', href: '#' },
      { label: 'Chocolate milk (29)', href: '#' },
      { label: 'Condensed milk (6)', href: '#' },
      { label: 'Fresh milk (32)', href: '#' },
    ],
  },
};

/**
 * Search Results with Icon story.
 * Demonstrates the component with a search term, item count, and a custom icon.
 */
export const SearchResultsWithIcon = {
  args: {
    searchterm: 'organic vegetables',
    itemcount: 156,
    icon: (
      <Icons.graphicsSearch classname="tw:self-start tw:w-[56px] tw:md:w-[90px] tw:h-auto tw:order-1 tw:shrink-0" />
    ),
  },
};

/**
 * Search with a list story.
 * Demonstrates the component with custom content for a list search.
 */
export const SearchWithList = {
  parameters: {
    docs: {
      source: {
        code: `
<BannerNavigation
  title={
    <>
      Search <br className="tw:lg:hidden" />
      with a list
    </>
  }
  icon={
    <Icons.graphicsSearch classname="tw:self-start tw:w-[56px] tw:md:w-[90px] tw:h-auto tw:order-1 tw:shrink-0" />
  }
>
  <div className="tw:flex tw:flex-wrap tw:gap-3 tw:lg:gap-4">
    {['Bread', 'Eggs', 'Butter', 'Avocado', 'Cling Film', 'Sparkling Water'].map((tag, index) => (
      <button
        key={\`\${tag}-\${index}\`}
        className="tw:inline-block tw:cursor-pointer tw:rounded-[20px] tw:bg-white tw:px-3 tw:py-[14px] tw:text-lg tw:text-black tw:shadow-[4px_4px_10px_-4px_rgba(0,0,0,0.1)] tw:hover:bg-primary-700 tw:hover:text-white tw:lg:px-4 tw:lg:text-xl"
        aria-pressed="false"
      >
        {tag}
      </button>
    ))}
  </div>
</BannerNavigation>`,
      },
    },
  },
  render: () => {
    return (
      <BannerNavigation
        title={
          <>
            Search <br className="tw:lg:hidden" />
            with a list
          </>
        }
        icon={
          <Icons.graphicsSearch classname="tw:self-start tw:w-[56px] tw:md:w-[90px] tw:h-auto tw:order-1 tw:shrink-0" />
        }
      >
        <div className="tw:flex tw:flex-wrap tw:gap-3 tw:lg:gap-4">
          {[
            'Bread',
            'Eggs',
            'Butter',
            'Avocado',
            'Cling Film',
            'Sparkling Water',
          ].map((tag, index) => (
            <button
              key={`${tag}-${index}`}
              className="tw:inline-block tw:cursor-pointer tw:rounded-[20px] tw:bg-white tw:px-3 tw:py-[14px] tw:text-lg tw:text-black tw:shadow-[4px_4px_10px_-4px_rgba(0,0,0,0.1)] tw:hover:bg-primary-700 tw:hover:text-white tw:lg:px-4 tw:lg:text-xl"
              aria-pressed="false"
            >
              {tag}
            </button>
          ))}
        </div>
      </BannerNavigation>
    );
  },
};

/**
 * With component children story.
 * Demonstrates the component with custom content for a list search.
 */
export const WithComponentChildren = {
  parameters: {
    docs: {
      source: {
        code: `
<BannerNavigation
  title="Choose a scanner"
  icon={
    <Icons.scanner classname="tw:self-start tw:w-[56px] tw:md:w-[90px] tw:h-auto tw:order-1 tw:shrink-0" />
  }
>
  <div className="tw:grid tw:grid-cols-1 tw:gap-3 tw:lg:grid-cols-3 tw:lg:gap-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index}>
        <MenuCard
          label="CS 3000"
          image="./images/cards/scanner.png"
          url="http://booker.co.uk"
          imageAspectRatio="tw:aspect-[16/10]"
          classname="tw:p-2 tw:shadow-[4px_4px_10px_-4px_rgba(0,0,0,0.1)] tw:bg-white  tw:rounded-[20px]"
        />
      </div>
    ))}
  </div>
</BannerNavigation>`,
      },
    },
  },
  render: () => {
    return (
      <BannerNavigation
        title="Choose a scanner"
        icon={
          <Icons.scanner classname="tw:self-start tw:w-[56px] tw:md:w-[90px] tw:h-auto tw:order-1 tw:shrink-0" />
        }
      >
        <div className="tw:grid tw:grid-cols-1 tw:gap-3 tw:lg:grid-cols-3 tw:lg:gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <MenuCard
                label="CS 3000"
                image="./images/cards/scanner.png"
                url="http://booker.co.uk"
                labelposition="below"
                imageaspectratio="tw:aspect-[16/10]"
                classname="tw:p-2 tw:shadow-[4px_4px_10px_-4px_rgba(0,0,0,0.1)] tw:bg-white  tw:rounded-[20px]"
              />
            </div>
          ))}
        </div>
      </BannerNavigation>
    );
  },
};

/**
 * All variations story.
 * Demonstrates different component configurations in a single view.
 */
export const AllVariants = {
  render: () => {
    return (
      <div className="tw:max-w-[1312px] tw:space-y-10">
        <BannerNavigation {...SearchResults.args} />
        <BannerNavigation {...SearchResultsWithoutImage.args} />
        <BannerNavigation {...SearchResultsWithSuggestions.args} />
        <BannerNavigation {...SearchResultsWithIcon.args} />
        <SearchWithList.render />
        <WithComponentChildren.render />
      </div>
    );
  },
};
