import React from 'react';
import { render } from 'react-dom';
import ReactTable from 'react-table';
import { fetch, formatDate, Progress, Category, Tips, CATEGORIES, ASPECTS } from './Utils';

import 'react-table/react-table.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = { collection: [], aspects: [], scores: [] };
  }

  async componentDidMount() {
    const { collection, scores } = await fetch();
    const aspects = Object.keys(scores.aspects);
    this.setState({ collection, scores: [scores], aspects: aspects.map((key) => {
      return { ...scores.aspects[key], ...{ name: key }};
    }) });
  }

  render() {
    const { state } = this;
    const { collection, aspects, scores } = state;
    return (
      <div>
        <h2>General Ratings</h2>
        <ReactTable
          data={scores}
          columns={[
            { Header: 'Ratings', columns: [{ Header: 'General', accessor: 'general' }] },
            {
              Header: 'Categories',
              columns: CATEGORIES.map(category => ({
                Header: category, id: category, accessor: d => d[category], Cell: ({ row }) => Progress(row[category])
              }))
            },
          ]}
          showPagination={false}
          defaultPageSize={1}
        />
        <h2>Aspects Ratings</h2>
        <ReactTable
          data={aspects}
          columns={[
            { Header: 'Info', columns: [{ Header: 'Aspect', accessor: 'name' }] },
            {
              Header: 'Ratings',
              columns: [
                { Header: 'General', accessor: 'general' },
              ].concat(CATEGORIES.map(category => ({
                Header: category, id: category, accessor: d => d[category], Cell: ({ row }) => Progress(row[category])
              }))),
            },
          ]}
          showPaginationBottom
          defaultSorted={[{ id: 'name' }]}
          defaultPageSize={5}
          className='-striped -highlight'
        />
        <h2>Reviews</h2>
        <ReactTable
          data={collection}
          columns={[
              {
                Header: 'Ratings',
                columns: [{
                  filterable: true, Header: 'General', accessor: 'general', Cell: ({ row }) => Progress(row.general),
                  filterMethod: (filter, row) => row[filter.id] === +filter.value,
                }],
              }, {
                Header: 'Dates',
                columns: [
                  { Header: 'Travel', accessor: 'travel', Cell: ({ row }) => (formatDate(row.travel)) },
                  { Header: 'Submission', accessor: 'submission', Cell: ({ row }) => (formatDate(row.submission)) },
                ],
              }, {
                Header: 'Info',
                columns: [
                  {
                    filterable: true, Header: 'Travel with', accessor: 'along', Cell: Category,
                    filterMethod: (filter, row) => row[filter.id] && row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
                  },
                  { filterable: true, Header: 'User', accessor: 'user' },
                  { filterable: true, Header: 'Locale', accessor: 'locale' },
                  {
                    filterable: true, Header: 'Title', id: `title`, accessor: d => d.locale in d.titles && d.titles[d.locale],
                    filterMethod: (filter, row) => row[filter.id] && row[filter.id].includes(filter.value),
                  }, {
                    filterable: true, Header: 'Description', id: `description`, accessor: d => d.locale in d.texts && d.texts[d.locale],
                    filterMethod: (filter, row) => row[filter.id] && row[filter.id].includes(filter.value),
                  },
                ],
              }, {
                Header: 'Aspects',
                columns: ASPECTS.map(aspect => ({
                  filterable: true, Header: aspect, id: `aspects.${aspect}`, accessor: d => d.aspects[aspect], Cell: ({ row }) => Progress(row[`aspects.${aspect}`]),
                  filterMethod: (filter, row) => row[filter.id] === +filter.value,
                })),
              },
            ]
          }
          showPaginationBottom
          defaultSorted={[{ id: 'travel', desc: true }]}
          defaultPageSize={10}
          className='-striped -highlight'
        />
        <Tips />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
