import { useEffect, Dispatch, SetStateAction } from 'react';
import { matchPath } from 'react-router-dom';

// ==============================|| MENU TYPES ||============================== //

interface NavItemType {
  id?: string;
  children?: NavItemType[];
  link?: string;
  url?: string;
}

// ==============================|| MENU COLLAPSED - RECURSIVE FUNCTION ||============================== //

/**
 * Recursively traverses menu items to find and open the correct parent menu.
 * If a menu item matches the current pathname, it marks the corresponding menu as selected and opens it.
 */
function setParentOpenedMenu(
  items: NavItemType[],
  pathname: string,
  menuId: string | undefined,
  setSelected: Dispatch<SetStateAction<string | null>>,
  setOpen: Dispatch<SetStateAction<boolean>>
): void {
  for (const item of items) {
    // Recursively check child menus
    if (item.children?.length) {
      setParentOpenedMenu(item.children, pathname, menuId, setSelected, setOpen);
    }

    // Check if the current menu item matches the pathname
    if ((item.link && matchPath({ path: item.link, end: false }, pathname)) || item.url === pathname) {
      setSelected(menuId ?? null); // Select the parent menu
      setOpen(true); // Open the menu
    }
  }
}

// ==============================|| MENU COLLAPSED - HOOK ||============================== //

/**
 * Hook to handle menu collapse behavior based on the current route.
 * Automatically expands the parent menu of the active route item.
 */
export default function useMenuCollapse(
  menu: NavItemType,
  pathname: string,
  miniMenuOpened: boolean,
  setSelected: Dispatch<SetStateAction<string | null>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>
): void {
  useEffect(() => {
    setOpen(false); // Close the menu initially
    !miniMenuOpened ? setSelected(null) : setAnchorEl(null); // Reset selection based on menu state

    // If menu has children, determine which should be opened
    if (menu.children?.length) {
      setParentOpenedMenu(menu.children, pathname, menu.id, setSelected, setOpen);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menu.children]);
}
