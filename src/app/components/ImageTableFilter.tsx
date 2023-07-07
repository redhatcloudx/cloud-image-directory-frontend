import React, { ReactElement } from 'react';
import { FilterIcon } from '@patternfly/react-icons';
import {
  Badge,
  Menu,
  MenuContent,
  MenuList,
  MenuItem,
  MenuToggle,
  Popper,
  MenuGroup
} from '@patternfly/react-core';

export const ImageTableFilter: React.FunctionComponent<{
  onFilterSelect: (
    event: React.MouseEvent | undefined,
    itemId: string | number | undefined) => void,
  isFilterSelected: (
    category: string,
    itemId: string) => boolean,
  category: string,
  filters: string[],
  totalFilterCount: number,
}> = ({
  onFilterSelect,
  category,
  filters,
  isFilterSelected,
  totalFilterCount
}) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const toggleRef = React.useRef<HTMLButtonElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handleKeys = (event: KeyboardEvent) => {
        if (isOpen && menuRef.current?.contains(event.target as Node)) {
          if (event.key === 'Escape' || event.key === 'Tab') {
            setIsOpen(!isOpen);
            toggleRef.current?.focus();
          }
        }
      };

      const handleClickOutside = (event: MouseEvent) => {
        if (isOpen && !menuRef.current?.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeys);
      window.addEventListener('click', handleClickOutside);
      return () => {
        window.removeEventListener('keydown', handleKeys);
        window.removeEventListener('click', handleClickOutside);
      };
    }, [isOpen, menuRef]);

    const onToggleClick = (ev: React.MouseEvent) => {
      ev.stopPropagation();
      setTimeout(() => {
        if (menuRef.current) {
          const firstElement = menuRef.current.querySelector('li > button:not(:disabled)');
          firstElement && (firstElement as HTMLElement).focus();
        }
      }, 0);
      setIsOpen(!isOpen);
    };

    const createMenuGroup = (category: string, items: string[]): ReactElement => {
      return (
        <MenuGroup label={category}>
          {
            items.map((item, index) => {
              return (
                <MenuItem hasCheck key={`${category}-${index}`} isSelected={isFilterSelected(category, item)} itemId={`${category}/${item}`}>
                  {item}
                </MenuItem>
              )
            })
          }
        </MenuGroup>
      )
    }

    const menuItemGroups = createMenuGroup(category, filters)

    const menu = (
      <Menu
        isScrollable
        ref={menuRef}
        id="image-filter-menu"
        onSelect={onFilterSelect}
      >
        <MenuContent maxMenuHeight="300px">
          <MenuList>
            {menuItemGroups}
          </MenuList>
        </MenuContent>
      </Menu>
    );

    const toggle = (
      <MenuToggle
        ref={toggleRef}
        onClick={onToggleClick}
        isExpanded={isOpen}
        icon={<FilterIcon />}
      >
        Filter {category}
        {totalFilterCount > 0 && <Badge isRead>{totalFilterCount}</Badge>}
      </MenuToggle>
    )

    return (
      <div ref={containerRef}>
        <Popper direction="down" trigger={toggle} popper={menu} appendTo={containerRef.current || undefined} isVisible={isOpen} />
      </div>
    );
  }
