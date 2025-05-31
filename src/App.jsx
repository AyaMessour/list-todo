import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSun, faMoon, faCalendarAlt, faPlus, faTasks, faChartPie, faBell, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Task type options
const TASK_TYPES = [
  { id: 'work', name: 'Work', color: '#FF6B6B' },
  { id: 'personal', name: 'Personal', color: '#4ECDC4' },
  { id: 'goin out ', name: 'goin out ', color: 'red' },
  { id: 'Studying', name: 'Studying', color: 'green' },
  { id: 'Gym', name: 'Gym', color: 'yellow' },
  { id: 'health', name: 'Health', color: '#45B7D1' },
  { id: 'shopping', name: 'Shopping', color: '#FFA5A5' },
  { id: 'other', name: 'Other', color: '#A67DB8' },
];

function FeminineTaskDashboard() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedType, setSelectedType] = useState('personal');
  const [activeTab, setActiveTab] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Task "Complete project" is due today', type: 'warning', read: false },
    { id: 2, message: 'You completed 5 tasks yesterday', type: 'success', read: false },
    { id: 3, message: 'New feature available: Task categories', type: 'info', read: true },
  ]);

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
          completed: tasks[editIndex].completed,
          type: selectedType
        };
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, { 
          text: task, 
          date: selectedDate, 
          completed: false,
          type: selectedType
        }]);
      }
      setTask('');
      setSelectedType('personal');
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEdit = (index) => {
    setTask(tasks[index].text);
    setSelectedDate(tasks[index].date);
    setSelectedType(tasks[index].type);
    setEditIndex(index);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const toggleMode = () => setDarkMode(!darkMode);
  const toggleNotifications = () => setShowNotifications(!showNotifications);
  
  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, read: true} : n
    ));
  };

  // Filter tasks based on active tab
  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'all') return true;
    if (activeTab === 'completed') return task.completed;
    if (activeTab === 'pending') return !task.completed;
    return true;
  });

  // Data for charts
  const completionData = [
    { name: 'Completed', value: tasks.filter(t => t.completed).length },
    { name: 'Pending', value: tasks.filter(t => !t.completed).length }
  ];

  const typeData = TASK_TYPES.map(type => ({
    name: type.name,
    value: tasks.filter(t => t.type === type.id).length,
    color: type.color
  }));

  // Enhanced color palette
  const colors = {
    primary: darkMode ? '#C8A2C8' : '#A67DB8', // Lilac
    secondary: darkMode ? '#4ECDC4' : '#45B7D1', // Teal
    background: darkMode ? '#1A1A2E' : '#F5F0FF', // Very light purple/Deep navy
    surface: darkMode ? '#16213E' : '#FFFFFF',
    text: darkMode ? '#E6E6E6' : '#4A4A4A',
    secondaryText: darkMode ? '#B8B8B8' : '#7A7A7A',
    border: darkMode ? '#2D2D42' : '#E8E0F0',
    accent: darkMode ? '#FFA5A5' : '#FF6B6B', // Coral pink
    chartBackground: darkMode ? '#16213E' : '#FFFFFF',
    success: '#6BCB77',
    warning: '#FFD166',
    danger: '#FF6B6B',
    info: '#45B7D1',
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
      position: 'relative',
      zIndex: 1,
    },
    mainContent: {
      flex: 1,
      padding: '32px 40px',
      display: 'flex',
      flexDirection: 'column',
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
    notificationButton: {
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
      position: 'relative',
      transition: 'all 0.2s',
      ':hover': {
        backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      },
    },
    notificationBadge: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      backgroundColor: colors.accent,
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
    },
    notificationPanel: {
      position: 'absolute',
      top: '60px',
      right: '40px',
      width: '350px',
      backgroundColor: colors.surface,
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      border: `1px solid ${colors.border}`,
      padding: '16px',
      zIndex: 10,
      maxHeight: '500px',
      overflowY: 'auto',
      display: showNotifications ? 'block' : 'none',
    },
    notificationItem: {
      padding: '12px',
      marginBottom: '8px',
      borderRadius: '8px',
      backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
      borderLeft: `4px solid ${colors.primary}`,
      cursor: 'pointer',
      transition: 'all 0.2s',
      opacity: (props) => props.read ? 0.7 : 1,
      ':hover': {
        backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      },
    },
    notificationIcon: {
      marginRight: '10px',
      color: (props) => 
        props.type === 'success' ? colors.success :
        props.type === 'warning' ? colors.warning :
        props.type === 'danger' ? colors.danger : colors.info
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
    typeSelect: {
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
        backgroundColor: darkMode ? '#D4B3E0' : '#B58DC5',
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
      marginBottom: '32px',
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
    taskType: {
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500',
      minWidth: '80px',
      textAlign: 'center',
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
      backgroundColor: darkMode ? 'rgba(166, 125, 184, 0.1)' : 'rgba(166, 125, 184, 0.1)',
      color: colors.primary,
      ':hover': {
        backgroundColor: darkMode ? 'rgba(166, 125, 184, 0.2)' : 'rgba(166, 125, 184, 0.2)',
      },
    },
    deleteButton: {
      backgroundColor: darkMode ? 'rgba(255, 107, 107, 0.1)' : 'rgba(255, 107, 107, 0.1)',
      color: colors.accent,
      ':hover': {
        backgroundColor: darkMode ? 'rgba(255, 107, 107, 0.2)' : 'rgba(255, 107, 107, 0.2)',
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
    chartContainer: {
      backgroundColor: colors.chartBackground,
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '24px',
      border: `1px solid ${colors.border}`,
    },
    chartTitle: {
      color: colors.primary,
      marginBottom: '16px',
      fontSize: '16px',
      fontWeight: '600',
    },
    tabs: {
      display: 'flex',
      gap: '8px',
      marginBottom: '20px',
    },
    tab: {
      padding: '8px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      border: 'none',
      backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      color: colors.text,
      ':hover': {
        backgroundColor: darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
      },
    },
    activeTab: {
      backgroundColor: colors.primary,
      color: 'white',
    },
    contentRow: {
      display: 'flex',
      gap: '32px',
      '@media (max-width: 1200px)': {
        flexDirection: 'column',
      },
    },
    mainColumn: {
      flex: 2,
    },
    sideColumn: {
      flex: 1,
    },
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div style={styles.app}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={{ color: colors.primary, marginBottom: '32px' }}>Task Dashboard</h2>
        
        <div 
          style={{ 
            ...styles.sidebarItem, 
            ...(activeTab === 'all' ? styles.activeSidebarItem : {}) 
          }}
          onClick={() => setActiveTab('all')}
        >
          <FontAwesomeIcon icon={faTasks} />
          <span>All Tasks</span>
        </div>
        <div 
          style={{ 
            ...styles.sidebarItem, 
            ...(activeTab === 'completed' ? styles.activeSidebarItem : {}) 
          }}
          onClick={() => setActiveTab('completed')}
        >
          <FontAwesomeIcon icon={faTasks} />
          <span>Completed</span>
        </div>
        <div 
          style={{ 
            ...styles.sidebarItem, 
            ...(activeTab === 'pending' ? styles.activeSidebarItem : {}) 
          }}
          onClick={() => setActiveTab('pending')}
        >
          <FontAwesomeIcon icon={faTasks} />
          <span>Pending</span>
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
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button style={styles.modeToggle} onClick={toggleMode}>
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </button>
            <button style={styles.notificationButton} onClick={toggleNotifications}>
              <FontAwesomeIcon icon={faBell} />
              {unreadNotifications > 0 && (
                <span style={styles.notificationBadge}>{unreadNotifications}</span>
              )}
            </button>
          </div>
        </div>

        {/* Notification Panel */}
        <div style={styles.notificationPanel}>
          <h3 style={{ marginTop: 0, color: colors.primary }}>Notifications</h3>
          {notifications.length === 0 ? (
            <p style={{ color: colors.secondaryText, textAlign: 'center' }}>No notifications</p>
          ) : (
            notifications.map(notification => (
              <div 
                key={notification.id} 
                style={{ ...styles.notificationItem, opacity: notification.read ? 0.7 : 1 }}
                onClick={() => markNotificationAsRead(notification.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FontAwesomeIcon 
                    icon={notification.type === 'success' ? faCheckCircle : 
                          notification.type === 'warning' ? faExclamationCircle : faBell} 
                    style={{ ...styles.notificationIcon, type: notification.type }} 
                  />
                  <span>{notification.message}</span>
                </div>
              </div>
            ))
          )}
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
            <div style={styles.statValue}>{pendingCount}</div>
            <div style={styles.statLabel}>Pending</div>
          </div>
        </div>

        {/* Main Content Row */}
        <div style={styles.contentRow}>
          {/* Main Column */}
          <div style={styles.mainColumn}>
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
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    style={styles.typeSelect}
                  >
                    {TASK_TYPES.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
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
                <div style={styles.tabs}>
                  <button 
                    style={{ 
                      ...styles.tab, 
                      ...(activeTab === 'all' ? styles.activeTab : {}) 
                    }}
                    onClick={() => setActiveTab('all')}
                  >
                    All
                  </button>
                  <button 
                    style={{ 
                      ...styles.tab, 
                      ...(activeTab === 'completed' ? styles.activeTab : {}) 
                    }}
                    onClick={() => setActiveTab('completed')}
                  >
                    Completed
                  </button>
                  <button 
                    style={{ 
                      ...styles.tab, 
                      ...(activeTab === 'pending' ? styles.activeTab : {}) 
                    }}
                    onClick={() => setActiveTab('pending')}
                  >
                    Pending
                  </button>
                </div>
              </div>
              
              {filteredTasks.length === 0 ? (
                <div style={styles.emptyState}>
                  <p>No tasks found. {activeTab === 'all' ? 'Add your first task above!' : 'Try changing your filters.'}</p>
                </div>
              ) : (
                <ul style={styles.taskList}>
                  {filteredTasks.map((item, index) => {
                    const taskType = TASK_TYPES.find(type => type.id === item.type) || TASK_TYPES[TASK_TYPES.length - 1];
                    return (
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
                          <span style={{ 
                            ...styles.taskType, 
                            backgroundColor: `${taskType.color}20`,
                            color: taskType.color
                          }}>
                            {taskType.name}
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
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Side Column */}
          <div style={styles.sideColumn}>
            {/* Charts Section */}
            <div style={styles.dashboardSection}>
              <h3 style={styles.sectionTitle}>
                <FontAwesomeIcon icon={faChartPie} />
                Task Analytics
              </h3>
              
              <div style={styles.chartContainer}>
                <h4 style={styles.chartTitle}>Task Completion</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={completionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill={colors.primary} />
                      <Cell fill={colors.secondary} />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div style={styles.chartContainer}>
                <h4 style={styles.chartTitle}>Tasks by Type</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={typeData.filter(d => d.value > 0)}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                    <XAxis dataKey="name" stroke={colors.text} />
                    <YAxis stroke={colors.text} />
                    <Tooltip />
                    <Bar dataKey="value" name="Tasks">
                      {typeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeminineTaskDashboard;