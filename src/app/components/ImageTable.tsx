import React, { useEffect } from 'react';
import { SearchInput, Title } from '@patternfly/react-core';
import { Table, Caption, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';

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

  const filteredImageData = imageData.filter((item: ImageData) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

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


  return (
    <React.Fragment>
      <Title headingLevel='h1'>Browse Images</Title>
      <Table
        aria-label="RHEL Cloud Images"
        variant={'compact'}
      >
        <Thead>
          <SearchInput
            onChange={handleSearch}
            id='search'
            placeholder='Search by name'
          />
          <Tr>
            <Th>{'Name'}</Th>
            <Th>{'Provider'}</Th>
            <Th>{'Region'}</Th>
            <Th>{'Architecture'}</Th>
            <Th>{'Date'}</Th>
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

