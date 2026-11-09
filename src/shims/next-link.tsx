import * as React from "react";
import { Link as RouterLink, type LinkProps as RRLinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

type LinkProps = Omit<RRLinkProps, "to"> & {
  href: string;
  className?: string;
  children?: React.ReactNode;
  replace?: boolean;
  prefetch?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  legacyBehavior?: boolean;
};

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, className, children, replace, onClick, ...rest }, ref) => {
    const isExternal =
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href}
          className={cn(className)}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <RouterLink
        ref={ref}
        to={href}
        replace={replace}
        className={cn(className)}
        onClick={onClick}
        {...rest}
      >
        {children}
      </RouterLink>
    );
  }
);

Link.displayName = "Link";

export default Link;
