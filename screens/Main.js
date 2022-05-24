import React from "react"
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'
import * as FaceDetector from 'expo-face-detector'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import styles from "../styles";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            faces: [],
            hasCameraPerms: null,
        }
    }

    async componentDidMount() {

        Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermissions)
    }
    onCameraPermissions = (status) => {
        this.setState({ hasCameraPerms: status.status === 'granted' })
    }
    onFaceDetected = (faces) => {
        this.setState({ faces: faces })
    }
    onFaceDetectionError = (error) => {
        console.log(error)
    }

    render() {

        const { hasCameraPerms } = this.state;
        if (hasCameraPerms === null) { return (<View></View>) }

        if (hasCameraPerms === false) {
            return (
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                </View>
            )
        }
        console.log(this.state.faces)
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.androidSafeArea} />
                <View style={styles.upperContainer}>
                    <Text style={styles.appName}>Look Me....</Text>
                </View>
                <View style={styles.middleContainer}>
                    <Camera
                        style={{ flex: 1 }}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.FaceDetectorMode.fast,
                            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                            runClassifications: FaceDetector.FaceDetectorClassifications.all
                        }}
                        onFacesDetected={this.onFaceDetected}
                        onFaceDetectionError={this.onFaceDetectionError}
                    />
                </View>
            </View>

        )
    }
}