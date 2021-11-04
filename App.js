/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { DataTable } from "react-native-paper"

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const App = () => {

  const [dataState, setDataState] = useState([])
  const [sortData, setSortData] = useState(true)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    getData()
    console.log("Cargando datos")
  }, [])

  const getData = () => {
    // setLoading(true)
    return fetch('http://eb5a-2803-d100-e310-696-18df-cbea-113-5e21.ngrok.io/api/Medicine', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setDataState([...responseJson])
      })
      .finally(() => {
        setLoading(false)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // const deleteData = (propdata) => {
  //   // setLoading(true)
  //   return fetch(`http://32ae-2803-d100-e310-696-d1d5-5320-dd69-c908.ngrok.io/multihospital/medicine/delete?id=${propdata}`, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     }
  //   })
  //     // .then((response) => response.json())
  //     // .then((responseJson) => {
  //     //   console.log(responseJson);
  //     //   setDataState([...responseJson])
  //     // })
  //     .finally(() => {
  //       getData()
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData()
    wait(300).then(() => setRefreshing(false));
  }, []);

  return loading ? (
    <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItem: "center", backgroundColor: "white" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View style={styles.containerStyle}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.6}
          onPress={() => { setDataState([]) }}
        >
          <Text style={{ color: "white", fontWeight: "700", letterSpacing: 0.4 }}>Limpiar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.6}
          onPress={() => {
            setSortData(!sortData)
            dataState.reverse()
          }}
        >
          <Text style={{ color: "white", fontWeight: "700", letterSpacing: 0.4 }}>{sortData ? "Ascendente" : "Descendente"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}>
        <ScrollView horizontal>
          <DataTable style={styles.dataTableStyle}>
            <DataTable.Header>
              
              <DataTable.Title>Nombre</DataTable.Title>
              <DataTable.Title>Categoria</DataTable.Title>
              
              

              <DataTable.Title>Nombre generico</DataTable.Title>
              <DataTable.Title>Marca</DataTable.Title>
              
              <DataTable.Title>Fecha de expiracion</DataTable.Title>
              
              
              {/* <DataTable.Title>Acciones</DataTable.Title> */}
            </DataTable.Header>

            {dataState.map((data, i) =>
              <DataTable.Row key={i} onPress={() => {
                Alert.alert(
                  "Datos Medicamento",
                  
                  "Nombre: " + data.name + "\n" +
                  "Categoria: " + data.category + "\n" +
                  
                  "Venta: " + data.s_price + "\n" +

                  "Nombre generico: " + data.generic + "\n" +
                  "Marca: " + data.company + "\n" +
                  "Efectos: " + data.effects + "\n" +
                  
                  "Fecha de expiracion: " + data.e_date,
                  [
                    { text: "Okay", onPress: () => console.log("OK Pressed") }
                  ]
                );
              }}>
                
                <DataTable.Cell>{data.name}</DataTable.Cell>
                <DataTable.Cell>{data.category}</DataTable.Cell>

                

                <DataTable.Cell>{data.generic}</DataTable.Cell>
                <DataTable.Cell>{data.company}</DataTable.Cell>
                
                <DataTable.Cell>{data.e_date}</DataTable.Cell>

                {/* <DataTable.Title>
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      activeOpacity={0.6}
                      onPress={() => { 
                        deleteData(data.id)
                       }}
                    >
                      <Text style={{ color: "white", fontWeight: "700", letterSpacing: 0.4 }}>Eliminar</Text>
                    </TouchableOpacity>
                  </DataTable.Title> */}
              </DataTable.Row>
            )}

          </DataTable>
        </ScrollView>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    padding: 25,
    width: "100%",
    flex: 1,
    backgroundColor: "white"
  },
  dataTableStyle: {
    width: 800,
    paddingBottom: 100
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  buttonStyle: {
    width: "45%",
    height: 50,
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9B59B6",
  }
});

export default App;