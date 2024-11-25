'use client';

import {
  forwardRef,
  ElementRef,
  ComponentPropsWithoutRef,
  useState,
  useEffect,
} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import supabase from '@/lib/supabaseClient';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
];

export const Navbar = () => {
  const router = useRouter();

  const COUNT = 4;
  const defaultActivatedAssets = Array(COUNT).fill({});
  const [activatedAssets, setActivatedAssets] = useState<unknown[]>(
    defaultActivatedAssets
  );

  const [idleAssets, setIdleAssets] = useState<unknown[]>([]);

  useEffect(() => {
    const fetchActivatedAssets = async () => {
      const { data: activatedAssets } = await supabase
        .from('test_activated_assets')
        .select('*')
        .limit(COUNT);

      setActivatedAssets(activatedAssets || defaultActivatedAssets);
    };
    fetchActivatedAssets();

    const fetchIdleAssets = async () => {
      const { data: idleAssets } = await supabase
        .from('test_assets')
        .select('*')
        .eq('type', '建物')
        .limit(6);

      setIdleAssets(idleAssets || []);
    };
    fetchIdleAssets();
  }, []);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/news" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              最新消息
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onClick={() => {
              router.push('/achievements?page=1');
            }}
          >
            媒合成果
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href={`/achievements/${activatedAssets[0].id}`}
                  >
                    <Icons.logo className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      {activatedAssets[0].location}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      {activatedAssets[0].usage_plan}
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {activatedAssets.slice(1).map((asset) => (
                <ListItem
                  href={`/achievements/${asset.id}`}
                  title={asset.location}
                  key={asset.id}
                >
                  {asset.usage_plan}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onClick={() => {
              router.push('/availables');
            }}
          >
            查詢可利用空間
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {idleAssets.map((asset) => (
                <ListItem
                  key={asset.id}
                  title={asset.target_name}
                  href={`/availables/${asset.id}`}
                >
                  {asset.address}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/feedback" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              意見回饋
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = forwardRef<ElementRef<'a'>, ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';
