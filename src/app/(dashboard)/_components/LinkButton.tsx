import Link from 'next/link';
import { forwardRef } from 'react';

import { Button } from '@/components/ui/button';

type Props = React.ComponentPropsWithRef<typeof Button> & {
  href: string;
};

const LinkButton = forwardRef<HTMLButtonElement, Props>(function LinkButtonBase({ ...props }, ref) {
  const { href, className, children, ...rest } = props;
  return (
    <Button asChild className={className} {...rest} ref={ref}>
      <Link href={href}>{children}</Link>
    </Button>
  );
});
export default LinkButton;
