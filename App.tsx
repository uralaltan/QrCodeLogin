import 'react-native-url-polyfill/auto';
import {useState, useEffect} from 'react';
import {supabase} from './src/lib/supabase';
import Auth from './src/components/Auth';
import {View, Text} from 'react-native';
import {Session} from '@supabase/supabase-js';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <Auth />
      {session && session.user && <Text>{session.user.id}</Text>}
      <Text>Hey</Text>
    </View>
  );
}
