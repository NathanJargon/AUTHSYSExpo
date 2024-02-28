import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window');

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const clientId = Constants.manifest2.extra.googleClientId;

  const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId,
      scopes: ['openid', 'profile', 'email'],
      redirectUri: AuthSession.makeRedirectUri({
        useProxy: true,
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      firebase.auth().signInWithCredential(credential);
      setIsLoggedIn(true);
    }
  }, [response]);

  const login = () => {
    promptAsync();
  };

  const logout = async () => {
    await firebase.auth().signOut();
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>AUTHSYSExpo</Text>
      <Text style={styles.smallText}>Nathan Jargon</Text>
      {isLoggedIn ? (
        <>
          <Text>You are logged in.</Text>
          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text>Logout</Text>
          </TouchableOpacity>
      </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
    paddingLeft: 70,
    paddingRight: 70,
    borderRadius: 10,
  },
  smallText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Dashboard;