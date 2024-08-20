import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, useTheme, IconButton, Modal, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const BlogList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    image: '',
    user: '' // Ensure this is a string
  });

  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'content', headerName: 'Content', flex: 2 },
    { field: 'image', headerName: 'Image', flex: 1, renderCell: ({ value }) => <img src={value} alt="Post" style={{ width: '100px' }} /> },
    { field: 'user', headerName: 'User ID', flex: 1 },
    { field: 'created_at', headerName: 'Created At', type: 'date', flex: 1 },
    { field: 'updated_at', headerName: 'Updated At', type: 'date', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" alignItems="center">
          <IconButton
            color="primary"
            onClick={() => handleEdit(row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  // Function to fetch blog posts
  const fetchBlogs = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
        const response = await axios.get(
            `api/posts`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjQxMzgzNDYsImlhdCI6MTcyNDEzNzQ0NiwibmJmIjoxNzI0MTM3NDQ2LCJzdWIiOjF9.Ee9wLJkpBYJL-NTtCova8HMOaxBMROK_KBqFk4Dq2zDsTFtB6CbMas9N-F4zAbxLHwUtkrB83-QKHv5IPoyQxg`
                },
                params: { page, limit } // Pass page and limit as query parameters
            }
        );
        const data = response.data;
        setBlogs(data.data || []);
        setRowCount(data.results || 0);
    } catch (error) {
        console.error('Error fetching blogs:', error);
    } finally {
        setLoading(false);
    }
};


  // Handlers for actions
  const handleEdit = (blog) => {
    setCurrentBlog(blog);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    console.log('Delete post with ID:', id);
    // Implement your delete functionality here
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setCurrentBlog(null);
  };

  const handleCreateModalClose = () => {
    setOpenCreateModal(false);
    setNewBlog({
      title: '',
      content: '',
      image: '',
      user: '' // Ensure this is a string
    });
  };

  const handleModalSave = async () => {
    if (currentBlog) {
      try {
        const updatedBlog = {
          ...currentBlog,
          user: String(currentBlog.user)  // Ensure user ID is a string
        };

        await axios.put(
          `http://localhost:8000/api/posts/${currentBlog.id}`,
          updatedBlog,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjM4ODUzNTcsImlhdCI6MTcyMzg4NDQ1NywibmJmIjoxNzIzODg0NDU3LCJzdWIiOjMwfQ.VW1__HU5svfNkkicr2xPcmkn0ytpxjR5LUzmxvUcEUpFKtXJBQPz6sdjfE9HiAbQEZtqCda1FCjQ-ScxQYDFng`
            }
          }
        );
        fetchBlogs(); // Refresh blog list
        handleModalClose(); // Close the modal
      } catch (error) {
        console.error('Error updating blog:', error);
      }
    }
  };

  const handleCreateModalSave = async () => {
    try {
      // Ensure user ID is a string
      const newBlogData = {
        ...newBlog,
        user: String(newBlog.user)
      };

      await axios.post(
        `http://localhost:8000/api/posts`,
        newBlogData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjM4ODUzNTcsImlhdCI6MTcyMzg4NDQ1NywibmJmIjoxNzIzODg0NDU3LCJzdWIiOjMwfQ.VW1__HU5svfNkkicr2xPcmkn0ytpxjR5LUzmxvUcEUpFKtXJBQPz6sdjfE9HiAbQEZtqCda1FCjQ-ScxQYDFng`
          }
        }
      );
      fetchBlogs(); // Refresh blog list
      handleCreateModalClose(); // Close the modal
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []); // Fetch blogs on component mount

  return (
    <Box m="20px">
      <Header title="BLOGS" subtitle="Managing the Blog Posts" />

      {/* Button to open the create post modal */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenCreateModal(true)}
        sx={{
            top: 20,
            right: 20,
            zIndex: 1000,
        }}
        >
        Create New Post
        </Button>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none'
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none'
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none'
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400]
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700]
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`
          }
        }}
      >
        <DataGrid
          rows={blogs}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          loading={loading}
          rowCount={rowCount}
          checkboxSelection
        />
      </Box>

      {/* Modal for editing blog */}
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Edit Blog Post
          </Typography>
          {currentBlog && (
            <Box mt={2}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={currentBlog.title}
                onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                margin="normal"
              />
              <TextField
                label="Content"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={currentBlog.content}
                onChange={(e) => setCurrentBlog({ ...currentBlog, content: e.target.value })}
                margin="normal"
              />
              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                value={currentBlog.image}
                onChange={(e) => setCurrentBlog({ ...currentBlog, image: e.target.value })}
                margin="normal"
              />
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" onClick={handleModalSave}>
                  Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleModalClose}>
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>

      {/* Modal for creating new blog */}
      <Modal
        open={openCreateModal}
        onClose={handleCreateModalClose}
        aria-labelledby="create-modal-title"
        aria-describedby="create-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography id="create-modal-title" variant="h6" component="h2">
            Create New Blog Post
          </Typography>
          <Box mt={2}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={newBlog.title}
              onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
              margin="normal"
            />
            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={newBlog.content}
              onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
              margin="normal"
            />
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              value={newBlog.image}
              onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
              margin="normal"
            />
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" onClick={handleCreateModalSave}>
                Save
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCreateModalClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default BlogList;
