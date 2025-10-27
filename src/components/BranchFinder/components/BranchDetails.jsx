import { h, Fragment } from 'preact';
import Icons from '../../Icons/Icons';
import Tag from '../../Tag/Tag';
import Typography from '../../Typography/Typography';

/**
 * Component to display detailed information about a branch.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.branch - The branch data.
 * @param {string} props.branch.title - The title or name of the branch.
 * @param {string} props.branch.address - The address of the branch.
 * @param {Array<[string, string]>} [props.branch.openingHours] - An array of opening hours, where each entry is a tuple containing the day and hours.
 * @param {string} props.branch.phone - The phone number of the branch.
 * @param {string} props.branch.butcheryPhone - The phone number for the butchery department.
 * @param {Array<{ label: string, positive: boolean }>} [props.branch.tags] - An array of tags representing product ranges and services, each with a label and a boolean indicating positivity.
 * @param {Array<string>} [props.branch.facilities] - An array of facilities available at the branch.
 *
 * @returns {JSX.Element} The rendered BranchDetails component.
 */

export const BranchDetails = ({ branch }) => {
  return (
    <div>
      <div className="tw:my-6">
        <Typography
          domtype="h5"
          content={branch.title}
          classname="tw:text-primary tw:mb-2"
        />
        <Typography domtype="h7" content={branch.address} />
      </div>

      <div className="tw:space-y-10 tw:rounded-[20px] tw:bg-secondary-1000 tw:p-6">
        <div>
          <Typography
            domtype="h7"
            classname="tw:font-semibold tw:mb-4 tw:block"
          >
            Opening Hours
          </Typography>

          <ul className="tw:mx-0 tw:list-none tw:space-y-4 tw:text-lg">
            {branch?.openingHours?.map(([day, hours], index) => (
              <li
                key={index}
                className="tw:flex tw:items-center tw:justify-between"
              >
                <span>{day}</span>
                <span>{hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Typography
            domtype="h7"
            classname="tw:font-semibold tw:mb-4 tw:block"
          >
            Get in touch
          </Typography>

          <p className="tw:mb-1">
            Branch{' '}
            <span className="tw:underline tw:decoration-dotted tw:underline-offset-4">
              {branch.phone}
            </span>
          </p>
          <p>
            Butchery{' '}
            <span className="tw:underline tw:decoration-dotted tw:underline-offset-4">
              {branch.butcheryPhone}
            </span>
          </p>
        </div>

        <div>
          <Typography
            domtype="h7"
            classname="tw:font-semibold tw:mb-3 tw:block"
          >
            Product ranges and services
          </Typography>

          <div className="tw:mt-4 tw:mb-8 tw:max-w-[120px] tw:flex-col tw:gap-2 tw:lg:max-w-full tw:lg:flex-row">
            {branch.tags?.map((tag, index) => (
              <Tag
                key={index}
                label={tag.label}
                icon={
                  tag.positive ? (
                    <Icons.checkMark classname="tw:text-green-500 tw:w-3 tw:h-3 tw:shrink-0" />
                  ) : (
                    <Icons.x classname="tw:text-red-700 tw:w-3 tw:h-3 tw:shrink-0" />
                  )
                }
                variant="inverse"
                classname="tw:mr-2 tw:mb-2 tw:border-none"
              />
            ))}
          </div>
        </div>

        <div>
          <Typography
            domtype="h7"
            classname="tw:font-semibold tw:mb-2 tw:block"
          >
            Facilities
          </Typography>

          <ul className="tw:list-inside tw:list-disc">
            {branch.facilities?.map((facility, index) => (
              <li key={index}>{facility}</li>
            ))}
          </ul>
        </div>

        <p>
          Booker memberships are given on a case-by-case basis. Contact us to
          see if you're eligible.
        </p>
      </div>
    </div>
  );
};
