import { styled } from '@mui/material/styles';
import { LinkProps as NextLinkProps } from 'next/dist/client/link';
import Link from 'next/link';

import React from 'react';

// @see https://mui.com/guides/routing/
// Add support for the sx prop for consistency with the other branches.

const Anchor = styled('a')({});

interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
  href?: NextLinkProps['href'];
}

export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(function NextLinkComposed(
  props,
  ref,
) {
  const { to, linkAs, href, replace, scroll, shallow, prefetch, locale, ...other } = props;

  return (
    <Link
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
    >
      <Anchor ref={ref} {...other} />
    </Link>
  );
});

export default NextLinkComposed;
