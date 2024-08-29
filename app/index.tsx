import { useAuth, useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { View, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const {isSignedIn} = useAuth()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [theme, setColorScheme] = React.useState('light');

  useEffect(() => {
    if (isSignedIn) {
      router.navigate('/(tabs)/home')
    }
  }, [isSignedIn])

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

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(tabs)')
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      alert(err.errors[0].longMessage);
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, emailAddress, password])

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
              value={emailAddress}
              keyboardType='email-address'
              onChangeText={setEmailAddress}
              aria-labelledby='emailLabel'
              autoCapitalize='none'
              autoComplete='email'
            />
            
            <Input
              className={theme === 'dark' ? 'color-white' : ''}
              placeholder='Password'
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              aria-labelledby='passwordLabel'
              autoCapitalize='none'
              autoComplete='password'
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mx-2 gap-4">
            <Button className='w-full' variant="default" onPress={onSignInPress}><Text>Acessar</Text></Button>
            <Button className='w-full' variant="link" onPress={() => router.push('/sign-up')}><Text>Não tem uma conta? Registre-se</Text></Button>
          </CardFooter>
        </Card>
      </View>
    </ImageBackground>
  )
}