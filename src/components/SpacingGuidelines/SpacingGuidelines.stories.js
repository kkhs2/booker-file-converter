import Typography from '../../components/Typography/Typography';

export default {
  title: 'Design System/Spacing Guidelines',
  parameters: {
    layout: 'fullscreen',
  },
};

// Define our spacing tokens
const spacing = {
  desktop: {
    large: '100px',
    small: '64px',
  },
  mobile: {
    large: '48px',
    small: '32px',
  },
};

// Helper component to visualise spacing
const SpacingVisualiser = ({ size, label }) => (
  <div
    className="tw:flex tw:items-center tw:justify-center tw:rounded tw:p-5 tw:text-base tw:font-bold tw:text-gray-800"
    style={{
      height: size,
      backgroundColor: '#e0e0ff',
    }}
  >
    {label} ({size})
  </div>
);

// Component to demonstrate different spacing methods
const ComponentBlock = ({ color = '#f5f5f5', height = '100px', label }) => (
  <div
    className="tw:flex tw:items-center tw:justify-center tw:rounded tw:p-5 tw:font-bold"
    style={{
      backgroundColor: color,
      minHeight: height,
    }}
  >
    {label}
  </div>
);

export const SpacingShowcase = () => {
  return (
    <div className="tw:mx-auto tw:max-w-screen-lg tw:p-8">
      <Typography domtype="h5">Spacing Guidelines</Typography>

      <p className="tw:my-8">
        This guide demonstrates the standard vertical spacing between components
        in our design system. Spacing can be implemented in various ways
        depending on the context.
      </p>

      <div className="tw:mb-18 tw:grid tw:grid-cols-1 tw:gap-16 tw:lg:grid-cols-2">
        <div className="tw:space-y-2">
          <Typography domtype="h8" classname="tw:block tw:font-bold">
            Desktop Spacing
          </Typography>

          <div className="tw:space-y-5">
            <SpacingVisualiser
              size={spacing.desktop.large}
              label="Large Vertical Spacing"
            />
            <SpacingVisualiser
              size={spacing.desktop.small}
              label="Small Vertical Spacing"
            />
          </div>
        </div>
        <div className="tw:space-y-2">
          <Typography domtype="h8" classname="tw:block tw:font-bold">
            Mobile Spacing
          </Typography>

          <div className="tw:space-y-5">
            <SpacingVisualiser
              size={spacing.mobile.large}
              label="Large Vertical Spacing"
            />
            <SpacingVisualiser
              size={spacing.mobile.small}
              label="Small Vertical Spacing"
            />
          </div>
        </div>
      </div>

      <Typography domtype="h6">Important Note</Typography>

      <div className="tw:mt-5 tw:mb-18 tw:rounded tw:bg-yellow-100 tw:p-5">
        <p>
          Always check the specific Figma design for the page you are working
          on, as each page has its own spacing rules depending on its structure
          and content requirements. These guidelines provide a baseline, but
          actual implementation may vary based on the specific context.
        </p>
        <p className="tw:mt-3">
          Some components have specific spacing requirements that differ from
          the standard guidelines. For example, the Product Listing Page (PLP)
          has specific spacing between filters and the tile grid. Always refer
          to the component-specific design specifications for these cases.
        </p>
      </div>

      <Typography domtype="h6">Implementation Examples </Typography>

      <p className="tw:mt-2 tw:mb-5">
        The examples below demonstrate how spacing is applied between different
        sections of a page. The left column shows desktop spacing, while the
        right column shows mobile spacing. Red areas represent the actual
        spacing between components. Note that each page may use small and large
        spacing in different places depending on its specific design
        requirements.
      </p>

      <div className="tw:mt-5 tw:grid tw:grid-cols-2 tw:gap-8 tw:lg:gap-16">
        <div>
          <ComponentBlock label="Header Section" color="#ffecb3" />

          <div
            className="tw:flex tw:h-20 tw:items-center tw:justify-center tw:bg-red-100"
            style={{
              height: spacing.desktop.small,
            }}
          >
            Small Spacing
          </div>

          <ComponentBlock label="Content Section" color="#b3e5fc" />

          <div
            className="tw:flex tw:h-20 tw:items-center tw:justify-center tw:bg-red-100"
            style={{
              height: spacing.desktop.large,
            }}
          >
            Large Spacing
          </div>

          <ComponentBlock label="Content Section" color="#b3e5fc" />

          <div
            className="tw:flex tw:h-20 tw:items-center tw:justify-center tw:bg-red-100"
            style={{
              height: spacing.desktop.large,
            }}
          >
            Large Spacing
          </div>

          <ComponentBlock label="Footer Section" color="#c8e6c9" />
        </div>

        <div>
          <ComponentBlock label="Header Section" color="#ffecb3" />

          <div
            className="tw:flex tw:h-20 tw:items-center tw:justify-center tw:bg-red-100"
            style={{
              height: spacing.mobile.small,
            }}
          >
            Small Spacing
          </div>

          <ComponentBlock label="Content Section" color="#b3e5fc" />

          <div
            className="tw:flex tw:h-20 tw:items-center tw:justify-center tw:bg-red-100"
            style={{
              height: spacing.mobile.large,
            }}
          >
            Large Spacing
          </div>

          <ComponentBlock label="Content Section" color="#b3e5fc" />

          <div
            className="tw:flex tw:h-20 tw:items-center tw:justify-center tw:bg-red-100"
            style={{
              height: spacing.mobile.large,
            }}
          >
            Large Spacing
          </div>

          <ComponentBlock label="Footer Section" color="#c8e6c9" />
        </div>
      </div>
    </div>
  );
};
