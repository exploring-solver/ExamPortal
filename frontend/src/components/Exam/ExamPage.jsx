import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  CircularProgress,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemSecondaryAction
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const ExamPage = () => {
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    answer: '',
    subject: '',
    category: ''
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch all question IDs for the exam
        const response = await axios.get(`http://127.0.0.1:3000/api/exams/getall/${examId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const questionIds = response.data;
        const questionPromises = questionIds.map(id =>
          axios.get(`http://127.0.0.1:3000/api/questions/${id.question_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );

        const questionResponses = await Promise.all(questionPromises);
        const fullQuestions = questionResponses.map(res => res.data);

        setQuestions(fullQuestions);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Error fetching questions');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [examId]);

  const handleCreateQuestion = async () => {
    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...newQuestion,
        exam_id: parseInt(examId, 10) // Convert examId to integer
      };
      await axios.post('http://127.0.0.1:3000/api/questions', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewQuestion({
        question: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        answer: '',
        subject: '',
        category: ''
      });
      // Fetch the updated list of questions
      const response = await axios.get(`http://127.0.0.1:3000/api/exams/getall/${examId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const questionIds = response.data;
      const questionPromises = questionIds.map(id =>
        axios.get(`http://127.0.0.1:3000/api/questions/${id.question_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      );
  
      const questionResponses = await Promise.all(questionPromises);
      const fullQuestions = questionResponses.map(res => res.data);
  
      setQuestions(fullQuestions);
      alert('Question created successfully');
    } catch (err) {
      setError('Error creating question');
    }
  };

  const handleDeleteClick = (question) => {
    setQuestionToDelete(question);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:3000/api/questions/${questionToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(questions.filter(question => question.id !== questionToDelete.id));
      setDeleteDialogOpen(false);
    } catch (err) {
      setError('Error deleting question');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Exam {examId} - Questions
      </Typography>
      <Paper style={{ padding: 16 }}>
        <List>
          {questions.map((question) => (
            <ListItem key={question.id}>
              <ListItemText
                primary={question.question}
                secondary={`Options: A) ${question.option_a}, B) ${question.option_b}, C) ${question.option_c}, D) ${question.option_d} | Answer: ${question.answer} | Subject: ${question.subject} | Category: ${question.category}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteClick(question)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" component="h2" gutterBottom>
          Add New Question
        </Typography>
        <TextField
          label="Question"
          fullWidth
          margin="normal"
          value={newQuestion.question}
          onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
        />
        <TextField
          label="Option A"
          fullWidth
          margin="normal"
          value={newQuestion.option_a}
          onChange={(e) => setNewQuestion({ ...newQuestion, option_a: e.target.value })}
        />
        <TextField
          label="Option B"
          fullWidth
          margin="normal"
          value={newQuestion.option_b}
          onChange={(e) => setNewQuestion({ ...newQuestion, option_b: e.target.value })}
        />
        <TextField
          label="Option C"
          fullWidth
          margin="normal"
          value={newQuestion.option_c}
          onChange={(e) => setNewQuestion({ ...newQuestion, option_c: e.target.value })}
        />
        <TextField
          label="Option D"
          fullWidth
          margin="normal"
          value={newQuestion.option_d}
          onChange={(e) => setNewQuestion({ ...newQuestion, option_d: e.target.value })}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Answer</InputLabel>
          <Select
            value={newQuestion.answer}
            onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
          >
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
            <MenuItem value="D">D</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Subject"
          fullWidth
          margin="normal"
          value={newQuestion.subject}
          onChange={(e) => setNewQuestion({ ...newQuestion, subject: e.target.value })}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={newQuestion.category}
            onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateQuestion}
          style={{ marginTop: 16 }}
        >
          Add Question
        </Button>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this question?</Typography>
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

export default ExamPage;
