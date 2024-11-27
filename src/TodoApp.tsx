import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import todoData from './Todo';
const screenwidth = Dimensions.get('window').width;

const TodoApp = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [tasks, setTasks] = useState(todoData.map(task => ({ ...task, isCompleted: false })));
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTaskCompletion = (id) => {
    setTasks(prevTasks => {
      const taskIndex = prevTasks.findIndex(task => task.id === id);
      const newTasks = [...prevTasks];
      newTasks[taskIndex].isCompleted = !newTasks[taskIndex].isCompleted;
      return newTasks;
    });
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const addTask = () => {
    if (newTask && newDate && newTime) {
      const newId = (tasks.length + 1).toString();
      const newTaskData = {
        id: newId,
        task: newTask,
        date: newDate,
        time: newTime,
        isCompleted: false,
      };
      setTasks([...tasks, newTaskData]);
      setNewTask('');
      setNewDate('');
      setNewTime('');
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safearea}>
      <Text style={styles.textStyle}>Todo List</Text>
      <View style={styles.container}>
        <View style={styles.searchProp}>
          <Image
            source={{ uri: 'https://t4.ftcdn.net/jpg/05/58/27/27/360_F_558272798_DNqj4q2TXE7EsDM9Zp2wdyap8gzatwlF.jpg' }}
            style={styles.imageProp}
          />
          <TextInput
            style={styles.textProp}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <FlatList
          data={filteredTasks}
          renderItem={({ item }) => (
            <View style={styles.boxprop}>
              <View style={styles.prop}>
                <View style={styles.taskInfo}>
                  <Text style={styles.textStyle2}>{item.task}</Text>
                  <View style={styles.dateTime}>
                    <Text>{item.date}  </Text>
                    <Text>{item.time}</Text>
                  </View>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
                    <View style={styles.taskprop}>
                      <Text style={[item.isCompleted ? styles.completedText : styles.pendingText]}>
                        {item.isCompleted ? 'Completed' : 'Pending'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteTask(item.id)}>
                    <View style={styles.deleteButton}>
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
        <View style={styles.newTaskContainer}>
          <TextInput
            style={styles.newTaskInput}
            placeholder="New Task"
            value={newTask}
            onChangeText={setNewTask}
          />
          <TextInput
            style={styles.newTaskInput}
            placeholder="Date"
            value={newDate}
            onChangeText={setNewDate}
          />
          <TextInput
            style={styles.newTaskInput}
            placeholder="Time"
            value={newTime}
            onChangeText={setNewTime}
          />
          <TouchableOpacity onPress={addTask}>
            <Image
              source={{ uri: 'https://img.icons8.com/?size=100&id=1501&format=png&color=000000' }}
              style={styles.imageProp2}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  safearea: {
    flex: 1,
  },
  textStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#576574',
    margin: 20,
  },
  textStyle2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#576574',
    margin: 10,
  },
  prop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenwidth,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchProp: {
    height: 60,
    width: screenwidth,
    borderRadius: 30,
    backgroundColor: '#c8d6e5',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  textProp: {
    flex: 1,
    marginLeft: 10,
  },
  imageProp: {
    height: 20,
    width: 20,
  },
  boxprop: {
    width: screenwidth,
  },
  dateTime: {
    flexDirection: 'row',
    marginTop: -10,
    marginLeft: 10,
  },
  taskInfo: {
    flex: 1,
  },
  pendingText: {
    color: 'red',
  },
  completedText: {
    color: 'green',
  },
  taskprop: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#54a0ff',
  },
  newTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenwidth,
    marginVertical: 20,
  },
  newTaskInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    margin: 5,
    paddingHorizontal: 10,
  },
  imageProp2: {
    height: 50,
    width: 50,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TodoApp;
