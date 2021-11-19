import React, { useEffect } from 'react';
import { Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import { Container } from './styles';

export default function Home() {
  const getToken = async () => {
    const token = await messaging().getToken();
    console.log({ token });
  };

  useEffect(() => {
    getToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', {
        message: JSON.stringify(remoteMessage),
      });
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('A new BACKGROUND FCM message arrived!', {
        message: JSON.stringify(remoteMessage),
      });
    });

    return unsubscribe;
  }, []);

  return (
    <Container>
      <Text>Hey there</Text>
    </Container>
  );
}
