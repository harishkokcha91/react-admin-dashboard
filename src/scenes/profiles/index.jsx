import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const ProfilesPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);

  const API_BASE_URL = 'http://localhost:8000/api'; // Replace with your actual base URL
  const token = 'your-token-here'; // Replace with your actual token

  const fetchProfiles = async (page, limit) => {
    try {
      const response = await axios.get(`/api/profiles`, {
        params: { page, limit },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setProfiles(data.profiles || []); // Adjust this if your data structure is different
      setRowCount(data.totalCount || 0); // Assuming the API returns the total count of profiles
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles(page, pageSize);
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage + 1); // DataGrid page index starts from 0
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when page size changes
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Profiles</h1>
      <DataGrid
        rows={profiles}
        columns={[
          { field: 'id', headerName: 'ID', width: 90 },
          { field: 'name', headerName: 'Name', width: 150 },
          // Add more columns as needed
        ]}
        pagination
        page={page - 1}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 20, 50]}
        rowCount={rowCount}
        paginationMode="server"
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        loading={loading}
      />
    </div>
  );
};

export default ProfilesPage;
