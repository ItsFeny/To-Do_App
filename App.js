import React from 'react';


//Estilos importaciones
import 
{
   StyleSheet,
   SafeAreaView,
   View,
   Text,
   TextInput,
   TouchableOpacity,
   FlatList,
   Alert  
} 
from 'react-native';


//Importacion de los iconos
import Icon from 'react-native-vector-icons/MaterialIcons';


//Importacion del AsynStorage almacenamiento local
import AsyncStorage from '@react-native-async-storage/async-storage';




//Cuerpo de la pagina
const App = () =>  {

  {/*Objeto donde se renderizan las tareas*/}
  const [tasks, setTask] = React.useState([]);


  {/*Obtener el valor del input*/}
  const [textInput, setTextInput] = React.useState('');


  {/*Configuracion del AsynStorage*/}
  React.useEffect(() => {
    getTaskFromUserDevice();
  }, []);

  React.useEffect(() => {
    saveTaskToUserDevice(tasks);
  }, [tasks]);


  {/*Guardar los datos mediante el arreglo y su objeto Tasks*/}
  const saveTaskToUserDevice = async tasks => {
    try {
      const stringifytasks = JSON.stringify(tasks);
      await AsyncStorage.setItem('tasks', stringifytasks);
    } catch (error) {
      console.log(error);
    }
  };


  {/*Obtener los datos del arreglo*/}
  const getTaskFromUserDevice = async () => {
    try {
      const tasks = await AsyncStorage.getItem('tasks');
      if (tasks != null) {
        setTask(JSON.parse(tasks));
      }
    } catch (error) {
      console.log(error);
    }
  };


  {/*Funcionalidad del proyecto*/}



  {/*Obtiene los datos y lo renderiza mediante el arreglo*/}
  const ListItem = ({task}) => {
    return <View style={styles.listTask}> 
             <View style={{flex:1}}>
             <Text style={{color:'white', textDecorationLine: task?.completed ? 'line-through': 'none'}}>
               {task?.task}
            </Text>
            </View>
            {
              !task?.completed && (
              <TouchableOpacity style={styles.actionButton} onPress={() => markTaskComplete(task.id)}>
                <Icon name="done" style={{color:'white'}} size={20} />
             </TouchableOpacity>
              )
            }
           
            <TouchableOpacity style={styles.actionButton} onPress={() => deleteTask(task.id)}>
                <Icon name="delete" style={{color:'white'}} size={20} />
            </TouchableOpacity>
       </View>
  };




  {/*Agregar una nueva tarea*/}
  const AddTask = () => {
     
     if(textInput == '')
     {
       Alert.alert("Debes Ingresar Una Tarea");
     }
     else
     {
      const newTask =
      {
        id: Math.random(),
        task: textInput,
        completed: false
      };
        setTask([...tasks,newTask]);
        setTextInput('');
     }   
};


 
{/*Marcar como completado*/}
const markTaskComplete = taskId => {
  const newTaskItem = tasks.map(item => {
    if (item.id == taskId) {
      return {...item, completed: true};
    }
    return item;
  });

  setTask(newTaskItem);
};



{/*Eliminar tarea*/}
const deleteTask = taskId => {
  const newTaskItem = tasks.filter(item => item.id != taskId);
  setTask(newTaskItem);
};



  {/*UI*/}
  return <SafeAreaView style={styles.container}>
    

     <View style={styles.header}>
         <Text style={styles.title}>TO-DO</Text> 
     </View>

   
     <FlatList 
     data={tasks} 
     renderItem={({item}) => <ListItem task={item}/> }
     showsVerticalScrollIndicator={false}
     contentContainerStyle={{padding: 20, paddingBottom: 100}} 
     />


      <View style={styles.footer}>
         <View style={styles.footer_input}>
              <TextInput placeholder="Add New Task" 
                         onChangeText={(text) => setTextInput(text)}
                         value={textInput}/>
            </View>
         <TouchableOpacity onPress={AddTask}> 
            <View style={styles.addTask}>
              <Icon name="add" size={30} style={styles.iconButtonTask} />
            </View>
         </TouchableOpacity>
      </View>
      
</SafeAreaView>;

};







//Configuracion de los estilos
const styles = StyleSheet.create({
     
     container: 
     {
       flex:1,
       backgroundColor: 'white',
     },
     header: 
     {
       padding:20,
       flexDirection:'row',
       alignItems: 'center',
       justifyContent:'center'
     },
     title: 
     {
       fontSize:30,
       marginTop:20,
       
     },
     footer: 
     {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
       
     },
     footer_input: 
     {
      height: 50,
      paddingHorizontal: 20,
      elevation: 40,
      flex: 1,
      marginVertical: 20,
      marginRight: 20,
      borderRadius: 30,
      borderWidth:1,
      borderColor:'blue',
      justifyContent:'center',
      backgroundColor: 'white',
     },
     addTask:
     {
      height: 50,
      width: 50,
      backgroundColor: 'blue',
      elevation: 40,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
     },
     iconButtonTask:
     {
      color:'white',
     },
     listTask:
     {
      padding: 20,
      backgroundColor: 'lightslategrey',
      flexDirection: 'row',
      elevation: 12,
      borderRadius: 7,
      marginVertical: 10,
     },
     actionButton:
     {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 20,
     },
     
});





export default App;
