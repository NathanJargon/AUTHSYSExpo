import React, { useState, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import * as AuthSession from 'expo-auth-session';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const login = async () => {
    const result = await AuthSession.startAsync({
      authUrl: 'https://your-authentication-api.com/login',
    });

    if (result.type === 'success') {
      setToken(result.params.token);
      setIsLoggedIn(true);
    }
  };

  const logout = async () => {
    const result = await AuthSession.startAsync({
      authUrl: 'https://your-authentication-api.com/logout', 
    });

    if (result.type === 'success') {
      setToken(null);
      setIsLoggedIn(false);
    }
  };

  return (
    <View>
      {isLoggedIn ? (
        <>
          <Text>You are logged in.</Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <Button title="Login" onPress={login} />
      )}
    </View>
  );
};

export default Dashboard;