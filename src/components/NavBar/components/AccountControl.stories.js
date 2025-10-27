/**
 * Storybook configuration for the AccountControl component
 * This defines how the AccountControl component will appear in Storybook and what controls/options are available.
 */

import { de } from '@faker-js/faker';
import { AccountControl } from './AccountControl';

export default {
  title: 'Components/Navigation/Account Control',
  component: AccountControl,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        transform: (source, storyContext) => {
          // Get the story args
          const { args } = storyContext;
          if (!args) return source;

          // Convert args to JSX props string
          const props = Object.entries(args)
            .map(([key, value]) => {
              if (typeof value === 'boolean') {
                return value ? key : null;
              }
              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              if (typeof value === 'object') {
                return `${key}={${JSON.stringify(value, null, 2)}}`;
              }
              if (typeof value === 'function') {
                return `${key}={${value.name || 'function'}}`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<AccountControl\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
The AccountControl component displays user account information with a dropdown menu for account management.

### Features
- User avatar with different brand types (londis, budgens, premier, etc.)
- Dropdown menu with account details
- Multiple account switching support
- Custom styling based on account type
- User email and account information display
- Sign out functionality
- Responsive design

### Props
- \`user\`: User object containing account details, email, name, and account type
- \`onclick\`: Optional callback function when the account control is clicked

### Account Types Supported
- \`londis\`: Londis branded account
- \`budgens\`: Budgens branded account  
- \`premier\`: Premier branded account
- \`shoplocally\`: Shop Locally branded account
- \`shopndrive\`: Shop n Drive branded account
- \`ontradeclub\`: On Trade Club branded account
- \`familyshopper\`: Family Shopper branded account
- \`custom\`: Custom account with user-provided logo
- \`default\`: Default account with generic user icon

### User Object Structure
The user object should contain:
- \`name\`: User's display name
- \`email\`: User's email address
- \`accounttype\`: One of the supported account types
- \`accountlogo\`: URL for custom account logo (when accounttype is 'custom')
- \`accountclassname\`: Custom CSS class (when accounttype is 'custom')
- \`accounturl\`: URL for account management page
- \`manageaccounturl\`: URL for managing multiple accounts
- \`accounts\`: Array of account objects for account switching
- \`onsignout\`: Function to handle sign out
- \`onswitchaccount\`: Function to handle account switching

### Design Figma References
- [Account Control UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=2684-16697&m=dev)
        `,
      },
    },
  },
  argTypes: {
    user: {
      control: 'object',
      description: 'User object containing account details and functions',
      table: {
        type: { summary: 'object' },
      },
    },
    onclick: {
      control: false,
      description: 'Optional callback function when account control is clicked',
      table: {
        type: { summary: 'function' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="tw:relative tw:max-w-xs">
        <Story />
      </div>
    ),
  ],
};

// Base user data for stories
const baseUser = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  accounturl: '/account',
  manageaccounturl: '/accounts/manage',
  onsignout: () => console.log('Sign out clicked'),
  onswitchaccount: (accountId) => console.log('Switch to account:', accountId),
};

// Single account user
const singleAccountUser = {
  ...baseUser,
  accounts: [
    {
      id: 'ACC123',
      name: 'Main Store Account',
      current: true,
    },
  ],
};

// Multiple accounts user
const multipleAccountsUser = {
  ...baseUser,
  accounts: [
    {
      id: 'ACC123',
      name: 'Main Store Account',
      current: true,
    },
    {
      id: 'ACC456',
      name: 'Secondary Store',
      current: false,
    },
    {
      id: 'ACC789',
      name: 'Warehouse Location',
      current: false,
    },
  ],
};

/**
 * Default AccountControl with Londis branding
 */
export const Default = {
  args: {
    user: {
      ...singleAccountUser,
      accounttype: 'londis',
    },
    onclick: () => console.log('Account control clicked'),
  },
};

/**
 * Budgens branded account control
 */
export const Budgens = {
  args: {
    user: {
      ...singleAccountUser,
      accounttype: 'budgens',
    },
    onclick: () => console.log('Account control clicked'),
  },
};

/**
 * Premier branded account control
 */
export const Premier = {
  args: {
    user: {
      ...singleAccountUser,
      accounttype: 'premier',
    },
    onclick: () => console.log('Account control clicked'),
  },
};

/**
 * Shop Locally branded account control
 */
export const ShopLocally = {
  args: {
    user: {
      ...singleAccountUser,
      accounttype: 'shoplocally',
    },
    onclick: () => console.log('Account control clicked'),
  },
};

/**
 * Shop n Drive branded account control
 */
export const ShopNDrive = {
  args: {
    user: {
      ...singleAccountUser,
      accounttype: 'shopndrive',
    },
    onclick: () => console.log('Account control clicked'),
  },
};

/**
 * On Trade Club branded account control
 */
export const OnTradeClub = {
  args: {
    user: {
      ...singleAccountUser,
      accounttype: 'ontradeclub',
    },
    onclick: () => console.log('Account control clicked'),
  },
};

/**
 * Family Shopper branded account control
 */
export const FamilyShopper = {
  args: {
    user: {
      ...singleAccountUser,
      accounttype: 'familyshopper',
    },
    onclick: () => console.log('Account control clicked'),
  },
};
