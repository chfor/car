import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    ScrollView,
} from 'react-native';
import { TextInput, Button, Text, Card, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getVehicleInfo } from '../services/api';

const HomeScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const userStr = await AsyncStorage.getItem('user');
        if (userStr) {
            setUser(JSON.parse(userStr));
        }
    };

    const handleSearch = async () => {
        if (!searchValue) {
            Alert.alert('提示', '请输入车牌号');
            return;
        }

        try {
            setLoading(true);
            const response = await getVehicleInfo(searchValue);
            navigation.navigate('VehicleDetail', { vehicle: response.data });
        } catch (error) {
            Alert.alert('错误', error.response?.data?.error || '查询失败');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            navigation.replace('Login');
        } catch (error) {
            Alert.alert('错误', '退出登录失败');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.header}>
                        <Text style={styles.welcome}>欢迎, {user?.username}</Text>
                        <IconButton
                            icon="logout"
                            onPress={handleLogout}
                            size={24}
                        />
                    </View>
                    <Text style={styles.role}>角色: {user?.role}</Text>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Content>
                    <TextInput
                        label="输入车牌号查询"
                        value={searchValue}
                        onChangeText={setSearchValue}
                        mode="outlined"
                        style={styles.input}
                    />
                    <View style={styles.buttonGroup}>
                        <Button
                            mode="contained"
                            onPress={handleSearch}
                            loading={loading}
                            style={styles.button}
                        >
                            查询
                        </Button>
                        <Button
                            mode="contained"
                            onPress={() => navigation.navigate('Scan')}
                            style={styles.button}
                        >
                            扫描
                        </Button>
                    </View>
                </Card.Content>
            </Card>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    role: {
        fontSize: 16,
        color: '#666',
        marginTop: 8,
    },
    input: {
        marginBottom: 16,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        marginHorizontal: 8,
    },
});

export default HomeScreen;
