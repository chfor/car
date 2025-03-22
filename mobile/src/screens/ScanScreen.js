import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    Dimensions,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Text, IconButton } from 'react-native-paper';
import { getVehicleInfo } from '../services/api';

const ScanScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanning, setScanning] = useState(false);

    useEffect(() => {
        checkCameraPermission();
    }, []);

    const checkCameraPermission = async () => {
        const { status } = await RNCamera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    const handleBarCodeScanned = async ({ data }) => {
        if (scanning) return;

        setScanning(true);
        try {
            const response = await getVehicleInfo(data);
            navigation.replace('VehicleDetail', { vehicle: response.data });
        } catch (error) {
            Alert.alert('错误', error.response?.data?.error || '查询失败');
            setScanning(false);
        }
    };

    if (hasPermission === null) {
        return <View style={styles.container}><Text>请求相机权限...</Text></View>;
    }

    if (hasPermission === false) {
        return <View style={styles.container}><Text>没有相机权限</Text></View>;
    }

    return (
        <View style={styles.container}>
            <RNCamera
                style={styles.camera}
                type={RNCamera.Constants.Type.back}
                onBarCodeScanned={handleBarCodeScanned}
                barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
            >
                <View style={styles.overlay}>
                    <View style={styles.scanArea} />
                </View>
                <IconButton
                    icon="arrow-left"
                    size={30}
                    color="#fff"
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.instruction}>
                    将车牌号或VIN码对准扫描框
                </Text>
            </RNCamera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanArea: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: 'transparent',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 10,
    },
    instruction: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
    },
});

export default ScanScreen;
