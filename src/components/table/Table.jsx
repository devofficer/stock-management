import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Box } from '@material-ui/core';
import { csv } from 'd3';
import { STOCK_DATA_URL, columns } from './constants';


const Table = () => {
    const [data, setData] = useState([]);

    useEffect(() => csv(STOCK_DATA_URL, null, null).then(data => setData(data)), []);

    return (
        <Box p={4}>
            {data.length ? (
                <MaterialTable
                    title="Stock Table"
                    data={data}
                    columns={columns}
                    options={{ search: true, paging: false, filtering: true, exportButton: true, maxBodyHeight: 500 }}
                />
            ) : 'Loading data...'}

        </Box>
    )
};

export default Table;