import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ImageBackground, View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [theme, setColorScheme] = React.useState('light');
  const router = useRouter();

  useEffect(() => {
    const getTheme = async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (theme === 'dark') {
        setColorScheme('dark');
      } else {
        setColorScheme('light');
      }
    }
    getTheme();
  }, []);

  const onChangeEmail = (text: string) => {
    setEmail(text);
  };

  const onChangePassword = (text: string) => {
    setPassword(text);
  };

  const onLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValid = emailRegex.test(email);    

    if (!emailValid) {3
      alert('Email inválido');
      return;
    }

    router.push('/(tabs)');

    
  }

  return (
    <ImageBackground className='m-2' source={require('~/assets/images/logo.png')}>
      <View className="min-h-screen flex items-center justify-center py-12 px-10 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold mb-3 text-center">Entrar</CardTitle>
            <CardDescription className="text-center text-md">
              Insira suas credencias do Ingresso Fácil para continuar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 gap-5">
            <Input
              className={theme === 'dark' ? 'color-white' : ''}
              placeholder='email@ingresso.com'
              value={email}
              keyboardType='email-address'
              onChangeText={onChangeEmail}
              aria-labelledby='emailLabel'
              autoCapitalize='none'
              autoComplete='email'
            />
            
            <Input
              className={theme === 'dark' ? 'color-white' : ''}
              placeholder='Password'
              value={password}
              onChangeText={onChangePassword}
              secureTextEntry
              aria-labelledby='passwordLabel'
              autoCapitalize='none'
              autoComplete='password'
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mx-2 gap-4">
            <Button className='w-full' variant="default" onPress={onLogin} ><Text>Acessar</Text></Button>
            <Link href='/register' className='text-center text-sm'>Não tem uma conta? Registre-se</Link>
          </CardFooter>
        </Card>
      </View>
    </ImageBackground>
  )
}