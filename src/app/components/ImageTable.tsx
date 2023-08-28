import React, { useEffect } from 'react';
import {
  SearchInput,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  ToolbarFilter,
  Pagination,
  Drawer,
  DrawerContent,
  DrawerContentBody,
  Button,
  EmptyState,
  EmptyStateIcon,
  EmptyStatePrimary,
  EmptyStateBody,
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import { Table, Thead, Tr, Th, ThProps, Tbody, Td } from '@patternfly/react-table';
import { fetch } from 'cross-fetch'
import { DetailsDrawer } from './DetailsDrawer';
import { ImageTableFilter } from './ImageTableFilter';
interface ImageData {
  name: string;
  version: string;
  imageId: string;
  provider: string;
  region: string;
  arch: string;
  date: string;
  selflink: URL;
  virt: string;
}


export const ImageTable: React.FunctionComponent = () => {
  const [search, setSearch] = React.useState('');
  const [imageData, setImageData] = React.useState([]);
  const [activeSortIndex, setActiveSortIndex] = React.useState<number | undefined>(undefined);
  const [activeSortDirection, setActiveSortDirection] = React.useState<'asc' | 'desc' | undefined>(undefined);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(20);
  const [isDrawerExpanded, setIsExpanded] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState({});
  const [providerSelections, setProviderSelections] = React.useState<string[]>([]);
  const [regionSelections, setRegionSelections] = React.useState<string[]>([]);
  const [architectureSelections, setArchitectureSelections] = React.useState<string[]>([]);
  const [filterConfig, setFilterConfig] = React.useState<object[]>([]);

  const drawerRef = React.useRef<HTMLDivElement>();

  const onFilter = (image: ImageData) => {
    const matchesProviderValue = providerSelections.includes(image.provider.toLowerCase());
    const matchesRegionValue = regionSelections.includes(image.region.toLowerCase());
    const matchesArchitectureValue = architectureSelections.includes(image.arch.toLowerCase());

    return (
      (providerSelections.length === 0 || matchesProviderValue)
      && (regionSelections.length === 0 || matchesRegionValue)
      && (architectureSelections.length === 0 || matchesArchitectureValue)
    );
  };

  const onFilterSelect = (_: React.MouseEvent | undefined, itemId: string | number | undefined) => {
    if (!itemId || typeof itemId !== 'string') {
      return;
    }

    const itemIdElements = itemId.split('/');
    const category = itemIdElements[0];
    const item = itemIdElements[1];
    let selections: string[] = [];

    switch (category) {
      case 'provider':
        selections = providerSelections.includes(item)
          ? providerSelections.filter((fil: string) => fil !== item)
          : [item, ...providerSelections]
        setProviderSelections(selections);
        break;
      case 'region':
        selections = regionSelections.includes(item)
          ? regionSelections.filter((fil: string) => fil !== item)
          : [item, ...regionSelections]
        setRegionSelections(selections);
        break;
      case 'architecture':
        selections = architectureSelections.includes(item)
          ? architectureSelections.filter((fil: string) => fil !== item)
          : [item, ...architectureSelections]
        setArchitectureSelections(selections);
        break;
      default:
        break;
    }
    setPage(1);
  };

  const onFilterDelete = (type: string, id: string) => {
    switch (type) {
      case 'provider':
        if (id === 'all') {
          setProviderSelections([]);
        } else {
          setProviderSelections(providerSelections.filter((fil: string) => fil !== id));
        }
        break;
      case 'region':
        if (id === 'all') {
          setRegionSelections([]);
        } else {
          setRegionSelections(regionSelections.filter((fil: string) => fil !== id));
        }
        break;
      case 'architecture':
        if (id === 'all') {
          setArchitectureSelections([]);
        } else {
          setArchitectureSelections(architectureSelections.filter((fil: string) => fil !== id));
        }
        break;
      default:
        setProviderSelections([]);
        setRegionSelections([]);
        setArchitectureSelections([]);
        break;
    }
    setPage(1);
  };

  const isFilterSelected = (category: string, itemId: string): boolean => {
    let filterSelected = false;
    switch (category) {
      case 'provider':
        filterSelected = providerSelections.includes(itemId);
        break;
      case 'region':
        filterSelected = regionSelections.includes(itemId);
        break;
      case 'architecture':
        filterSelected = architectureSelections.includes(itemId);
        break;
      default:
        break;
    }
    return filterSelected;
  };

  const getSelectedFiltersByCategory = (category: string): string[] => {
    let filters = [] as string[];
    switch (category) {
      case 'provider':
        filters = providerSelections;
        break;
      case 'region':
        filters = regionSelections;
        break;
      case 'architecture':
        filters = architectureSelections;
        break;
      default:
        break;
    }
    return filters;
  };


  const onDrawerExpand = () => {
    drawerRef.current && drawerRef.current.focus();
  };

  const onDrawerOpenClick = (details: object) => {
    setIsExpanded(true);
    setSelectedImage(details);
  };

  const onDrawerCloseClick = () => {
    setIsExpanded(false);
  };

  const columnNames = {
    name: 'Name',
    provider: 'Provider',
    region: 'Region',
    arch: 'Architecture',
    date: 'Release Date'
  };

  useEffect(() => {
    loadImageData();
  }, [])

  const loadImageData = () => {
    fetch('https://staging.imagedirectory.cloud/images/v2/all', {
      method: 'get',
    })
      .then(res => res.json())
      .then((data) => {
        setImageData(data);
        setFilterConfig([
          {
            category: 'provider',
            data: [...new Set(data.map((item: string) => item['provider']))]
          },
          {
            category: 'region',
            data: [...new Set(data.map((item: string) => item['region']))]
          },
          {
            category: 'architecture',
            data: [...new Set(data.map((item: string) => item['arch'].toLowerCase()))]
          }
        ]);
      })
  };

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    setIsExpanded(false);
    setSearch(event.currentTarget.value);
    setPage(1);
  };

  const getSortParams = (columnIndex: number): ThProps['sort'] => ({
    sortBy: {
      index: activeSortIndex,
      direction: activeSortDirection
    },
    onSort: (_event, index, direction) => {
      setActiveSortIndex(index);
      setActiveSortDirection(direction);
    },
    columnIndex
  });

  const getSortableRowValues = (image: ImageData): (string | number)[] => {
    const { name, provider, region, arch, date } = image;
    return [name, provider, region, arch, date];
  };

  const onSetPage = (_event: React.MouseEvent | React.KeyboardEvent | MouseEvent, newPage: number) => {
    setIsExpanded(false);
    setPage(newPage);
  };

  const onPerPageSelect = (
    _event: React.MouseEvent | React.KeyboardEvent | MouseEvent,
    newPerPage: number,
    newPage: number
  ) => {
    setPerPage(newPerPage);
    setPage(newPage);
  };

  const filteredImageData = imageData.filter(onFilter);
  const searchedImageData = filteredImageData.filter((item: ImageData) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedImageData = searchedImageData.slice((page - 1) * perPage, page * perPage);

  let sortedImageData = paginatedImageData;
  if (activeSortIndex !== undefined) {
    sortedImageData = paginatedImageData.sort((a, b) => {
      const aValue = getSortableRowValues(a)[activeSortIndex];
      const bValue = getSortableRowValues(b)[activeSortIndex];
      if (typeof aValue === 'number') {
        // Numeric sort in case we want to add version as a sortable column
        if (activeSortDirection === 'asc') {
          return (aValue as number) - (bValue as number);
        }
        return (bValue as number) - (aValue as number);
      } else {
        // String sort
        if (activeSortDirection === 'asc') {
          return (aValue as string).localeCompare(bValue as string);
        }
        return (bValue as string).localeCompare(aValue as string);
      }
    });
  }

  const panelContent = (
    <DetailsDrawer
      onCloseClick={onDrawerCloseClick}
      drawerRef={drawerRef}
      isExpanded={isDrawerExpanded}
      details={selectedImage} />
  );

  const emptyState = (
    <EmptyState>
      <EmptyStateIcon icon={SearchIcon} />
      <Title size="lg" headingLevel="h4">
        No results found
      </Title>
      <EmptyStateBody>No results match the filter criteria. Clear all filters and try again.</EmptyStateBody>
      <EmptyStatePrimary>
        <Button
          variant="link"
          onClick={() => {
            setIsExpanded(false);
            setSearch('');
            setPage(1);
            onFilterDelete('', '');
          }}
        >
          Clear all filters
        </Button>
      </EmptyStatePrimary>
    </EmptyState>
  );
  //add searchinput that clears once the setSearch is called

  return (
    <React.Fragment>
      <Title headingLevel='h1'>Browse Images</Title>
      <Toolbar
        id="toolbar-top"
        clearAllFilters={() => onFilterDelete('', '')}>
        <ToolbarContent>
          <ToolbarItem variant="search-filter">
            <SearchInput
              onChange={handleSearch}
              value={search}
              id='search'
              placeholder='Search by name'
            />
          </ToolbarItem>
          {filterConfig.map((filter: object) => {
            const category = filter['category'];
            const data = filter['data'];
            return (
              <ToolbarItem key={category}>
                <ToolbarFilter
                  chips={getSelectedFiltersByCategory(category)}
                  deleteChip={(category, chip) => onFilterDelete(category as string, chip as string)}
                  deleteChipGroup={() => onFilterDelete(category, 'all')}
                  categoryName={category}
                >
                  <ImageTableFilter
                    onFilterSelect={onFilterSelect}
                    category={category}
                    filters={data}
                    isFilterSelected={isFilterSelected}
                    totalFilterCount={getSelectedFiltersByCategory(category).length} />
                </ToolbarFilter>
              </ToolbarItem>
            )
          }
          )}

          <ToolbarItem alignment={{
            default: 'alignRight'
          }}>
            <Pagination
              perPageComponent="button"
              itemCount={searchedImageData.length}
              perPage={perPage}
              page={page}
              onSetPage={onSetPage}
              onPerPageSelect={onPerPageSelect}
              isCompact
            />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

      <Drawer isExpanded={isDrawerExpanded} position="right" onExpand={onDrawerExpand}>
        <DrawerContent panelContent={panelContent}>
          <DrawerContentBody>

            <Table
              aria-label="RHEL Cloud Images"
              variant={'compact'}
            >
              <Thead>
                <Tr>
                  <Th sort={getSortParams(0)}>{columnNames.name}</Th>
                  <Th sort={getSortParams(1)}>{columnNames.provider}</Th>
                  <Th sort={getSortParams(2)}>{columnNames.region}</Th>
                  <Th sort={getSortParams(3)}>{columnNames.arch}</Th>
                  <Th sort={getSortParams(4)}>{columnNames.date}</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {sortedImageData.length > 0 &&
                  sortedImageData.map((image: ImageData) => (
                    <Tr key={image.name}>
                      <Td dataLabel={columnNames.name}>{image.name}</Td>
                      <Td dataLabel={columnNames.provider}>{image.provider}</Td>
                      <Td dataLabel={columnNames.region}>{image.region}</Td>
                      <Td dataLabel={columnNames.arch}>{image.arch}</Td>
                      <Td dataLabel={columnNames.date}><p>{new Date(image.date).toDateString()}</p></Td>
                      <Td>
                        <Button
                          aria-expanded={isDrawerExpanded}
                          onClick={e => onDrawerOpenClick(image)}
                          variant='link'
                          isInline>
                          Launch now
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                {sortedImageData.length === 0 && (
                  <Tr>
                    <Td colSpan={8}>
                      {emptyState}
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </DrawerContentBody>
        </DrawerContent>
      </Drawer>

      <Toolbar id="toolbar-bottom">
        <ToolbarContent>
          <ToolbarItem alignment={{
            default: 'alignRight'
          }}>
            <Pagination
              perPageComponent="button"
              itemCount={searchedImageData.length}
              perPage={perPage}
              page={page}
              onSetPage={onSetPage}
              onPerPageSelect={onPerPageSelect}
              isCompact
            />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

    </React.Fragment>
  );
};
