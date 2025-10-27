import { useEffect } from 'preact/hooks';
import Planograms from './Planograms';
import { useOverlay } from '../../../hooks/useOverlay';

export default {
  title: 'Components/Planograms',
  component: Planograms,
  tags: ['autodocs'],
  argTypes: {
    onsubmit: { action: 'submitted' },
    onclose: { action: 'closed' },
    classname: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    categories: {
      control: 'object',
      description: 'List of categories to display in the form',
    },
    units: {
      control: 'object',
      description: 'List of units to display in the form',
    },
    departments: {
      control: 'object',
      description: 'List of departments to display in the form',
    },
  },
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
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<Planograms\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
Overlay draw triggered from Planograms quick link on logged in homepage
Progressively disclosure (additional fields and finally CTA appear on selection of previous drop down.


### Design Figma References
- [‘Planograms’ UI library](https://www.figma.com/design/Jgv6b7BGHkVg0CqK2R7A4O/Booker-UI-Design-Templates?node-id=8527-499011&m=dev)
        `,
      },
    },
  },
};

// Portal-based templates that open on mount
const PortalTemplate = (args) => {
  const { showOverlay, hideOverlay, portalNode } = useOverlay();

  useEffect(() => {
    showOverlay(
      Planograms,
      {
        ...args,
        onclose: hideOverlay,
      },
      { closeOnClickOutside: true },
    );
  }, []);

  return (
    <div className="tw:flex tw:min-h-screen tw:items-center tw:justify-center tw:bg-gray-100 tw:p-6">
      <div className="tw:text-center">
        <h2 className="tw:mb-4 tw:text-2xl tw:font-bold tw:text-gray-700">
          Portal Example
        </h2>
        <p className="tw:text-gray-600">
          The Planograms form should open automatically in an overlay
        </p>
      </div>
      {portalNode}
    </div>
  );
};

export const Default = PortalTemplate.bind({});
Default.args = {
  onsubmit: (data) => {
    console.log('Form submitted:', data);
  },
  categories: [
    { value: 'wine', label: 'Wine' },
    { value: 'beer', label: 'Beer' },
    { value: 'groceries', label: 'Groceries' },
    { value: 'fruit', label: 'Fruit' },
  ],
  units: [
    { value: 'unit1', label: 'LONDIS 1.25M 7 SHELF 2030 HIGH' },
    { value: 'unit2', label: 'LONDIS 1.25M 5 SHELF 2030 HIGH' },
    { value: 'unit3', label: 'LONDIS 1.25M 3 SHELF 2030 HIGH' },
    { value: 'unit4', label: 'LONDIS 1.25M 2 SHELF 2030 HIGH' },
  ],
  departments: [
    { value: 'bws', label: 'BWS' },
    { value: 'grocery', label: 'Grocery' },
    { value: 'fresh', label: 'Fresh' },
    { value: 'frozen', label: 'Frozen' },
    { value: 'non-food', label: 'Non-Food' },
    { value: 'food-to-go', label: 'Food to Go' },
  ],
};
