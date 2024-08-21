import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, useTheme, IconButton, Modal, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getToken } from '../../utils/tokenservice';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Events = () => {
    const token = getToken();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        date_time: '',
        location: '',
        image: ''
    });

    // Define columns for DataGrid
    const columns = [
        { field: 'ID', headerName: 'ID', width: 90 },
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 2 },
        { field: 'date_time', headerName: 'Date & Time', flex: 1 },
        { field: 'location', headerName: 'Location', flex: 1 },
        { field: 'image', headerName: 'Image', flex: 1, renderCell: ({ value }) => <img src={value} alt="Event" style={{ width: '100px' }} /> },
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
                        onClick={() => handleDelete(row.ID)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            )
        }
    ];

   // Function to fetch event data
const fetchEvents = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
        const response = await axios.get('/api/events/', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            params: { page, limit } // Pass page and limit as query parameters
        });

        const data = response.data;
        console.log("API Response:", data.data);

        // Format the events to include the `id` property
        const formattedEvents = data.data.map(event => ({
            id: event.ID,  // Use the unique identifier
            ...event
        }));

        setEvents(formattedEvents);
        console.log("API event:", formattedEvents);

        setRowCount(data.results || 0);
    } catch (error) {
        console.error('Error fetching events:', error);
    } finally {
        setLoading(false);
    }
};


    // Handlers for actions
    const handleEdit = (event) => {
        setCurrentEvent(event);
        setOpenModal(true);
    };

    const handleDelete = async (eventId) => {
        try {
            await axios.delete(`/api/events/${eventId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            fetchEvents(); // Refresh event list after deletion
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setCurrentEvent(null);
    };

    const handleCreateModalClose = () => {
        setOpenCreateModal(false);
        setNewEvent({
            title: '',
            description: '',
            date_time: '',
            location: '',
            image: ''
        });
    };

    const handleModalSave = async () => {
        if (currentEvent) {
            try {
                await axios.put(
                    `/api/events/${currentEvent.ID}`,
                    currentEvent,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                fetchEvents(); // Refresh event list
                handleModalClose(); // Close the modal
            } catch (error) {
                console.error('Error updating event:', error);
            }
        }
    };

    const handleCreateModalSave = async () => {
        try {
            await axios.post(
                `/api/events`,
                newEvent,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchEvents(); // Refresh event list
            handleCreateModalClose(); // Close the modal
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    useEffect(() => {
        console.log("in use effect")
        fetchEvents();

    }, []); // Fetch events on component mount

    return (
        <Box m="20px">
            <Header title="EVENTS" subtitle="Managing the Events" />

            {/* Button to open the create event modal */}
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
                Create New Event
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
                    rows={events}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    loading={loading}
                    rowCount={rowCount}
                    checkboxSelection
                />
            </Box>

            {/* Modal for editing event */}
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
                    Edit Event
                </Typography>
                {currentEvent && (
                    <Box mt={2}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            value={currentEvent.title}
                            onChange={(e) => setCurrentEvent({ ...currentEvent, title: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={currentEvent.description}
                            onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
                            margin="normal"
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Date & Time"
                                // value={currentEvent.date_time ? dayjs(currentEvent.date_time).toDate() : null}
                                onChange={(newValue) => setCurrentEvent({ ...currentEvent, date_time: newValue })}
                                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                            />
                        </LocalizationProvider>
                        <TextField
                            label="Location"
                            variant="outlined"
                            fullWidth
                            value={currentEvent.location}
                            onChange={(e) => setCurrentEvent({ ...currentEvent, location: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            label="Image URL"
                            variant="outlined"
                            fullWidth
                            value={currentEvent.image}
                            onChange={(e) => setCurrentEvent({ ...currentEvent, image: e.target.value })}
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

            {/* Modal for creating new event */}
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
                        Create New Event
                    </Typography>
                    <Box mt={2}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            label="Date & Time"
                            variant="outlined"
                            fullWidth
                            type="datetime-local"
                            InputLabelProps={{ shrink: true }}
                            value={newEvent.date_time}
                            onChange={(e) => setNewEvent({ ...newEvent, date_time: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            label="Location"
                            variant="outlined"
                            fullWidth
                            value={newEvent.location}
                            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            label="Image URL"
                            variant="outlined"
                            fullWidth
                            value={newEvent.image}
                            onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
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

export default Events;
