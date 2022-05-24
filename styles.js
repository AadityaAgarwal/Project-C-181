import { StyleSheet,Platform,StatusBar } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E7F2F8"
      },
      androidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      },
      upperContainer: {
        flex: 0.13,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E7F2F8",
        flexDirection: "row"
      },
      appName: {
        fontSize: 25
      },
     
})