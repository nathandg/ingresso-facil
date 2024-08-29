import * as React from 'react'
import { TextInput, View, ImageBackground } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from '~/components/ui/text'
import { Label } from '~/components/ui/label'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [repeatPassword, setRepeatPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(true)
  const [code, setCode] = React.useState('')
  const [theme, setColorScheme] = React.useState('light');

  React.useEffect(() => {
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

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    if (password !== repeatPassword) {
      alert('As senhas não coincidem')
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
      alert(err.errors[0].longMessage);
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace('/(tabs)/home')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
        alert(completeSignUp.status);
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      alert(err.errors[0].longMessage);
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View>
      {!pendingVerification && (
        <ImageBackground className='m-2' source={require('~/assets/images/logo.png')}>
          <View className="min-h-screen flex items-center justify-center py-12 px-10 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold mb-3 text-center">Registrar</CardTitle>
                <CardDescription className="text-center text-md">
                  Insira suas informações para criar uma conta
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
                  placeholder='Senha'
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  aria-labelledby='passwordLabel'
                  autoCapitalize='none'
                  autoComplete='password'
                />
                <Input
                  className={theme === 'dark' ? 'color-white' : ''}
                  placeholder='Repetir Senha'
                  value={repeatPassword}
                  onChangeText={setRepeatPassword}
                  secureTextEntry
                  aria-labelledby='repeatPasswordLabel'
                  autoCapitalize='none'
                  autoComplete='password'
                />
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 mx-2 gap-4">
                <Button className='w-full' variant="default" onPress={onSignUpPress} ><Text>Registrar</Text></Button>
                <Link href='/' className='text-center text-sm'>Já tem uma conta? Entrar</Link>
              </CardFooter>
            </Card>
          </View>
        </ImageBackground>
      )}
      {pendingVerification && (
        <ImageBackground className='m-2' source={require('~/assets/images/logo.png')}>
          <View className="min-h-screen flex items-center justify-center py-12 px-10 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold mb-3 text-center">Registrar</CardTitle>
                <CardDescription className="text-center text-md">
                  Insira o código de verificação enviado para o seu email
                </CardDescription>
              </CardHeader>
            <CardContent className="space-y-4 gap-5">
              <Input nativeID='code' className='w-full' value={code} placeholder="Código de verificação" onChangeText={(code) => setCode(code)} />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 mx-2 gap-4">
              <Button className='w-full' variant="default" onPress={onSignUpPress} ><Text>Concluir</Text></Button>
            </CardFooter>
            </Card>
          </View>
        </ImageBackground>
      )}
    </View>
  )
}