import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const OrganizationDashboard = () => {
  const [organizationId, setOrganizationId] = useState(null);
  const [exams, setExams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [selectedSector, setSelectedSector] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newExam, setNewExam] = useState({ name: '', description: '', category_id: '', sector_id: '', exam_date: '' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch organization ID and exams
        const orgResponse = await axios.get('http://127.0.0.1:3000/api/users/organization-id', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrganizationId(orgResponse.data.organizationId);

        // Fetch exams
        const examsResponse = await axios.get(`http://127.0.0.1:3000/api/exams/organization/${orgResponse.data.organizationId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExams(examsResponse.data);

        // Fetch sectors
        const sectorsResponse = await axios.get('http://127.0.0.1:3000/api/sectors', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSectors(sectorsResponse.data);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSectorChange = async (event) => {
    const sectorId = event.target.value;
    setSelectedSector(sectorId);
    setNewExam({ ...newExam, sector_id: sectorId });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://127.0.0.1:3000/api/categories/${sectorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (err) {
      setError('Error fetching categories');
    }
  };

  const handleDeleteClick = (exam) => {
    setExamToDelete(exam);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/exams/${examToDelete.id}`);
      setExams(exams.filter(exam => exam.id !== examToDelete.id));
      setDeleteDialogOpen(false);
    } catch (err) {
      setError('Error deleting exam');
    }
  };

  const handleCreateExam = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://127.0.0.1:3000/api/exams/organization/${organizationId}`, newExam, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewExam({ name: '', description: '', category_id: '', sector_id: '', exam_date: '' });
      window.location.reload(); // Refresh exams list
    } catch (err) {
      setError('Error creating exam');
    }
  };

  const handleExamClick = (examId) => {
    navigate(`/examOrganization/${examId}`);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Organization Dashboard
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Organization ID: {organizationId}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="h2">
            Exams
          </Typography>
          <Paper style={{ padding: 16 }}>
            <List>
              {exams.map((exam) => (
                <ListItem key={exam.id} button onClick={() => handleExamClick(exam.id)}>
                  <ListItemText
                    primary={exam.name}
                    secondary={`Description: ${exam.description} | Date: ${new Date(exam.exam_date).toLocaleDateString()}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteClick(exam)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="h2">
            Create New Exam
          </Typography>
          <Paper style={{ padding: 16 }}>
            <TextField
              label="Exam Name"
              fullWidth
              margin="normal"
              value={newExam.name}
              onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={newExam.description}
              onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Sector</InputLabel>
              <Select
                value={newExam.sector_id}
                onChange={handleSectorChange}
              >
                {sectors.map((sector) => (
                  <MenuItem key={sector.id} value={sector.id}>
                    {sector.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={newExam.category_id}
                onChange={(e) => setNewExam({ ...newExam, category_id: e.target.value })}
                disabled={!selectedSector} // Disable if no sector is selected
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Exam Date"
              type="date"
              fullWidth
              margin="normal"
              value={newExam.exam_date}
              onChange={(e) => setNewExam({ ...newExam, exam_date: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleCreateExam}
              style={{ marginTop: 16 }}
            >
              Create Exam
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this exam?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrganizationDashboard;
