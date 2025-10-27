import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Typography from '../Typography/Typography';
import Icons from '../Icons/Icons';
import { forwardRef, useState } from 'preact/compat';
import Button from '../Button/Button';
import { BranchSearch } from './components/BranchSearch';
import { BranchDetails } from './components/BranchDetails';
import { BranchSwitchWarning } from './components/BranchSwitchWarning';
import { BranchListViewToggle } from './components/BranchListViewToggle';
import { BranchList } from './components/BranchList';

const mockBranch = {
  title: 'St Pancras',
  distance: '0.7 miles away',
  address: '106 Camley Street, London, N1C 4PF',
  schedule: 'Open until 5pm today',
  tags: [
    { label: 'No tabacco', positive: false },
    { label: 'No fish', positive: false },
    { label: 'Butchery', positive: true },
    { label: 'Click & Collect', positive: true },
  ],
  openingHours: [
    ['Mondays', '09:00 - 17:00'],
    ['Tuesdays', '09:00 - 17:00'],
    ['Wednesdays', '09:00 - 17:00'],
    ['Thursdays', 'Closed'],
    ['Fridays', '09:00 - 17:00'],
    ['Saturdays', '09:00 - 17:00'],
    ['Sundays', '09:00 - 17:00'],
  ],
  phone: '01473 259059',
  butcheryPhone: '01473 259060',
  facilities: ['Free coffee', 'Toilets', 'Free parking'],
};

/**
 * BranchFinder Component
 *
 *  @description  A component that allows users to find and select a branch for Click & Collect.
 *
 * @param {Object} props - Component props
 * @param {Object} [props.product] - Product information to check stock for
 * @param {Function} [props.onclose] - Callback function to close the component
 * @param {string} [props.title] - The title to display
 * @param {boolean} [props.showresults] - Whether to show search results initially
 * @param {boolean} [props.branchselect] - Whether to allow branch selection
 * @param {boolean} [props.enablemapview=false] - Whether to enable the map view option
 * @returns {JSX.Element} Preact component - The BranchFinder component
 */

const BranchFinder = forwardRef(
  (
    {
      product,
      showresults,
      onclose,
      title = 'Choose a branch to Click & Collect',
      branchselect = true,
      enablemapview = false,
    },
    ref,
  ) => {
    const [view, setView] = useState('list');
    const [searchValue, setSearchValue] = useState('');
    const [isSearchResults, setIsSearchResults] = useState(
      showresults || false,
    );
    const [isLocalBranches, setIsLocalBranches] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [branchDetails, setBranchDetails] = useState(null);

    const branch = mockBranch;
    const homeBranch = {
      ...mockBranch,
      active: true,
    };

    if (product) {
      homeBranch.productstock = 'inStock';
      branch.productstock = 'inStock';
    }

    return (
      <div className="tw:relative tw:flex tw:h-full tw:w-full tw:translate-x-full tw:justify-end tw:overflow-auto tw:transition-all tw:duration-1000 tw:group-[.open]:translate-x-0">
        <div
          ref={ref}
          className="tw:h-full tw:w-full tw:overflow-auto tw:bg-white tw:p-6 tw:md:w-120 tw:md:p-10"
        >
          <div
            className={cn(
              'tw:flex tw:w-full tw:items-center tw:justify-end',
              branchDetails && 'tw:justify-between',
            )}
          >
            {branchDetails && (
              <button
                className="tw:flex tw:cursor-pointer tw:items-center tw:space-x-2 tw:transition-opacity tw:hover:opacity-50"
                onClick={() => setBranchDetails(null)}
              >
                <Icons.arrowLeft classname="tw:w-4 tw:h-4" />
                <span>Back to all branches</span>
              </button>
            )}

            <button
              className="tw:cursor-pointer tw:transition-opacity tw:hover:opacity-50"
              onClick={() => {
                onclose();
              }}
            >
              <Icons.x
                fill="black"
                classname="tw:w-5 tw:h-5 tw:md:w-6 tw:md:h-6"
              />
            </button>
          </div>

          {!branchDetails && !selectedBranch && (
            <>
              <Typography
                domtype="h4"
                content={title}
                classname="tw:text-primary tw:mt-4 tw:lg:mt-6 tw:mb-6 tw:lg:mb-10"
              />

              <BranchSearch
                onsearchchange={(e) => {
                  setSearchValue(e.target.value);
                }}
                onuselocation={() => {
                  setIsSearchResults(false);
                  setIsLocalBranches(true);
                }}
                mylocationclassname={!enablemapview && 'tw:mb-5 tw:lg:mb-8'}
              />

              {isLocalBranches && (
                <>
                  {enablemapview && (
                    <BranchListViewToggle view={view} onviewchange={setView} />
                  )}

                  {product && (
                    <div className="tw:mb-8">
                      <p className="tw:mb-2 tw:px-4">Checking stock for:</p>
                      <div className="tw:flex tw:items-center tw:gap-3 tw:rounded-[20px] tw:bg-beige-1000 tw:p-2">
                        <img src={product.image} className="tw:h-15 tw:w-15" />
                        <p className="tw:text-base">{product.name}</p>
                      </div>
                    </div>
                  )}

                  <div className="tw:space-y-6">
                    <BranchList
                      title="Your home branch"
                      branches={[homeBranch]}
                      onbranchclick={
                        branchselect
                          ? (branch) => setSelectedBranch(branch)
                          : setBranchDetails
                      }
                      onbranchdetailsclick={setBranchDetails}
                    />

                    <BranchList
                      title="Nearby"
                      branches={[branch, branch, branch]}
                      onbranchclick={
                        branchselect
                          ? (branch) => setSelectedBranch(branch)
                          : setBranchDetails
                      }
                      onbranchdetailsclick={setBranchDetails}
                    />
                  </div>
                </>
              )}

              {!isLocalBranches && !isSearchResults && (
                <div className="tw:group tw:mt-6 tw:flex tw:w-full tw:lg:mt-10">
                  <Button
                    label="Find a branch"
                    variant="tertiary"
                    classname="tw:w-full tw:group-hover:bg-black-1000 tw:group-hover:text-white-1000 tw:group-hover:border-black-1000"
                    onClick={() => {
                      setIsSearchResults(true);
                      setIsLocalBranches(false);
                    }}
                  />
                </div>
              )}

              {isSearchResults && (
                <>
                  {enablemapview && (
                    <BranchListViewToggle view={view} onviewchange={setView} />
                  )}

                  {product && (
                    <div className="tw:mb-8">
                      <p className="tw:mb-2 tw:px-4">Checking stock for:</p>
                      <div className="tw:flex tw:items-center tw:gap-3 tw:rounded-lg tw:bg-beige-1000 tw:p-2">
                        <img src={product.image} className="tw:h-15 tw:w-15" />
                        <p className="tw:text-base">{product.name}</p>
                      </div>
                    </div>
                  )}

                  <BranchList
                    title={`Branches within 100 miles of "${searchValue}"`}
                    branches={[branch, branch, branch]}
                    onbranchclick={
                      branchselect
                        ? (branch) => setSelectedBranch(branch)
                        : setBranchDetails
                    }
                    onbranchdetailsclick={setBranchDetails}
                  />
                </>
              )}
            </>
          )}

          {branchDetails && <BranchDetails branch={branchDetails} />}

          {selectedBranch && (
            <BranchSwitchWarning
              onconfirm={() => {}}
              oncancel={() => setSelectedBranch(null)}
            />
          )}
        </div>
      </div>
    );
  },
);

export default BranchFinder;
