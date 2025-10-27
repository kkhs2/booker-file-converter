import { h, Fragment } from 'preact';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';
import NavigationCard from '../NavigationCard/NavigationCard';
import QuickLinks from '../QuickLinks/QuickLinks';

/**
 * Content array containing categorized quick links for the "My Account" section.
 * Each category includes a title and a list of navigation cards.
 *
 * @constant
 * @type {Array<Object>}
 * @property {string} title - The title of the category.
 * @property {Array<Function>} cards - An array of functions that return NavigationCard components.
 */

/**
 * Renders the AccountQuickLinks component.
 * This component displays categorized quick links for account-related actions,
 * such as account information, payments, and support.
 *
 * @component
 * @returns {JSX.Element} The rendered AccountQuickLinks component.
 */

const Content = [
  {
    title: 'Account information',
    cards: [
      'Login and password',
      'Linked accounts',
      'Marketing preferences',
      'Tobacco Track & Trace',
      'Rep order history',
    ].map((item) => () => (
      <NavigationCard
        label={item}
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
    )),
  },
  {
    title: 'Payments',
    cards: [
      'Payment details',
      'Credit dashboard',
      'Invoices & central billing statements',
      'Vouchers',
    ].map((item) => () => (
      <NavigationCard
        label={item}
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
    )),
  },
  {
    title: 'Support',
    cards: [
      'My support tickets',
      'Claims',
      'Frequently asked questions',
      'Add feedback',
    ].map((item) => () => (
      <NavigationCard
        label={item}
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
    )),
  },
];

const ContentNewLink = [
  {
    title: 'Account information',

    cards: [
      () => (
        <NavigationCard
          label="Login and password"
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
          label="Linked accounts"
          classname="tw:font-bold"
          background="white"
          elementleft={() => (
            <Icons.info className="tw:h-5 tw:w-5 tw:text-primary" />
          )}
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
      ...[
        'Marketing preferences',
        'Tobacco Track & Trace',
        'Rep order history',
      ].map((item) => () => (
        <NavigationCard
          label={item}
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
      )),
    ],
  },
  {
    title: 'Payments',
    cards: [
      'Payment details',
      'Credit dashboard',
      'Invoices & central billing statements',
      'Vouchers',
    ].map((item) => () => (
      <NavigationCard
        label={item}
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
    )),
  },
  {
    title: 'Support',
    cards: [
      'My support tickets',
      'Claims',
      'Frequently asked questions',
      'Add feedback',
    ].map((item) => () => (
      <NavigationCard
        label={item}
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
    )),
  },
];

export const AccountQuickLinks = () => {
  return <QuickLinks content={Content} />;
};

export const AccountQuickLinksWithNewLinked = () => {
  return <QuickLinks content={ContentNewLink} />;
};
