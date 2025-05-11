import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSun, faMoon, faCalendarAlt, faPlus, faTasks } from '@fortawesome/free-solid-svg-icons';

function FeminineTaskDashboard() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Load tasks and preferences from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        const tasksWithDates = parsedTasks.map(task => ({
          ...task,
          date: new Date(task.date)
        }));
        setTasks(tasksWithDates);
      } catch (error) {
        console.error('Failed to parse saved tasks', error);
      }
    }
    
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true');
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      if (editIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = { 
          text: task, 
          date: selectedDate, 
          completed: tasks[editIndex].completed 
        };
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, { 
          text: task, 
          date: selectedDate, 
          completed: false 
        }]);
      }
      setTask('');
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEdit = (index) => {
    setTask(tasks[index].text);
    setSelectedDate(tasks[index].date);
    setEditIndex(index);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const toggleMode = () => setDarkMode(!darkMode);

  // Feminine color palette
  const colors = {
    primary: darkMode ? '' : 'green', // Soft pink/purple
    secondary: darkMode ? '#A5D4D4' : '#7EBFC7', // Soft teal
    background: darkMode ? '#1A1A2E' : '#F9F5FF', // Very light purple/Deep navy
    surface: darkMode ? '#16213E' : '#FFFFFF',
    text: darkMode ? '#E6E6E6' : '#4A4A4A',
    secondaryText: darkMode ? '#B8B8B8' : '#7A7A7A',
    border: darkMode ? '#2D2D42' : '#E8E0F0',
    accent: darkMode ? '#FF9AA2' : '#FF6B88', // Rosy pink
  };

  const styles = {
    app: {
      backgroundColor: colors.background,
      color: colors.text,
      minHeight: '100vh',
      padding: '0',
      fontFamily: "'Poppins', 'Segoe UI', sans-serif",
      transition: 'all 0.3s ease',
      display: 'flex',
    },
    sidebar: {
      width: '240px',
      backgroundColor: darkMode ? '#16213E' : '#FFFFFF',
      padding: '32px 24px',
      borderRight: `1px solid ${colors.border}`,
      boxShadow: darkMode ? 'none' : '2px 0 10px rgba(0,0,0,0.05)',
    },
    mainContent: {
      flex: 1,
      padding: '32px 40px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: colors.primary,
      fontSize: '24px',
      fontWeight: '600',
      margin: 0,
    },
    modeToggle: {
      backgroundColor: 'transparent',
      border: 'none',
      color: colors.text,
      cursor: 'pointer',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 12px',
      borderRadius: '8px',
      transition: 'all 0.2s',
      ':hover': {
        backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      },
    },
    formContainer: {
      backgroundColor: colors.surface,
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      marginBottom: '32px',
      border: `1px solid ${colors.border}`,
    },
    formTitle: {
      color: colors.primary,
      marginTop: 0,
      marginBottom: '20px',
      fontSize: '18px',
      fontWeight: '500',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    inputGroup: {
      display: 'flex',
      gap: '16px',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
      },
    },
    input: {
      flex: 1,
      padding: '14px 16px',
      borderRadius: '10px',
      border: `1px solid ${colors.border}`,
      backgroundColor: darkMode ? '#1E2A47' : colors.surface,
      color: colors.text,
      fontSize: '15px',
      transition: 'all 0.2s',
      ':focus': {
        outline: 'none',
        borderColor: colors.primary,
        boxShadow: `0 0 0 2px ${colors.primary}20`,
      },
    },
    dateInput: {
      padding: '14px 16px',
      borderRadius: '10px',
      border: `1px solid ${colors.border}`,
      backgroundColor: darkMode ? '#1E2A47' : colors.surface,
      color: colors.text,
      fontSize: '15px',
      transition: 'all 0.2s',
      ':focus': {
        outline: 'none',
        borderColor: colors.primary,
        boxShadow: `0 0 0 2px ${colors.primary}20`,
      },
    },
    submitButton: {
      padding: '14px 24px',
      backgroundColor: colors.primary,
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      ':hover': {
        backgroundColor: darkMode ? '#C193B3' : '#B56DA3',
        transform: 'translateY(-1px)',
      },
      ':active': {
        transform: 'translateY(0)',
      },
    },
    dashboardSection: {
      backgroundColor: colors.surface,
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      border: `1px solid ${colors.border}`,
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    sectionTitle: {
      color: colors.primary,
      margin: 0,
      fontSize: '20px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    taskList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    taskItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      borderBottom: `1px solid ${colors.border}`,
      transition: 'all 0.2s',
      ':hover': {
        backgroundColor: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      },
      ':last-child': {
        borderBottom: 'none',
      },
    },
    taskContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      flex: 1,
    },
    taskCheckbox: {
      width: '20px',
      height: '20px',
      accentColor: colors.primary,
      cursor: 'pointer',
    },
    taskText: {
      fontWeight: '500',
      fontSize: '16px',
      flex: 1,
      textDecoration: (props) => props.completed ? 'line-through' : 'none',
      opacity: (props) => props.completed ? 0.7 : 1,
      color: (props) => props.completed ? colors.secondaryText : colors.text,
    },
    taskDate: {
      color: colors.secondaryText,
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      minWidth: '140px',
    },
    taskActions: {
      display: 'flex',
      gap: '8px',
    },
    actionButton: {
      padding: '8px 12px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s',
    },
    editButton: {
      backgroundColor: darkMode ? 'rgba(212, 165, 195, 0.1)' : 'rgba(199, 126, 181, 0.1)',
      color: colors.primary,
      ':hover': {
        backgroundColor: darkMode ? 'rgba(212, 165, 195, 0.2)' : 'rgba(199, 126, 181, 0.2)',
      },
    },
    deleteButton: {
      backgroundColor: darkMode ? 'rgba(255, 106, 136, 0.1)' : 'rgba(255, 107, 136, 0.1)',
      color: colors.accent,
      ':hover': {
        backgroundColor: darkMode ? 'rgba(255, 106, 136, 0.2)' : 'rgba(255, 107, 136, 0.2)',
      },
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px 20px',
      color: colors.secondaryText,
    },
    statsContainer: {
      display: 'flex',
      gap: '16px',
      marginBottom: '24px',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
      },
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.surface,
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      border: `1px solid ${colors.border}`,
    },
    statValue: {
      fontSize: '28px',
      fontWeight: '600',
      margin: '8px 0',
      color: colors.primary,
    },
    statLabel: {
      color: colors.secondaryText,
      fontSize: '14px',
    },
    sidebarItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      color: colors.text,
      textDecoration: 'none',
      ':hover': {
        backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
      },
    },
    activeSidebarItem: {
      backgroundColor: `${colors.primary}20`,
      color: colors.primary,
      fontWeight: '500',
    },
  };

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div style={styles.app}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={{ color: colors.primary, marginBottom: '32px' }}>Task Dashboard</h2>
        
        <div style={{ ...styles.sidebarItem, ...styles.activeSidebarItem }}>
          <FontAwesomeIcon icon={faTasks} />
          <span>My Tasks</span>
        </div>
        <div style={styles.sidebarItem}>
          <FontAwesomeIcon icon={faCalendarAlt} />
          <span>Calendar</span>
        </div>
        
        <div style={{ marginTop: '32px' }}>
          <button style={styles.modeToggle} onClick={toggleMode}>
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            <FontAwesomeIcon icon={faTasks} />
            My Task Dashboard
          </h1>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{tasks.length}</div>
            <div style={styles.statLabel}>Total Tasks</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{completedCount}</div>
            <div style={styles.statLabel}>Completed</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{tasks.length - completedCount}</div>
            <div style={styles.statLabel}>Pending</div>
          </div>
        </div>

        {/* Task Form */}
        <div style={styles.formContainer}>
          <h3 style={styles.formTitle}>Add New Task</h3>
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="What's your task for today?"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                style={styles.input}
              />
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                style={styles.dateInput}
              />
            </div>
            <button
              type="submit"
              disabled={!task.trim()}
              style={{
                ...styles.submitButton,
                opacity: !task.trim() ? 0.7 : 1,
                cursor: !task.trim() ? 'not-allowed' : 'pointer',
                ':hover': !task.trim() ? {} : styles.submitButton[':hover'],
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
              {editIndex !== null ? 'Update Task' : 'Add Task'}
            </button>
          </form>
        </div>

        {/* Task List */}
        <div style={styles.dashboardSection}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>
              <FontAwesomeIcon icon={faTasks} />
              My Tasks
            </h3>
          </div>
          
          {tasks.length === 0 ? (
            <div style={styles.emptyState}>
              <p>No tasks yet. Add your first task above!</p>
            </div>
          ) : (
            <ul style={styles.taskList}>
              {tasks.map((item, index) => (
                <li key={index} style={styles.taskItem}>
                  <div style={styles.taskContent}>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleComplete(index)}
                      style={styles.taskCheckbox}
                    />
                    <span style={{ ...styles.taskText, completed: item.completed }}>
                      {item.text}
                    </span>
                    <span style={styles.taskDate}>
                      <FontAwesomeIcon icon={faCalendarAlt} size="xs" />
                      {item.date.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div style={styles.taskActions}>
                    <button
                      onClick={() => handleEdit(index)}
                      style={{ ...styles.actionButton, ...styles.editButton }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      style={{ ...styles.actionButton, ...styles.deleteButton }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeminineTaskDashboard;