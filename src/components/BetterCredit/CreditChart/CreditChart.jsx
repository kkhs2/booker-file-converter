/**
 * CreditChart component renders a doughnut chart displaying credit-related data
 * such as credit limit, balance, and credit available. It also includes a legend
 * with status items that interact with the chart on hover.
 *
 * @param {Object} props - The props for the CreditChart component.
 * @param {number} props.creditlimit - The total credit limit.
 * @param {number} props.balance - The current balance.
 * @param {number} props.creditavailable - The available credit.
 * @param {Object} [props.statuses={}] - An object representing the statuses for the chart.
 * @param {string} props.statuses[].label - The label for the status.
 * @param {number} props.statuses[].amount - The amount associated with the status.
 * @param {string} props.statuses[].colour - The color associated with the status.
 * @param {number} props.statuses[].count - The count associated with the status.
 *
 * @returns {JSX.Element} The rendered CreditChart component.
 */

import { h, Fragment } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import ChartJS from 'chart.js/auto';
import { cn, formatCurrency } from '../../../../utils/helpers';

export const CreditChart = ({
  creditlimit,
  balance,
  creditavailable,
  statuses = {},
  isSuspended,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  let chartInstance = null;

  const createChart = (ctx) => {
    // Destroy existing chart if it exists
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Check if all status amounts are zero
    const statusEntries = Object.values(statuses);
    const allZero = statusEntries.every((status) => status.amount === 0);

    // Create new chart
    chartInstance = new ChartJS(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: allZero ? [1] : statusEntries.map((status) => status.amount),
            backgroundColor: allZero
              ? ['#0ECCA0']
              : statusEntries.map((status) => status.colour),
            borderWidth: 0,
            cutout: (ctx) => {
              // Get the chart's radius (half of the smallest dimension)
              const chartSize = Math.min(ctx.chart.width, ctx.chart.height);
              const radius = chartSize / 2;

              // Check if window width is >= 1024px (lg breakpoint)
              const isDesktop = window.innerWidth >= 1024;
              const thickness = isDesktop ? 58 : 48;

              // Calculate cutout radius by subtracting desired thickness
              const cutoutRadius = radius - thickness;

              // Return as percentage of total radius
              return `${(cutoutRadius / radius) * 100}%`;
            },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        // Only enable hover effects if not all zero
        onHover: allZero
          ? null
          : (event, elements) => {
              // Get all status items in the legend within this component's container
              const statusItems =
                containerRef.current?.querySelectorAll('.status-item') || [];

              // Update opacity of each status item based on hovered segment
              statusItems.forEach((item, index) => {
                // Reduce opacity of non-hovered items to 0.5, keep hovered item at full opacity
                item.style.opacity =
                  elements.length && elements[0].index !== index ? '0.5' : '1';
              });
            },
      },
    });
  };

  const initialiseChart = () => {
    // Using setTimeout with 0ms delay ensures this code runs in the next event loop iteration after the DOM has been updated. This is necessary because we need the chart elements to be fully rendered before we can access them with querySelector
    setTimeout(() => {
      // Get the context for the chart using the ref
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      // Create the chart
      createChart(ctx);

      // Add resize observer to handle container size changes
      const resizeObserver = new ResizeObserver(() => {
        // Use requestAnimationFrame to debounce the resize
        window.requestAnimationFrame(() => {
          if (canvasRef.current) {
            createChart(canvasRef.current.getContext('2d'));
          }
        });
      });

      // Observe the chart's container using the ref
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      // Cleanup function for the resize observer
      const cleanup = () => {
        resizeObserver.disconnect();
        if (chartInstance) {
          chartInstance.destroy();
        }
      };

      // Store cleanup function on the container element for component-specific cleanup
      if (containerRef.current) {
        containerRef.current._chartCleanup = cleanup;
      }

      // Check if all status amounts are zero
      const statusEntries = Object.values(statuses);
      const allZero = statusEntries.every((status) => status.amount === 0);

      if (!allZero && containerRef.current) {
        // Add hover events for status items
        // This is to ensure that if the user leaves the chart quickly, the status items will not be hidden
        containerRef.current.addEventListener('mouseleave', () => {
          const statusItems =
            containerRef.current?.querySelectorAll('.status-item') || [];
          statusItems.forEach((item) => {
            item.style.opacity = '1';
          });
        });

        // Add hover events for status items after the element is created
        const statusItems =
          containerRef.current.querySelectorAll('.status-item');
        statusItems.forEach((item, index) => {
          // If the user hovers over a status item, update the background colour of not-hovered segments (to make them transparent)
          item.addEventListener('mouseenter', () => {
            if (chartInstance) {
              const dataset = chartInstance.data.datasets[0];
              const statusEntries = Object.values(statuses);
              dataset.backgroundColor = statusEntries.map((status, i) =>
                i === index ? status.colour : `${status.colour}80`,
              );
              chartInstance.update();
            }
          });

          // If the user leaves a status item, reset the background colour of the hovered segment
          item.addEventListener('mouseleave', () => {
            if (chartInstance) {
              const dataset = chartInstance.data.datasets[0];
              const statusEntries = Object.values(statuses);
              dataset.backgroundColor = statusEntries.map(
                (status) => status.colour,
              );
              chartInstance.update();
            }
          });
        });
      }
    }, 0);
  };

  useEffect(() => {
    initialiseChart();

    // Cleanup function
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
      // Call component-specific cleanup if it exists
      if (containerRef.current?._chartCleanup) {
        containerRef.current._chartCleanup();
      }
    };
  }, [creditlimit, balance, creditavailable, statuses, isSuspended]);

  return (
    <div ref={containerRef}>
      <div className="tw:flex tw:flex-col tw:justify-center tw:lg:flex-row tw:lg:items-center tw:lg:gap-16">
        <div className="tw:lg:flex-basis-[384px] tw:flex-1 tw:lg:max-w-[384px] tw:lg:flex-shrink-0">
          <div className="chart-wrapper tw:relative tw:mb-5 tw:lg:mb-0">
            <canvas
              ref={canvasRef}
              className="tw:relative tw:z-1 tw:mx-auto tw:w-full tw:max-w-[384px] tw:cursor-pointer"
            ></canvas>
            <div className="tw:absolute tw:top-1/2 tw:left-1/2 tw:flex tw:h-full tw:-translate-x-1/2 tw:-translate-y-1/2 tw:flex-col tw:justify-evenly tw:py-12 tw:text-center tw:lg:py-16">
              <div className="tw:space-y-3 tw:lg:space-y-6">
                <div>
                  <p className="tw:text-sm tw:text-grey-600">Credit limit</p>
                  <p className="tw:text-xl tw:font-medium">
                    {formatCurrency(creditlimit, 'GBP', {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>

                <div>
                  <p className="tw:text-sm tw:text-grey-600">Balance</p>
                  <p className="tw:text-5xl tw:font-medium">
                    {balance !== 0 && '-'}
                    {formatCurrency(balance, 'GBP', {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>

                <div>
                  <p className="tw:text-sm tw:text-grey-600">
                    Credit available
                  </p>
                  <p
                    className={cn(
                      'tw:text-xl tw:font-medium tw:text-tertiary-700',
                      isSuspended && 'tw:text-red-700',
                    )}
                  >
                    {isSuspended
                      ? 'Suspended'
                      : formatCurrency(creditavailable, 'GBP', {
                          maximumFractionDigits: 0,
                        })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tw:lg:w-[140px]">
          <div className="tw:grid tw:grid-cols-2 tw:gap-6 tw:rounded-[20px] tw:bg-secondary-1000 tw:p-5 tw:lg:grid-cols-1 tw:lg:gap-10 tw:lg:bg-transparent tw:lg:p-0">
            {Object.entries(statuses).map(([key, status]) => (
              <div
                key={key}
                class="status-item tw:flex tw:cursor-pointer tw:flex-col tw:gap-1 tw:lg:flex-row tw:lg:items-center tw:lg:gap-4"
              >
                <div class="tw:flex tw:items-start tw:gap-2 tw:lg:gap-3">
                  <div
                    class="tw: tw:flex tw:items-center tw:justify-center tw:rounded-lg tw:p-2"
                    style={{ 'background-color': status.colour }}
                  >
                    <span className="tw:inline-flex tw:h-4 tw:w-4 tw:items-center tw:justify-center tw:font-medium tw:text-white tw:lg:text-base">
                      {status.count}
                    </span>
                  </div>
                  <div className="tw:flex tw:flex-col tw:justify-start tw:space-y-1">
                    <span class="tw:text-2xs tw:leading-none tw:lg:text-sm">
                      {status.label}
                    </span>
                    <span class="tw:text-base tw:leading-tight tw:font-bold tw:lg:text-lg">
                      {formatCurrency(status.amount)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditChart;
