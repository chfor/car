import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { Card, Title, Paragraph, Button, Portal, Dialog } from 'react-native-paper';
import { updateVehicleInfo } from '../services/api';

const VehicleDetailScreen = ({ route, navigation }) => {
    const { vehicle } = route.params;
    const [loading, setLoading] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const handleUpdate = async () => {
        try {
            setLoading(true);
            await updateVehicleInfo(vehicle.id, vehicle);
            Alert.alert('成功', '车辆信息已更新');
            navigation.goBack();
        } catch (error) {
            Alert.alert('错误', error.response?.data?.error || '更新失败');
        } finally {
            setLoading(false);
            setShowConfirmDialog(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Title>基本信息</Title>
                    <Paragraph>车牌号：{vehicle.licensePlate}</Paragraph>
                    <Paragraph>上线月份：{vehicle.firstRegistrationDate}</Paragraph>
                    <Paragraph>行驶里程：{vehicle.mileage} 公里</Paragraph>
                    <Paragraph>交强险：{vehicle.compulsoryInsurance}</Paragraph>
                    <Paragraph>商业险：{vehicle.commercialInsurance}</Paragraph>
                    <Paragraph>车辆性质：{vehicle.vehicleType}</Paragraph>
                    <Paragraph>售价：{vehicle.price} 元</Paragraph>
                    <Paragraph>销售状态：{vehicle.soldStatus}</Paragraph>
                    <Paragraph>车况：{vehicle.condition}</Paragraph>
                </Card.Content>
            </Card>

            <Button
                mode="contained"
                onPress={() => setShowConfirmDialog(true)}
                loading={loading}
                style={styles.button}
            >
                更新信息
            </Button>

            <Portal>
                <Dialog visible={showConfirmDialog} onDismiss={() => setShowConfirmDialog(false)}>
                    <Dialog.Title>确认更新</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>确定要更新车辆信息吗？</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setShowConfirmDialog(false)}>取消</Button>
                        <Button onPress={handleUpdate}>确定</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    card: {
        margin: 16,
        elevation: 4,
    },
    button: {
        margin: 16,
    },
});

export default VehicleDetailScreen;
