/**
 * Storybook configuration for the QuickLinks component
 * This defines how the QuickLinks component will appear in Storybook and what controls/options are available.
 */

// Import the QuickLinks component
import QuickLinks from './QuickLinks';
// Import the Icons component for examples
import Icons from '../Icons/Icons';
import NavigationCard from '../NavigationCard/NavigationCard';
import Button from '../Button/Button';

// Define the story configuration
export default {
  title: 'Sections/Quick Links',
  component: QuickLinks,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          // Function to ensure JSX elements remain JSX, not serialized
          const processJSX = (value) => {
            if (typeof value === 'function') {
              return value(); // Execute functions to get JSX elements
            }
            return value;
          };

          // Function to clean and properly structure props
          const cleanObject = (obj) => {
            if (Array.isArray(obj)) {
              return obj.map(cleanObject);
            }
            if (obj && typeof obj === 'object') {
              const cleaned = {};
              for (const [key, value] of Object.entries(obj)) {
                if (key.startsWith('__')) continue; // Ignore internal metadata

                // Special handling for `content.cards`
                if (key === 'content' && Array.isArray(value)) {
                  cleaned[key] = value.map((section) => ({
                    title: section.title,
                    cards: section.cards.map((card) => processJSX(card)), // Return JSX elements
                  }));
                  continue;
                }

                cleaned[key] = cleanObject(value);
              }
              return cleaned;
            }
            return obj;
          };

          // Convert args to JSX props string
          const props = Object.entries(cleanObject(args))
            .map(([key, value]) => {
              if (typeof value === 'boolean') {
                return value ? key : null;
              }
              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              return `${key}={${JSON.stringify(value, null, 2)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<QuickLinks\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
This component implements various QuickLinks styles as defined in the design system.

### Design Figma References
- [QuickLinks UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=3121-71988&m=dev)
        `,
      },
    },
  },

  // Define controls (props) for the QuickLinks component
  argTypes: {
    // Label of Card
    content: {
      control: 'array',
      description: 'Array of cards to display',
      table: {
        defaultValue: {
          summary: [],
        },
      },
    },
  },
};

/**
 * Template for rendering the QuickLinks component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => QuickLinks(args);

/**
 * Icon & Button Default
 */
export const Default = Template.bind({});
Default.args = {
  content: [
    {
      title: 'Ways to order',
      cards: [
        () => (
          <NavigationCard
            label="Scanner"
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
        () => (
          <NavigationCard
            label="Enter codes"
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
        () => (
          <NavigationCard
            label="Previous orders"
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
        () => (
          <NavigationCard
            label="Shopping list"
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
        () => (
          <NavigationCard
            label=<>
              <span className="tw:flex tw:items-center tw:gap-2">
                <Icons.search classname="tw:h-5 tw:w-5" stroke="#FF480C" />
                <span>Supplier rep orders</span>
              </span>
            </>
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
      ],
    },
    {
      title: 'Shortcuts',
      cards: [
        () => (
          <NavigationCard
            label={
              <div className="tw:flex tw:items-center tw:gap-2">
                <Icons.info
                  classname="tw:flex-shrink-0"
                  stroke="#FF480C"
                  width="20"
                  height="20"
                />
                <span>
                  {' '}
                  You have <span className="tw:font-bold">1 new voucher</span>
                </span>
              </div>
            }
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
        () => (
          <NavigationCard
            label="Invoices & central billing statements"
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
        () => (
          <NavigationCard
            label="Spend & Save"
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
        () => (
          <NavigationCard
            label="Services"
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
        () => (
          <NavigationCard
            label="Add Feedback"
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
      ],
    },
  ],
};

export const Wide = Template.bind({});
Wide.args = {
  content: [
    {
      title: 'Ways to order',
      cards: [
        () => (
          <NavigationCard
            label="Scanner"
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
        () => (
          <NavigationCard
            label="Enter codes"
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
        () => (
          <NavigationCard
            label="Previous orders"
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
        () => (
          <NavigationCard
            label="Shopping list"
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
        () => (
          <NavigationCard
            label="Supplier Rep orders"
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
      ],
    },
    {
      title: 'Shortcuts',
      cards: [
        () => (
          <NavigationCard
            label={
              <div className="tw:flex tw:items-center tw:gap-2">
                <Icons.info stroke="#FF480C" />
                <span>
                  {' '}
                  You have <span className="tw:font-bold">1 new voucher</span>
                </span>
              </div>
            }
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
        () => (
          <NavigationCard
            label="Invoices & central billing statements"
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
        () => (
          <NavigationCard
            label="Spend & Save"
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
        () => (
          <NavigationCard
            label="Services"
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
        () => (
          <NavigationCard
            label="Add Feedback"
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
      ],
    },
    {
      title: 'Support',
      cards: [
        () => (
          <NavigationCard
            label="Claims"
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
        () => (
          <NavigationCard
            label="Frequently asked questions"
            background="white"
            elementright={() => (
              <Button
                variant="secondary"
                size="small"
                iconright={() => (
                  <Icons.chevronRightThick classname="tw:h-4 tw:w-4" />
                )}
                classname="tw:h-[36px] tw:w-[36px]"
              />
            )}
            href="https://github.com/"
          />
        ),
      ],
    },
  ],
};

/**
 * All statuses story.
 * Demonstrates displaying all statuses in a row.
 */
export const AllQuickLinks = {
  render: () => {
    // Add all the previously defined args here
    const statusConfigs = [Default.args];

    return (
      <div className="tw:flex tw:flex-wrap tw:items-start tw:gap-4">
        {statusConfigs.map((config, idx) => (
          <QuickLinks key={idx} {...config} />
        ))}
      </div>
    );
  },
};
