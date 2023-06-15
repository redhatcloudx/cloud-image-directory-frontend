import React, { useEffect } from 'react';
import { SearchInput, Title, Toolbar, ToolbarContent, ToolbarItem } from '@patternfly/react-core';
import { Table, Thead, Tr, Th, ThProps, Tbody, Td } from '@patternfly/react-table';

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
};

export const TableBasic: React.FunctionComponent = () => {
  const [search, setSearch] = React.useState('');
  const [imageData, setImageData] = React.useState([]);
  const [activeSortIndex, setActiveSortIndex] = React.useState<number | null>(null);
  const [activeSortDirection, setActiveSortDirection] = React.useState<'asc' | 'desc' | null>(null);

  useEffect(() => {
    loadImageData()
  }, [])

  const loadImageData = () => {
    fetch('https://imagedirectory.cloud/images/v2/all', {
      method: 'get',
    })
      .then(res => res.json())
      .then(data => {
        setImageData(data)
      })
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
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

  let sortedImageData = imageData;
  if (activeSortIndex !== null) {
    sortedImageData = imageData.sort((a, b) => {
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

  const filteredImageData = sortedImageData.filter((item: ImageData) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <React.Fragment>
      <Title headingLevel='h1'>Browse Images</Title>
      <Toolbar id="toolbar-items">
        <ToolbarContent>
          <ToolbarItem variant="search-filter">
            <SearchInput
              onChange={handleSearch}
              id='search'
              placeholder='Search by name'
            />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      <Table
        aria-label="RHEL Cloud Images"
        variant={'compact'}
      >
        <Thead>
          <Tr>
            <Th sort={getSortParams(0)}>{'Name'}</Th>
            <Th sort={getSortParams(1)}>{'Provider'}</Th>
            <Th sort={getSortParams(2)}>{'Region'}</Th>
            <Th sort={getSortParams(3)}>{'Architecture'}</Th>
            <Th sort={getSortParams(4)}>{'Date'}</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredImageData.map((image: ImageData) => (
            <Tr key={image.name}>
              <Td dataLabel={'Name'}>{image.name}</Td>
              <Td dataLabel={'Provider'}>{image.provider}</Td>
              <Td dataLabel={'Region'}>{image.region}</Td>
              <Td dataLabel={'Architecture'}>{image.arch}</Td>
              <Td dataLabel={'Date'}><p>{new Date(image.date).toDateString()}</p></Td>
              <Td dataLabel={'Action'}>{<a href=''>Launch</a>}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </React.Fragment>
  );
};

